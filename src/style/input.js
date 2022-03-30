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
    addImageContainer: {
        display: 'flex',
        overflow: 'auto'
    },
    item: {
        // width: 200,
        // height: 300,
        margin: 20
    },
    addArea: {
        // width: 250,
        width: '100%',
        height: 200,
        margin: 20,
        border: '1px dashed #000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: 5
    },
    addAreaHover: {
        // width: 250,
        width: '100%',
        height: 200,
        margin: 20,
        border: '2px dashed #555',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    imageItem: {
        position: 'relative'
    },
    removeButton: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
}))

export default inputStyles;