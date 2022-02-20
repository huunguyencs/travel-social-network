import React from "react";
import { Grid } from "@material-ui/core";
import LeftBar from "../../../components/leftbar/LeftBar";
import { adminListMenu } from "../../../constant/adminMenu";
import GMComponent from "../../../components/admin/service/cooperate"



export default function AdminServiceCooperate(props) {
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