import { IconButton, makeStyles } from "@material-ui/core";
import { ExpandLess } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    toTop: {
        zIndex: 2,
        position: 'fixed',
        bottom: '2vh',
        backgroundColor: '#DCDCDC',
        color: 'black',
        '&:hover, &.Mui-focusVisible': {
            transition: '0.3s',
            color: '#397BA6',
            backgroundColor: '#DCDCDC',
        },
        right: '1%',
    }
}));

function ScrollToTop({ history }) {
    useEffect(() => {
        const unlisten = history.listen(() => {
            window['scrollTo']({ top: 0, behavior: 'smooth' });
        });
        return () => {
            unlisten();
        }
    }, []);

    return (null);
}

const WithRouterScroll = withRouter(ScrollToTop);

export { WithRouterScroll };

const Scroll = ({ showBelow }) => {

    if (!showBelow) showBelow = 500;

    const [show, setShow] = useState(showBelow ? false : true);

    const classes = useStyles();

    const handleScroll = () => {
        console.log(window.scrollY);
        console.log(showBelow);
        if (window.scrollY > showBelow) {
            if (!show) setShow(true);
        }
        else {
            if (show) setShow(false);
        }

    }

    const handleClick = () => {
        window['scrollTo']({ top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        if (showBelow) {
            window.addEventListener('scroll', handleScroll)
            return () => window.removeEventListener('scroll', handleScroll)
        }
    })


    return (
        <div>
            {show &&
                <IconButton onClick={handleClick} className={classes.toTop}>
                    <ExpandLess />
                </IconButton>
            }
        </div>
    )
}

export default Scroll;