import { Button, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { feedStyles } from '../../style';

export default function Feed(props) {
    const { loadMore, tryAgain, loading, error, hasMore, children } = props;
    const classes = feedStyles();
    const [fetch, setFetch] = useState(false);

    useEffect(() => {
        if (fetch) {
            if (hasMore) loadMore();
            setFetch(false);
        }
    }, [fetch, hasMore, loadMore])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, []);


    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            setFetch(true);
        }
    }
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.feedContent}>
                    {children}
                    {
                        loading &&
                        <div className={classes.centerMarginTop}>
                            <CircularProgress color={"inherit"} />
                        </div>
                    }
                    {
                        error &&
                        <div className={classes.centerMarginTop}>
                            <Button onClick={tryAgain}>Thử lại</Button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}