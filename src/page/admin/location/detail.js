import React from "react";

import { Grid, makeStyles } from "@material-ui/core";
import LeftBar from "../../../components/leftbar/LeftBar";
import { adminListMenu } from "../../../constant/adminMenu";

const useStyles = makeStyles((theme) => ({
    appBarSpacer: {
        marginTop: 120,
    },
    tableContainer: {
        height: 400,
        margin: 50,
        marginBottom: 100,
    },
    table: {
        backgroundColor: "white",
    },
    chart: {
        margin: 50,
    }
}))



export default function AdminLocationDetail(props) {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item md={3}>
                <LeftBar menuList={adminListMenu} />
            </Grid>
            <Grid item md={9}>

            </Grid>
        </Grid>
    )
}