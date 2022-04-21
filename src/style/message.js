import { makeStyles } from '@material-ui/core';

const messageStyles = makeStyles(
  theme => ({
    message_conversations: {
      borderRight: '1px solid #d2d0d0',
      height: '80vh',
      paddingTop: '75px'
    },
    message_header: {
      height: '50px',
      borderBottom: '1px solid #d2d0d0',
      width: '100%'
    },
    message_header_title: {
      marginLeft: '20px',
      fontSize: '17px',
      fontWeight: 800,
      color: '#0f1419',
      lineHeight: '50px',
      [theme.breakpoints.down('sm')]: {
        marginLeft: '10px'
      },
      [theme.breakpoints.down('xs')]: {
        marginLeft: '5px'
      }
    },
    message_search: {
      width: '100%',
      height: '50px'
    },
    message_search_form: {
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid #d2d0d0'
    },
    message_input: {
      width: '80%',
      height: '80%',
      padding: '0 5px',
      border: 'none',
      outline: 'none',
      fontSize: '15px',
      marginLeft: '5px',
      backgroundColor: 'rgb(238, 246, 243)'
    },
    message_searchIcon: {
      marginLeft: '20px',
      color: '#d2d0d0',
      fontSize: '30px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '20px',
        marginLeft: '5px'
      }
    },
    message_closeIcon: {
      color: '#A5DEC8',
      fontSize: '30px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '25px'
      }
    },
    message_users_list: {
      width: '100%',
      maxHeight: '70vh',
      overflowY: 'auto',
      zIndex: 20
    },
    message_card_list: {
      maxHeight: '70vh',
      overflowY: 'auto'
    },

    message_conversation: {
      width: '90%',
      minHeight: '90vh',
      borderRight: '1px solid #d2d0d0',
      paddingTop: '75px',
      [theme.breakpoints.down('sm')]: {
        width: '98%'
      }
    },
    message_box: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column'
    },
    message_box_header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 3%',
      borderBottom: '1px solid #d2d0d0',
      height: '50px',
      width: '94%'
    },
    message_box_header_left: {
      display: 'flex',
      alignItems: 'center'
    },
    message_box_header_text: {
      marginLeft: '10px',
      fontSize: '18px',
      cursor: 'pointer',
      '&:hover': {
        textDecorationLine: 'underline'
      }
    },
    buttonDelete: {
      color: 'red',
      '&:hover': {
        backgroundColor: 'red',
        color: 'white'
      }
    },
    message_container: {
      position: 'relative',
      height: '76vh',
      overflowY: 'auto',
      width: '100%'
    },
    message_chats: {
      width: '96%',
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '0 2%'
    },
    message_mychat: {
      display: 'flex',
      width: '100%',
      margin: '10px 0 20px',
      justifyContent: 'flex-end'
    },
    message_display: {
      maxWidth: '80%'
    },
    message_content_my: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'flex-end'
    },
    message_content_your: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'flex-start'
    },
    chat_my_content: {
      backgroundColor: '#A5DEC8',
      color: 'white',
      fontSize: '15px',
      fontWeight: 500,
      borderRadius: '10px',
      padding: '8px',
      wordBreak: 'break-word'
    },
    chat_your_content: {
      backgroundColor: '#e4e6eb',
      color: 'black',
      fontSize: '15px',
      fontWeight: 500,
      borderRadius: '10px',
      padding: '8px',
      wordBreak: 'break-word'
    },
    chat_date: {
      fontSize: '13px',
      color: 'black',
      marginTop: '3px'
    },
    chat_my_user: {
      width: '35px',
      height: '35px',
      marginLeft: '3px'
    },
    chat_your_user: {
      width: '35px',
      height: '35px',
      marginRight: '3px'
    },
    message_yourchat: {
      display: 'flex',
      width: '100%',
      margin: '10px 0 20px'
    },
    chat_input: {
      height: '50px',
      display: 'flex',
      width: '100%',
      border: '1px solid  #d2d0d0',
      alignItems: 'center'
    },
    chat_input_form: {
      backgroundColor: 'rgb(238, 246, 243)',
      border: 'none',
      outline: 'none',
      paddingInline: 5,
      width: '100%'
    },
    startChat: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 300
    },
    iconSend: {
      color: '#A5DEC8'
    },
    message_card_text: {
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    }
  }),
  { index: 1 }
);

export default messageStyles;
