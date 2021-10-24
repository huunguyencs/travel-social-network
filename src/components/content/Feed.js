import { Container, makeStyles, Typography } from "@material-ui/core";

import React from "react";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(10),
        color: 'black',
    }
}));

export default function Feed(props) {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Typography>This paper describes the Dynamic Baseline Model ® (DBM) as a framework for analysis of the project management learning process and an indicator of the expected success of a project. By matching project complexity with the appropriate project management approach, the DBM identifies individual learning needs and the appropriate response to the challenges of todays projects. As project management tools and techniques are more and more applied as a one-size-fits-all solution, there is a need to explore beyond these tools and techniques. The DBM suggests that our ability to create solutions is bounded by our current learning horizon, which may be too restrictive for the needs of a project. The model helps us find suitable solutions by enabling us to ask the right questions.</Typography>
            <Typography>This paper describes the Dynamic Baseline Model ® (DBM) as a framework for analysis of the project management learning process and an indicator of the expected success of a project. By matching project complexity with the appropriate project management approach, the DBM identifies individual learning needs and the appropriate response to the challenges of todays projects. As project management tools and techniques are more and more applied as a one-size-fits-all solution, there is a need to explore beyond these tools and techniques. The DBM suggests that our ability to create solutions is bounded by our current learning horizon, which may be too restrictive for the needs of a project. The model helps us find suitable solutions by enabling us to ask the right questions.</Typography>
            <Typography>This paper describes the Dynamic Baseline Model ® (DBM) as a framework for analysis of the project management learning process and an indicator of the expected success of a project. By matching project complexity with the appropriate project management approach, the DBM identifies individual learning needs and the appropriate response to the challenges of todays projects. As project management tools and techniques are more and more applied as a one-size-fits-all solution, there is a need to explore beyond these tools and techniques. The DBM suggests that our ability to create solutions is bounded by our current learning horizon, which may be too restrictive for the needs of a project. The model helps us find suitable solutions by enabling us to ask the right questions.</Typography>
            <Typography>This paper describes the Dynamic Baseline Model ® (DBM) as a framework for analysis of the project management learning process and an indicator of the expected success of a project. By matching project complexity with the appropriate project management approach, the DBM identifies individual learning needs and the appropriate response to the challenges of todays projects. As project management tools and techniques are more and more applied as a one-size-fits-all solution, there is a need to explore beyond these tools and techniques. The DBM suggests that our ability to create solutions is bounded by our current learning horizon, which may be too restrictive for the needs of a project. The model helps us find suitable solutions by enabling us to ask the right questions.</Typography>
            <Typography>This paper describes the Dynamic Baseline Model ® (DBM) as a framework for analysis of the project management learning process and an indicator of the expected success of a project. By matching project complexity with the appropriate project management approach, the DBM identifies individual learning needs and the appropriate response to the challenges of todays projects. As project management tools and techniques are more and more applied as a one-size-fits-all solution, there is a need to explore beyond these tools and techniques. The DBM suggests that our ability to create solutions is bounded by our current learning horizon, which may be too restrictive for the needs of a project. The model helps us find suitable solutions by enabling us to ask the right questions.</Typography>
        </Container>
    )
}