import { makeStyles } from "@material-ui/core";

const rightbarStyles = makeStyles((theme) => ({
    container: {
        color: 'white',
        paddingTop: theme.spacing(10),
        position: "sticky",
        marginTop: theme.spacing(10),
        paddingBottom: theme.spacing(4),
        top: 0,
        alignItems: 'center'
    },
}));

export default rightbarStyles;