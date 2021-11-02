import { Box, Card, CardContent, LinearProgress, Typography } from "@material-ui/core";
import { Star } from "@material-ui/icons";
import React from "react";

import { cardStyles } from "../../style";


export default function RatingChart(props) {

    const classes = cardStyles();

    return (
        <Card className={classes.starContainer}>
            <div className={classes.header}>
                <Typography variant="h6">Đánh giá</Typography>
            </div>
            <CardContent className={classes.starContent}>
                <div className={classes.totalRating}>
                    <Typography variant="h1">
                        <Star className={classes.iconStar} />
                        4.5 /5
                    </Typography>
                    <Typography variant="h5" className={classes.center}>
                        200+
                    </Typography>
                </div>
                <div className={classes.chart}>
                    <Box display="flex" alignItems="center">
                        <Box minWidth={35}><Typography>5</Typography></Box>
                        <Box width="80%" mr={1}><LinearProgress variant="determinate" value="70" className={classes.line} /></Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Box minWidth={35}><Typography>4</Typography></Box>
                        <Box width="80%" mr={1}><LinearProgress variant="determinate" value="10" className={classes.line} /></Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Box minWidth={35}><Typography>3</Typography></Box>
                        <Box width="80%" mr={1}><LinearProgress variant="determinate" value="5" className={classes.line} /></Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Box minWidth={35}><Typography>2</Typography></Box>
                        <Box width="80%" mr={1}><LinearProgress variant="determinate" value="0" className={classes.line} /></Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Box minWidth={35}><Typography>1</Typography></Box>
                        <Box width="80%" mr={1}><LinearProgress variant="determinate" value="5" className={classes.line} /></Box>
                    </Box>
                </div>
            </CardContent>
        </Card>
    )
}