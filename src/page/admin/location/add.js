import React from "react";
import { Grid } from "@material-ui/core";
import LeftBar from "../../../components/leftbar/LeftBar";
import { adminListMenu } from "../../../constant/adminMenu";
import GMComponent from "../../../components/admin/location/add"



export default function AdminLocationAdd(props) {
    return (
        <Grid container>
            <Grid item md={3}>
                <LeftBar menuList={adminListMenu} />
            </Grid>
            <Grid item md={9}>
                <GMComponent />
            </Grid>
        </Grid>
    )
}