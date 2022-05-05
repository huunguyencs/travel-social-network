import {
  Typography,
  Avatar,
  Grid,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Button,
  Modal,
  Fade,
  Backdrop
} from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import { Call, Delete, Send, InfoOutlined } from '@material-ui/icons';
import { messageStyles } from '../../style';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  addMessage,
  getMessages,
  deleteConversation,
  seenMessage
} from '../../redux/callApi/messageCall';
import { timeAgo } from '../../utils/date';
import EmojiPicker from '../Input/EmojiPicker';
import { Link } from 'react-router-dom';
import CreateGroupChat from '../Forms/CreateGroupChat';


export default function Chat() {
  const classes = messageStyles();
  const [conversation , setConversation] = useState();
  const { auth, message, socket } = useSelector(state => state);
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const { id } = useParams();
  const refDisplay = useRef();
  const history = useHistory();
  const [state, setState] = useState({
    loading: false,
    error: false
  });


  useEffect(() => {
    const currentConversation = message.conversations.find(conversation => conversation._id === id);
    if (currentConversation) setConversation(currentConversation);
  }, [id, message.conversations]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!text.trim()) return;
    setText('');
    const msg = {
      isGroup: conversation.isGroup,
      conversation: id,
      text: text,
      createdAt: new Date().toISOString(),
      sender: auth.user,
      members: conversation.members,
      name: conversation.isGroup ? conversation.name : auth.user.fullname,
      recipients: conversation.isGroup ? conversation.members.map(member => member._id) : [conversation.members[0]._id] 
    };
    dispatch(addMessage(msg, auth, socket));
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getMessages(id, auth, socket));
      if (refDisplay.current) {
        refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  }, [id, dispatch, auth, socket]);

  useEffect(() => {
    if (id) {
      dispatch(seenMessage(id, auth));
    }
  }, [id, dispatch, auth]);

  useEffect(() => {
    document.title = 'Tin nhắn';
  }, []);
  const handleDelete = () => {
    setState({
      loading: true,
      error: false
    });
    dispatch(
      deleteConversation(id, auth, () => {
        setState({
          loading: false,
          error: false
        });
        handleCloseDelete();
      })
    );
    history.push('/message');
  };
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleShowDelete = () => {
    setShowDelete(true);
  };

  const [showInfo, setShowInfo] = useState(false);
  const handleCloseInfo = () => {
    setShowInfo(false);
  };
  const handleShowInfo = () => {
    setShowInfo(true);
  };

  const ref = React.createRef();

  const CreateGroupChatRef = React.forwardRef((props, ref) => (
      <CreateGroupChat {...props} innerRef={ref} />
  ));

  return (
    <>
      {
        conversation &&
        <Grid item md={9} sm={10} xs={10}>
        <div className={classes.message_conversation}>
          <div className={classes.message_box}>
            <div className={classes.message_box_header}>
              <div className={classes.message_box_header_left}>
                {console.log("conversation",conversation)}
                <Avatar alt="avatar" src={conversation.members[0].avatar}></Avatar>
                {
                  conversation.isGroup ? 
                  <Typography
                    className={classes.message_box_header_text}
                  >
                    {conversation.name}
                  </Typography>:
                  <Typography
                    className={classes.message_box_header_text}
                    component={Link}
                    to={`/u/${conversation.members[0]._id}`}
                  >
                    {conversation.name}
                  </Typography> 
                }
              </div>
              <div className={classes.message_box_header_right}>
                <IconButton>
                  <Call style={{ cursor: 'pointer' }} />
                </IconButton>
                <IconButton onClick={handleShowDelete}>
                  <Delete style={{ color: 'red' }} />
                </IconButton>
                {conversation.isGroup  && 
                  <IconButton onClick={handleShowInfo}>
                    <InfoOutlined />
                  </IconButton>
                }
                <Modal
                    aria-labelledby="create-tour"
                    aria-describedby="create-tour-modal"
                    className={classes.modal}
                    open={showInfo}
                    onClose={handleCloseInfo}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500
                    }}
                >
                    <Fade in={showInfo}>
                        <CreateGroupChatRef update={true} conversation={conversation} ref={ref} handleClose={handleCloseInfo} />
                    </Fade>
                </Modal>
                <Dialog
                  open={showDelete}
                  onClose={handleCloseDelete}
                  aria-labelledby="show-delete-dialog"
                  aria-describedby="show-delete-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {'Bạn có chắc chắn muốn xóa?'}
                  </DialogTitle>
                  <DialogContent>
                    Bạn sẽ không thể khôi phục lại dữ liệu sau khi xóa!
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDelete}>Hủy</Button>
                    <Button
                      onClick={handleDelete}
                      className={classes.buttonDelete}
                      disabled={state.loading}
                    >
                      {state.loading ? (
                        <CircularProgress size={15} color="inherit" />
                      ) : (
                        'Xóa'
                      )}{' '}
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
            <div className={classes.message_container}>
              <div className={classes.message_chats} ref={refDisplay}>
                {message.data.map((item, index) => (
                  <div key={index}>
                    {item.sender._id !== auth.user._id ? (
                      <div className={classes.message_yourchat}>
                        <div className={classes.message_display}>
                          <div className={classes.message_content_your}>
                            {
                              conversation.isGroup && 
                              <Typography style={{marginLeft: 35}} className={classes.chat_date}> {item.sender.fullname.slice(0,5)}</Typography>
                            }
                            <div style={{ display: 'flex' }}>
                              <Avatar
                                className={classes.chat_your_user}
                                src= {item.sender.avatar}
                              ></Avatar>
                              <Typography className={classes.chat_your_content}>
                                {item.text}
                              </Typography>
                            </div>
                            <div className={classes.chat_date}>
                              {timeAgo(new Date(item.createdAt))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={classes.message_mychat}>
                        <div className={classes.message_display}>
                          <div className={classes.message_content_my}>
                            <div style={{ display: 'flex' }}>
                              <Typography className={classes.chat_my_content}
                              >
                                {item.text}
                              </Typography>
                              <Avatar className={classes.chat_my_user} src= {item.sender.avatar}></Avatar>
                            </div>
                            <div className={classes.chat_date}>
                              {timeAgo(new Date(item.createdAt))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className={classes.chat_input}>
              <form
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between'
                }}
                onSubmit={handleSubmit}
              >
                <input
                  placeholder="Nhập tin nhắn..."
                  type="text"
                  aria-multiline
                  className={classes.chat_input_form}
                  value={text}
                  onChange={e => setText(e.target.value)}
                ></input>
                <EmojiPicker content={text} setContent={setText} />
                <IconButton
                  disabled={!text || text.trim() === ''}
                  type="submit"
                >
                  <Send className={classes.iconSend} />
                </IconButton>
              </form>
            </div>
          </div>
        </div>
      </Grid> 
      }
    </>
  );
}
