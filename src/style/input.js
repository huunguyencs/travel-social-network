import { makeStyles } from "@material-ui/core";
import attr from "./attr";

const inputStyles = makeStyles((theme) => ({
    writeCmt: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#ededed",
        margin: 20,
        borderRadius: attr.borderRadius.lg,
        maxWidth: "100%",
    },
    writeCmtText: {
        paddingInline: 5,
        width: "100%",
    },
}))

export default inputStyles;