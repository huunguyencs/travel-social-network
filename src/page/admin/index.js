import { Card, Grid, makeStyles, Typography } from "@material-ui/core";
import { Group, Person, PostAdd } from "@material-ui/icons";
import React from "react";
import LeftBar from "../../components/leftbar/LeftBar";
import Menu from "../../components/leftbar/menu";
import { adminListMenu } from "../../constant/adminMenu";

const useStyles = makeStyles((theme) => ({
    appBarSpacer: {
        marginTop: 140,
    },
    cardInfo: {
        margin: 20,
        padding: 20,
        borderRadius: 10,
    },
    cardValue: {
        marginTop: 10,
    },
    cardIcon: {
        fontSize: "37px",
        marginRight: 30,
    }
}))

export default function AdminHome(props) {

    const classes = useStyles();

    return (
        <Grid container>
            <Grid item md={3}>
                <LeftBar >
                    <Menu menuList={adminListMenu} />
                </LeftBar>
            </Grid>
            <Grid item md={9} style={{ height: "100vh" }}>
                <div className={classes.appBarSpacer} />
                <Grid container>
                    <Grid item md={4} >
                        <Card className={classes.cardInfo}>
                            <Typography variant="h5">
                                Tổng số người dùng
                            </Typography>
                            <Typography variant="h3" className={classes.cardValue}>
                                <Person className={classes.cardIcon} />
                                1300
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item md={4}>
                        <Card className={classes.cardInfo}>
                            <Typography variant="h5">
                                Tổng số nhóm
                            </Typography>
                            <Typography variant="h3" className={classes.cardValue}>
                                <Group className={classes.cardIcon} />
                                57
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item md={4}>
                        <Card className={classes.cardInfo}>
                            <Typography variant="h5">
                                Số bài viết mới trong tuần
                            </Typography>
                            <Typography variant="h3" className={classes.cardValue}>
                                <PostAdd className={classes.cardIcon} />
                                180
                            </Typography>
                        </Card>
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
    )
}