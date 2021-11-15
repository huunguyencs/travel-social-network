import { makeStyles } from "@material-ui/core";
import color from "./color";

const emoijPickerStyles = makeStyles((theme) => ({
    iconWrap: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        width: "266px",
        height: "300px",
    },
    iconItem: {
        fontSize: "1.5em",
        textTransform: "uppercase",
        padding: "5px",
        paddingInline: "7px",
        cursor: "pointer",
        borderRadius: "3px",
        "&:hover": {
            backgroundColor: color.lightgray,
        }
    }
}));

export default emoijPickerStyles;