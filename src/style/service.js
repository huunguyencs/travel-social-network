import { makeStyles } from "@material-ui/core";
import color from "./color";


const serviceStyles = makeStyles((theme) => ({
    centerMarginTop: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 50
    },
    listContainer: {
        marginInline: 20,
        marginBlock: 50
    },
    container: {
        marginInline: 50
    },
    image: {

    },
    serviceName: {
        marginBottom: 10
    },
    rate: {
        marginTop: 5
    },
    discount: {

    },
    seeReview: {
        marginInline: 30,
        marginBottom: 20,
        backgroundColor: color.turquoise
    },
    reviewContainer: {
        width: 500
    }
}))

export default serviceStyles;