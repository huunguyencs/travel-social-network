import { IconButton } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import React, { useContext } from "react";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

import EventItem from "./eventItem";

function LeftArrow(props) {

    const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

    return (
        <div disabled={isFirstItemVisible} >
            <IconButton style={{ marginTop: 200 }} onClick={() => scrollPrev()}>
                <ChevronLeft />
            </IconButton>
        </div>
    )
}

function RightArrow(props) {

    const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

    return (
        <div disabled={isLastItemVisible} >
            <IconButton style={{ marginTop: 200 }} onClick={() => scrollNext()}>
                <ChevronRight />
            </IconButton>
        </div>
    )
}


export default function Event(props) {

    const { events } = props;

    return (
        <div>
            <ScrollMenu
                LeftArrow={LeftArrow}
                RightArrow={RightArrow}
            >
                {events.map((item) =>
                    <EventItem
                        itemId={item._id}
                        key={item._id}
                        event={item}
                    />
                )}
            </ScrollMenu>
        </div>
    )
}

