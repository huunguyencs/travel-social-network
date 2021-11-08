import { Container, Typography } from "@material-ui/core";
import React from "react";
import { feedStyles } from "../../style";
import Event from "../event/event";
import LocationCard from "../location/Location";


const locationHot = [
    {
        id: 1,
        image: "https://toplist.vn/images/800px/le-hoi-giong-362211.jpg",
        name: "Địa điểm Hot",
        description: "Địa điểm được nhiều người du lịch nhất",
        rate: 5,
    },
    {
        id: 1,
        image: "https://toplist.vn/images/800px/le-hoi-giong-362211.jpg",
        name: "Địa điểm Hot",
        description: "Địa điểm được nhiều người du lịch nhất",
        rate: 5,
    },
    {
        id: 1,
        image: "https://toplist.vn/images/800px/le-hoi-giong-362211.jpg",
        name: "Địa điểm Hot",
        description: "Địa điểm được nhiều người du lịch nhất",
        rate: 4,
    },
    {
        id: 1,
        image: "https://toplist.vn/images/800px/le-hoi-giong-362211.jpg",
        name: "Địa điểm Hot",
        description: "Địa điểm được nhiều người du lịch nhất",
        rate: 5
    },
]


export default function FeedHot(props) {

    const classes = feedStyles();

    return (
        <Container className={classes.container}>
            <div className={classes.content}>
                <div className={classes.event}>
                    <div className={classes.title}>
                        <Typography variant="h4">Sự kiện sắp diễn ra</Typography>
                    </div>

                    <Event />
                </div>
                <div className={classes.hot}>
                    <div className={classes.title}>
                        <Typography variant="h4" style={{ paddingBottom: 20 }}>Địa điểm hot</Typography>
                    </div>
                    <div className={classes.hotFeed}>
                        {locationHot.map((item) =>
                            <LocationCard location={item} />
                        )}
                    </div>
                </div>
            </div>
        </Container>
    )
}