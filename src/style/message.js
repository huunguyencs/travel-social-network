import { makeStyles } from "@material-ui/core";


const messageStyles = makeStyles((theme) => ({
    message_conversations: {
        borderRight: "1px solid #d2d0d0",
        borderLeft: "1px solid #d2d0d0",
        minHeight: "92vh",
        height: "auto",
        paddingTop: "70px",
        width: "100%"
    },
    message_header: {
        position: "fixed",
        display: "flex",
        alignItems: "center",
        height: "50px",
        borderBottom: "1px solid #d2d0d0",
        minWidth: "25%"
    },
    message_header_title: {
        marginLeft: "20px",
        fontSize: "17px",
        fontWeight: 800,
        color: "#0f1419"
    },
    message_search: {
        position: "fixed",
        width: "25%",
        marginTop: "50px",
        height: "50px"
    },
    message_search_form: {
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #d2d0d0"
    },
    message_input: {
        width: "80%",
        height: "80%",
        padding: "0 5px",
        border: "none",
        outline: "none",
        fontSize: "15px",
        marginLeft: "5px",
        backgroundColor: "rgb(238, 246, 243)"
    },
    message_searchIcon: {
        marginLeft: "20px",
        color: "#d2d0d0",
        fontSize: "30px"
    },
    message_closeIcon: {
        color: "#A5DEC8",
        fontSize: "30px",
        marginRight: "20px"
    },
    message_users_list: {
        position: "absolute",
        top: "100%",
        left: "0",
        width: "100%",
        maxHeight: "80vh",
        overflowY: "auto",
        zIndex: 20,
        // display: "none"
    },
    message_card_list: {
        maxHeight: "80vh",
        overflowY: "auto",
    },


    message_conversation: {
        width: "90%",
        minHeight: "92vh",
        borderRight: "1px solid #d2d0d0",
        paddingTop: "70px"
    },
    message_box: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column"
    },
    message_box_header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 3%",
        borderBottom: "1px solid #d2d0d0",
        height: "50px",
        width: "94%"
    },
    message_box_header_left: {
        display: "flex",
        alignItems: "center"
    },

    message_container: {
        position: "relative",
        height: "76vh",
        overflowY: "auto",
        width: "100%"
    },
    message_chats: {
        width: "96%",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 2%",
    },
    message_mychat: {
        display: "flex",
        width: "100%",
        margin: "10px 0 20px",
        justifyContent: "flex-end"
    },
    message_display: {
        maxWidth: "70%"
    },
    message_content_my: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "flex-end"
    },
    message_content_your: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "flex-start"
    },
    chat_content: {
        backgroundColor: "#A5DEC8",
        color: "white",
        fontSize: "15px",
        fontWeight: 500,
        borderRadius: "10px",
        padding: "8px"
    },
    chat_date: {
        fontSize: "13px",
        color: "black",
        marginTop: "3px"
    },
    chat_user: {
        width: "30px",
        height: "30px",
        marginBottom: "3px"
    },
    message_yourchat: {
        display: "flex",
        width: "100%",
        margin: "10px 0 20px"
    },
    chat_input: {
        height: "6vh",
        display: "flex",
        width: "100%",
        border: "1px solid  #d2d0d0",
        alignItems: "center"
    },
    chat_input_form: {
        width: "90%",
        height: "90%",
        backgroundColor: "rgb(238, 246, 243)",
        border: "none",
        outline: "none",
    },
    startChat: {
        display: "flex",
        justifyContent: "center",
        marginTop: 300
    }
}));

export default messageStyles;