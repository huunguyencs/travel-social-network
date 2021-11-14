import { makeStyles } from "@material-ui/core";
import attr from "./attr";

const inputStyles = makeStyles((theme) => ({
    writeCmt: {
        backgroundColor: "#ededed",
        margin: 20,
        borderRadius: attr.borderRadius.lg,
    },
    writeCmtText: {
        paddingInline: 20,
        width: "86%",

    },
}))

export default inputStyles;