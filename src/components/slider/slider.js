import { IconButton, makeStyles, Typography, useTheme } from "@material-ui/core";
import React, { useState } from "react";
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
// import { ChevronLeft, ChevronRight } from "@material-ui/icons";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const data = [
    {
        label: "one",
        title: "Welcome to GOGO",
        subtitle: "It's time to travel",
        imgPath: "https://freenice.net/wp-content/uploads/2021/08/Hinh-anh-thien-nhien-dep.jpg",
        color: "white",
    },
    {
        label: "two",
        title: "Hi there :)",
        subtitle: "",
        imgPath: "https://toquoc.mediacdn.vn/2018/12/25/cau-vang-ba-na-3-15457134861131150541874.jpg",
        color: "black",
    },
    {
        label: "three",
        title: "Lorem Ipsum",
        subtitle: "",
        imgPath: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        color: "white",
    }
]

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: "100%",
        flexGrow: 1,
    },
    img: {
        height: 800,
        display: "flex",
        textAlign: "center",
        maxWidth: "100%",
        overflow: "hidden",
        width: "100%",
        justifyContent: "space-between",
    },
    textBtn: {
        paddingTop: 200,
    },
    button: {
        marginTop: 300,
        height: 50,
        width: 50,
    },
    icon: {
        fontSize: 40,
    },
}))

export default function Slider() {

    const classes = useStyles();
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

                                <div className={classes.textBtn}>
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
                                    </div>
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