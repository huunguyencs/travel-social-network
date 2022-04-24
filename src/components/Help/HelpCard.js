import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@material-ui/core';
import { Message } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { error, success } from '../../redux/actions/alertAction';
import { updateHelp } from '../../redux/actions/helpAction';
import { createNotify } from '../../redux/callApi/notifyCall';
import { timeAgo } from '../../utils/date';
import customAxios from '../../utils/fetchData';

export default function HelpCard({ help, handleRemove }) {
  const { auth, socket } = useSelector(state => state);
  const dispatch = useDispatch();

  const [helped, setHelped] = useState(false);
  const [own, setOwn] = useState(false);

  const canHelp = () => {
    customAxios(auth.token)
      .patch(`/help/help/${help._id}`)
      .then(res => {
        socket.emit('updateHelp', res.data.help);
        const dataNotify = {
          id: auth.user._id,
          text: ``,
          recipients: [help.userId._id],
          url: `/help/my?id=${help._id}`,
          content: `${auth.user.fullname} sẽ đến giúp bạn!`,
          image: `${auth.user.avatar}`
        };

        dispatch(createNotify(dataNotify, auth.token, socket));
        dispatch(updateHelp(res.data.help));
        dispatch(
          success({
            message:
              'Cảm ơn bạn đã tham gia giúp đỡ! Hãy liên hệ với người cần giúp'
          })
        );
      })
      .catch(err => dispatch(error({ message: 'Có lỗi xảy ra!' })));
  };

  const removeHelp = () => {
    customAxios(auth.token)
      .delete(`/help/${help._id}`)
      .then(res => {
        socket.emit('deleteHelp', help._id);
        handleRemove(help._id);
        dispatch(success({ message: 'Xóa yêu cầu thành công!' }));
      })
      .catch(err => dispatch(error({ message: 'Có lỗi xảy ra!' })));
  };

  useEffect(() => {
    if (help.userId._id === auth.user._id) {
      setOwn(true);
    }
  }, [help.userId, auth.user]);

  useEffect(() => {
    if (help.state.includes(auth.user._id) || own) {
      setHelped(true);
    }
  }, [auth.user, help.state, own]);

  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {timeAgo(new Date(help.createdAt))}
        </Typography>

        <Link to={`/u/${help.userId._id}`}>
          <Typography variant="h6">{help.userId.fullname}</Typography>
        </Link>
        <Typography>
          <b>Liên lạc:</b> {help.contact}
        </Typography>
        <Typography>
          <b>Đang ở:</b> {help.positionStr}
        </Typography>
        <Typography>
          <b>Gặp sự cố về:</b> {help.type}
        </Typography>
        <Typography>
          <b>Mô tả:</b> {help.description}
        </Typography>
        <Typography>
          <b>Trạng thái:</b>{' '}
          {help.state.length === 0
            ? 'Chưa có ai giúp đỡ'
            : `Đã có ${help.state.length} người giúp`}
        </Typography>
      </CardContent>
      {auth.user && (
        <CardActions
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {own ? (
            <Button size="small" variant="outlined" onClick={removeHelp}>
              Xóa yêu cầu trợ giúp
            </Button>
          ) : (
            <>
              {!helped && (
                <Button size="small" variant="outlined" onClick={canHelp}>
                  Tôi có thể giúp
                </Button>
              )}

              <Button
                component={Link}
                to={`/message/${help.userId._id}`}
                variant="outlined"
                size="small"
                startIcon={<Message />}
              >
                Nhắn tin
              </Button>
            </>
          )}
        </CardActions>
      )}
    </Card>
  );
}
