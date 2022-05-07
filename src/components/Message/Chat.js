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
  Backdrop,
  List,
  ListItem,
  ListItemText,
  Collapse,
  InputBase,
  CardHeader,
  ListItemIcon
} from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import { Call, Delete, Send, InfoOutlined, ExpandLess, ExpandMore, Close } from '@material-ui/icons';
import { messageStyles } from '../../style';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  addMessage,
  getMessages,
  deleteConversation,
  seenMessage,
  changeNameConversation
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
  const [error, setError] = useState("")
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
  // const handleCloseInfo = () => {
  //   setShowInfo(false);
  // };
  const handleShowInfo = () => {
    setShowInfo((prev) => !prev);
  };

  // const ref = React.createRef();

  // const CreateGroupChatRef = React.forwardRef((props, ref) => (
  //     <CreateGroupChat {...props} innerRef={ref} />
  // ));
  const [openName, setOpenName] = useState(true);
  const [openMembers, setOpenMembers] = useState(false);
  const [openMove, setOpenMove] = useState(false);
  const handleClickName = () => {
    setOpenName(!openName);
  };
  const handleClickMembers = () => {
    setOpenMembers(!openMembers);
  };
  const handleClickMove = () => {
    setOpenMove(!openMove);
  };
  const [name, setName] = useState(conversation?.name);
  const handleSubmitName = e => {
    e.preventDefault();
    if (name === "") {
        setError("Cần điền tên nhóm!")
        return;
    }
    console.log("name",name)
    setState({
        loading: true,
        error: null
    });
    dispatch(changeNameConversation(name, id , auth, () => {
        setState({
          loading: false,
          error: false
        });
      },
      () => {
        setState({
          loading: false,
          error: true
        });
      }
    ));
  };
  return (
    <>
      {
        conversation &&
        <Grid item md={9} sm={10} xs={10}>
        <div className={classes.message_conversation}>
          <div className={classes.message_box}>
            <div className={classes.message_box_header}>
              <div className={classes.message_box_header_left}>
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
                {/* <Modal
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
                </Modal> */}
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
          <div className={showInfo ? classes.conversationInfo : classes.conversationInfoHidden} >
              <Avatar alt="avatar" src={conversation.members[0].avatar} className={classes.infoImage}></Avatar>
              <Typography variant='h6'>
                {conversation.name}
              </Typography>
              {error !== "" &&
                  <Typography variant='body1' style={{color:"red"}} >{error}</Typography>
              }
              <List component="nav" className={classes.infoOptions}>
                <ListItem button onClick={handleClickName} className={classes.infoOption}>
                  <ListItemText style={{ fontWeight: 500 }} primary="Thay đổi tên trò chuyện" />
                  {openName ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openName} timeout="auto" unmountOnExit>
                  <div style={{display: "flex",}}>
                      <InputBase
                          placeholder="Tên nhóm trò chuyện"
                          title="name"
                          variant="outlined"
                          name="name"
                          id="name"
                          required
                          className={classes.userNameInput}
                          value={name}
                          onChange={e => setName(e.target.value)}
                      />
                      <Button
                          className={classes.button}
                          onClick={handleSubmitName}
                          disabled={state.loading}
                          style={{padding: 20,height:40, fontSize: 12, marginLeft:10}}
                      >
                          {state.loading ? (
                              <CircularProgress size={15} color="inherit" />
                            ):"Cập nhập"}
                      </Button>
                  </div>
                </Collapse>
                <ListItem button onClick={handleClickMembers} className={classes.infoOption}>
                  <ListItemText style={{ fontWeight: 500 }} primary="Thành viên trò chuyện" />
                  {openMembers ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openMembers} timeout="auto" unmountOnExit style={{marginLeft: 15}}>
                  <List component="nav" >
                    {
                      conversation.members.map(
                        (member, idx) => (
                          <ListItem 
                            key={idx}
                            style={{padding:0}}
                          >
                            <CardHeader
                              style={{padding:0}}
                              avatar={
                                  <Avatar
                                      alt={member.fullname}
                                      src={member.avatar}
                                      aria-label='avatar'
                                  />
                              }
                              action={
                                  <>
                                      {
                                          auth.user && auth.user._id === conversation.groupAdmin && <>
                                              <IconButton
                                                  aria-label="settings"
                                                  // onClick={handleShowMenu}
                                                  className={classes.action}
                                                  size='small'
                                                  // controls={anchorEl ? "post-menu" : undefined}
                                              >
                                                  <Close />
                                              </IconButton>
                                              {/* <Popper
                                                  open={Boolean(anchorEl)}
                                                  anchorEl={anchorEl}
                                                  onClose={handleCloseMenu}
                                                  disablePortal
                                              >
                                                  <ClickAwayListener onClickAway={handleCloseMenu}>
                                                      <Paper>
                                                          <MenuList>
                                                              <MenuItem component={Link} to={'?edit=true'}><Edit className={classes.menuIcon}/> Chỉnh sửa hành trình</MenuItem>
                                                              <MenuItem onClick={handleShowDelete}> <Delete className={classes.menuIcon}/>Xóa hành trình</MenuItem>
                                                              <Dialog
                                                                  open={showDelete}
                                                                  onClose={handleCloseDelete}
                                                                  aria-labelledby="show-delete-dialog"
                                                                  aria-describedby="show-delete-dialog-description"
                                                              >
                                                                  <DialogTitle id="alert-dialog-title">{"Bạn có chắc chắn muốn xóa?"}</DialogTitle>
                                                                  <DialogContent>Bạn sẽ không thể khôi phục lại dữ liệu sau khi xóa!</DialogContent>
                                                                  <DialogActions>
                                                                      <Button onClick={handleCloseDelete}>
                                                                          Hủy
                                                                      </Button>
                                                                      <Button onClick={handleDeleteTour} className={classes.delete}>
                                                                          {
                                                                              state.loading ?
                                                                                  <CircularProgress size={15} color='inherit' /> : "Xóa"
                                                                          }
                                                                      </Button>
                                                                  </DialogActions>
                                                              </Dialog>
                                                          </MenuList>
                                                      </Paper>
                                                  </ClickAwayListener>
                                              </Popper> */}
                                          </>
                                      }
                                  </>
                              }
                              title={
                                  <Typography className={classes.username} component={Link} to={`/u/${member._id}`}>
                                      {member.fullname}
                                  </Typography>
                              }
                              subheader={
                                  <Typography className={classes.subheader}>
                                      {conversation.groupAdmin === auth.user._id ? "Người tạo nhóm" : "Thành viên"}
                                  </Typography>
                              }
                          />
                          </ListItem>
                        )
                      )
                    }
                      
                  </List>
                </Collapse>
                <ListItem button onClick={handleClickMove} className={classes.infoOption}>
                  <ListItemText style={{ fontWeight: 500 }} primary="Quyền riêng tư" />
                  {openMove ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openMove} timeout="auto" unmountOnExit>
                    {
                      conversation.isGroup && 
                      <ListItem button>
                        <ListItemIcon>
                          <ExpandLess />
                        </ListItemIcon>
                        <ListItemText primary="Rời khỏi nhóm" />
                      </ListItem>
                    }
                    <ListItem button>
                        <ListItemIcon>
                          <ExpandLess />
                        </ListItemIcon>
                        <ListItemText primary="Xóa trò chuyện" />
                      </ListItem>
                </Collapse>
              </List>
          </div>
        </div>
        </Grid> 
      }
    </>
  );
}
