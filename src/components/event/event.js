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

const listEvent = [
    {
        id: "1",
        image: "https://toplist.vn/images/800px/le-hoi-truyen-thong-o-nuoc-ta-9886.jpg",
        name: "Tết Nguyên Đán",
        description: "Tết cổ truyền Việt Nam",
        time: "30/1/2022",
    },
    {
        id: "2",
        image: "https://toplist.vn/images/800px/le-hoi-truyen-thong-o-nuoc-ta-9886.jpg",
        name: "Tết Nguyên Đán",
        description: "Tết cổ truyền Việt Nam",
        time: "30/1/2022",
    },
    {
        id: "3",
        image: "https://toplist.vn/images/800px/le-hoi-truyen-thong-o-nuoc-ta-9886.jpg",
        name: "Tết Nguyên Đán",
        description: "Tết cổ truyền Việt Nam",
        time: "30/1/2022",
    },
    {
        id: "4",
        image: "https://toplist.vn/images/800px/le-hoi-truyen-thong-o-nuoc-ta-9886.jpg",
        name: "Tết Nguyên Đán",
        description: "Tết cổ truyền Việt Nam",
        time: "30/1/2022",
    },
    {
        id: "5",
        image: "https://toplist.vn/images/800px/le-hoi-truyen-thong-o-nuoc-ta-9886.jpg",
        name: "Tết Nguyên Đán",
        description: "Tết cổ truyền Việt Nam",
        time: "30/1/2022",
    },
    {
        id: "6",
        image: "https://toplist.vn/images/800px/le-hoi-truyen-thong-o-nuoc-ta-9886.jpg",
        name: "Tết Nguyên Đán",
        description: "Tết cổ truyền Việt Nam",
        time: "30/1/2022",
    }
]

export default function Event(props) {

    return (
        <div>
            <ScrollMenu
                LeftArrow={LeftArrow}
                RightArrow={RightArrow}
            >
                {listEvent.map((item) =>
                    <EventItem
                        itemId={item.id}
                        key={item.id}
                        event={item}
                    />
                )}
            </ScrollMenu>
        </div>
    )
}

