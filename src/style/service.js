import { makeStyles } from "@material-ui/core";
import color from "./color";
import attr from './attr'


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
    },
    reviewItemContainer: {
        margin: 20,
        display: 'flex'
    },
    reviewContentContainer: {
        borderRadius: attr.borderRadius.md,
        backgroundColor: color.lightgray,
        padding: 10
    },
    reviewerName: {

    },
    reviewContent: {

    }
}))

export default serviceStyles;