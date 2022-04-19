import { makeStyles } from "@material-ui/core";
import attr from "./attr";
import color from "./color";


const friendCardStyles = makeStyles((theme) => ({
    friend: {
        marginTop: 20,
        borderRadius: attr.borderRadius.md,
        color: color.text,
        backgroundColor: color.white,
        padding: 10
    },
    friendHeader:{
        borderBottom:`1px solid ${color.gray}`,
        padding: 5
    },
    text: {
        fontSize: "1.15em",
        // fontWeight: 500,
    },
    item: {
        borderRadius: attr.borderRadius.md,
        paddingInline: theme.spacing(4),
    },
    friendBlock:{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 16,
        "& :not(:first-child)": {
            borderTop: "1px solid #e8e8e8"
        }
    },
    friendAvatar:{
        height: 40,
        width: 40,
        maxHeight: 40,
        borderRadius: "50%",
        cursor:"pointer"
    },
    friendInfo:{
        padding: "0 10px",
        lineHeight: 1.3,
        cursor:"pointer",
        "& :nth-child(1)": {
            fontSize: 15,
            color: "#393a4f",
            fontWeight: 500
        },
        "& :nth-child(2)": {
            fontSize: 13    ,
            color: "#393a4f",
        }
    },
    addFriend:{
        width: 36,
        height: 36,
        borderRadius: "50%",
        transition: "all 0.3s",
        cursor: "pointer",
        marginLeft: "auto",
        marginRight: 8
    }

}))

export default friendCardStyles;