import {
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
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
import Help from '../Modal/Help';

export default function HelpCard({ help, handleRemove, detail }) {
  const { auth, socket } = useSelector(state => state);
  const dispatch = useDispatch();

  const [helped, setHelped] = useState(false);
  const [own, setOwn] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [loadingHelp, setLoadingHelp] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const canHelp = () => {
    setLoadingHelp(true);
    customAxios(auth.token)
      .patch(`/help/help/${help._id}`)
      .then(res => {
        socket.emit('updateHelp', res.data.help);
        const dataNotify = {
          id: auth.user._id,
          text: ``,
          recipients: [help.userId._id],
          url: `/help/${help._id}`,
          content: `${auth.user.fullname} sẽ đến giúp bạn!`,
          image: `${auth.user.avatar}`
        };

        dispatch(createNotify(dataNotify, auth.token, socket));
        dispatch(updateHelp(res.data.help));
        setLoadingHelp(false);
        dispatch(
          success({
            message:
              'Cảm ơn bạn đã tham gia giúp đỡ! Hãy liên hệ với người cần giúp'
          })
        );
      })
      .catch(err => {
        dispatch(error({ message: 'Có lỗi xảy ra!' }));
        setLoadingHelp(false);
      });
  };

  const removeHelp = () => {
    setLoadingRemove(true);
    customAxios(auth.token)
      .delete(`/help/${help._id}`)
      .then(res => {
        socket.emit('deleteHelp', help._id);
        handleRemove(help._id);
        setLoadingRemove(false);
        dispatch(success({ message: 'Xóa yêu cầu thành công!' }));
      })
      .catch(err => {
        dispatch(error({ message: 'Có lỗi xảy ra!' }));
        setLoadingRemove(false);
      });
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

  const ref = React.createRef();

  const UpdateHelpRef = React.forwardRef((props, ref) => (
    <Help innerRef={ref} {...props} />
  ));

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
        {!detail && (
          <Button component={Link} to={`/help/${help._id}`} variant="contained">
            Chi tiết
          </Button>
        )}
      </CardContent>
      {auth.user && (
        <CardActions
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {own ? (
            <>
              <Button
                size="small"
                variant="outlined"
                onClick={removeHelp}
                disabled={loadingRemove}
              >
                Xóa yêu cầu trợ giúp
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setShowUpdate(true)}
              >
                Cập nhật yêu cầu trợ giúp
              </Button>
              <Modal
                aria-labelledby="create-post"
                aria-describedby="create-post-modal"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                open={showUpdate}
                onClose={() => setShowUpdate(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500
                }}
              >
                <UpdateHelpRef
                  ref={ref}
                  handleClose={() => setShowUpdate(false)}
                />
              </Modal>
            </>
          ) : (
            <>
              {!helped && (
                <Button
                  size="small"
                  variant="outlined"
                  onClick={canHelp}
                  disabled={loadingHelp}
                >
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
