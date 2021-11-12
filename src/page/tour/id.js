import React from "react";
import { useParams } from "react-router-dom";

import Tour from "../../components/tour/TourDetail";

const tour = {
    tourName: "Du lịch cùng ABC",
    tourList: [
        {
            time: "1/11/2021",
            tour: [
                {
                    id: "1",
                    fromPrev: 0,
                    img: "/login-1.jpeg",
                    location: "Chùa Một Cột",
                    province: "Hà Nội",
                    cost: "200",
                },
                {
                    id: "2",
                    fromPrev: 30,
                    img: "/login-1.jpeg",
                    location: "Lăng Chủ tịch",
                    province: "Hà Nội",
                    cost: "100",
                },
                {
                    id: "3",
                    fromPrev: 20,
                    img: "/login-1.jpeg",
                    location: "Lăng Chủ tịch",
                    province: "Hà Nội",
                    cost: "100",
                }
            ],
        },
        {
            time: "2/11/2021",
            tour: [
                {
                    id: "4",
                    fromPrev: 0,
                    img: "/login-1.jpeg",
                    location: "Lăng Chủ tịch",
                    province: "Hà Nội",
                    cost: "100",
                },
                {
                    id: "5",
                    fromPrev: 20,
                    img: "/login-1.jpeg",
                    location: "Lăng Chủ tịch",
                    province: "Hà Nội",
                    cost: "100",
                }
            ],
        },
        {
            time: "3/11/2021",
            tour: [
                {
                    id: "6",
                    fromPrev: 0,
                    img: "/login-1.jpeg",
                    location: "Lăng Chủ tịch",
                    province: "Hà Nội",
                    cost: "100",
                },
            ],
        },
    ]
}

export default function TourDetail(props) {

    const { id } = useParams();
    console.log(id);

    return (
        <Tour tour={tour} />
    )
}