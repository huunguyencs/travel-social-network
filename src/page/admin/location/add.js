import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Button, Card, Grid, makeStyles, Typography } from "@material-ui/core";
import LeftBar from "../../../components/leftbar/LeftBar";
import { adminListMenu } from "../../../constant/adminMenu";
import { AddCircle } from "@material-ui/icons";

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



export default function AdminAddLocation(props) {
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