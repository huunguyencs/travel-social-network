import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../redux/callApi/serviceCall";

import Feed from './index';
import ServiceItem from '../Service/ServiceItem';
import { feedStyles } from "../../style";

export default function FeedService(props) {

    // const classes = feedStyles();
    const { service } = useSelector(state => state);
    const classes = feedStyles();
    // const [fetch, setFetch] = useState(false);
    const dispatch = useDispatch();

    const tryAgain = () => {
        dispatch(getServices(null, service.page))
    }

    const loadMore = () => {
        if (service.hasMore) {
            dispatch(getServices(null, service.page))
        }
    }

    // useEffect(() => {
    //     if (fetch) {
    //         loadPost(service.page, service.hasMore, dispatch)
    //     }
    // }, [fetch, service.page, service.hasMore, dispatch])

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll)
    // }, []);

    // function handleScroll() {
    //     if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
    //         setFetch(true);
    //     }
    // }

    return (
        <div className={classes.container}>
             <Feed
                loadMore={loadMore}
                tryAgain={tryAgain}
                loading={service.loading}
                error={service.error}
                hasMore={service.hasMore}
            >
                {
                    service.services.map((item) => (
                        item._id ?
                            <ServiceItem key={item._id} service={item} />
                            : <div></div>
                    ))
                }
            </Feed>
        </div>
        // <Container className={classes.container}>
        //     <div className={classes.content}>

        //         <div>
        //             {
        //                 service.services.map((item) => (
        //                     <ServiceItem key={item._id} service={item} />
        //                 ))
        //             }
        //             {
        //                 service.loading &&
        //                 <div className={classes.centerMarginTop}>
        //                     <CircularProgress />
        //                 </div>
        //             }
        //             {
        //                 service.error &&
        //                 <div className={classes.centerMarginTop}>
        //                     <Button onClick={tryAgain}>Thử lại</Button>
        //                 </div>
        //             }
        //         </div>
        //     </div>
        // </Container>
    )
}