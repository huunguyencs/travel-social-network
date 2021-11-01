import { makeStyles } from "@material-ui/core";
import attr from "./attr";

const inputStyles = makeStyles((theme) => ({
    writeCmt: {
        backgroundColor: "#ededed",
        margin: 20,
        borderRadius: attr.borderRadius.md,
    },
    writeCmtText: {
        paddingInline: 20,
        width: "92%",
    },
}))

export default inputStyles;