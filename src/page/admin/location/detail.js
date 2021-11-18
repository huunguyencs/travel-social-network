import React from "react";
import { Grid } from "@material-ui/core";
import LeftBar from "../../../components/leftbar/LeftBar";
import Menu from "../../../components/leftbar/menu";
import { adminListMenu } from "../../../constant/adminMenu";
import GMComponent from "../../../components/admin/location/detail"



export default function AdminLocationDetail(props) {
    return (
        <Grid container>
            <Grid item md={3}>
                <LeftBar>
                    <Menu menuList={adminListMenu} />
                </LeftBar>
            </Grid>
            <Grid item md={9}>
                <GMComponent />
            </Grid>
        </Grid>
    )
}