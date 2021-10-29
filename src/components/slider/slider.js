import React, { useState } from "react";
import { IconButton, Typography, useTheme } from "@material-ui/core";
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';
import { ChevronLeft, ChevronRight } from "@material-ui/icons";

import { sliderStyles } from "../../style";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const data = [
    {
        label: "one",
        title: "Welcome to GOGO",
        subtitle: "It's time to travel",
        imgPath: "https://freenice.net/wp-content/uploads/2021/08/Hinh-anh-thien-nhien-dep.jpg",
        color: "white",
        description: "Ảnh: Ruộng bậc thang Tây Bắc",
    },
    {
        label: "two",
        title: "Hi there :)",
        subtitle: "",
        imgPath: "https://toquoc.mediacdn.vn/2018/12/25/cau-vang-ba-na-3-15457134861131150541874.jpg",
        color: "black",
        description: "Ảnh: Cầu Vàng - Bà Nà Hills",
    },
    {
        label: "three",
        title: "Lorem Ipsum",
        subtitle: "",
        imgPath: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        color: "black",
        description: "Ảnh: Chùa Trấn Quốc - Hà Nội",
    }
]


export default function Slider() {

    const classes = sliderStyles();

    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = data.length;

    const handleNext = () => {
        if (activeStep === maxSteps - 1) setActiveStep(0);
        else setActiveStep(activeStep + 1);
    }

    const handleBack = () => {
        if (activeStep === 0) setActiveStep(maxSteps - 1);
        else setActiveStep(activeStep - 1);
    }

    const handleStepChange = (step) => {
        setActiveStep(step);
    }


    return (
        <div className={classes.container}>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {data.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 1 ? (
                            <div
                                style={{
                                    backgroundImage: `url(${step.imgPath})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    color: step.color,
                                }}
                                className={classes.img}
                            >

                                <IconButton
                                    onClick={handleBack}
                                    className={classes.button}

                                    style={{
                                        color: step.color
                                    }}
                                >
                                    <ChevronLeft className={classes.icon} />
                                </IconButton>

                                <div className={classes.textCover}>
                                    <Typography
                                        variant="h1"
                                    >
                                        {step.title}
                                    </Typography>
                                    <Typography
                                        variant="h3"
                                    >
                                        {step.subtitle}
                                    </Typography>
                                    <Typography className={classes.description}>
                                        {step.description}
                                    </Typography>
                                </div>

                                <IconButton
                                    onClick={handleNext}
                                    className={classes.button}
                                    style={{
                                        color: step.color,
                                    }}
                                >
                                    <ChevronRight className={classes.icon} />
                                </IconButton>

                            </div>


                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>

        </div>
    )
}