import React from "react";
import { Grid } from "@material-ui/core";
import LeftBar from "../../../components/Leftbar";
import { adminListMenu } from "../../../constant/adminMenu";
import AdminLocations from "../../../components/admin/Location"



export default function AdminLocationPage(props) {
    return (
        <Grid container>
            <Grid item md={3}>
                <LeftBar menuList={adminListMenu} />
            </Grid>
            <Grid item md={9}>
                <AdminLocations />
            </Grid>
        </Grid>
    )
}