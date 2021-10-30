
const profileStyles = makeStyles((theme) => ({
    container: {
        position: "relative",
        maxWidth: "70%",
        height: "65vh",
        display: "flex",
        marginTop: "10vh",
        flexDirection: "column",
    },
    profile_overImage: {
        borderRadius: "30px",
        position: "absolute",
        width: "100%",
        top: 0,
        left: 0,
        height: "90%",
    },
    profile_avatar__img: {
        height: "200px",
        width: "200px",
        border: "5px solid white",
    },
    profile_avatar: {

    },
    profile_info: {
        position: "absolute",
        display: "flex",
        marginTop: "45vh",
        marginLeft: "7vw",
    }

}));

export default profileStyles;