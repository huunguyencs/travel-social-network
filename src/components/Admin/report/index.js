import React from "react";
import { Container, Paper, Typography, Card, Grid } from "@material-ui/core";
import { tableStyles } from "../../../style";
import { AddLocation, Report, Event } from "@material-ui/icons";

export default function AdminReport() {
    const classes = tableStyles();
    return (
        <Container className={classes.container}>
            <div>
                <Grid container>
                    <Grid item md={4} >
                        <Card className={classes.cardInfo}>
                            <Typography variant="h5">
                                Số bài viết bị báo cáo
                            </Typography>
                            <Typography variant="h3" className={classes.cardValue}>
                                <Report className={classes.cardIcon} />
                                1300
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item md={4}>
                        <Card className={classes.cardInfo}>
                            <Typography variant="h5">
                                Số địa điểm được đóng góp
                            </Typography>
                            <Typography variant="h3" className={classes.cardValue}>
                                <AddLocation className={classes.cardIcon} />
                                1
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item md={4}>
                        <Card className={classes.cardInfo}>
                            <Typography variant="h5">
                                Sự kiến được đóng góp
                            </Typography>
                            <Typography variant="h3" className={classes.cardValue}>
                                <Event className={classes.cardIcon} />
                                0
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            <Paper className={classes.paper}>
                <div>
                    <Card>

                    </Card>
                </div>
            </Paper>
        </Container>
    );
}
