import React from "react";
import { Grid } from "@material-ui/core";
import LeftBar from "../../../components/Leftbar";
import { adminListMenu } from "../../../constant/adminMenu";
import AdminEventAdd from '../../../components/admin/Event/Add'


export default function AdminEventAddPage() {
    return (
        <Grid container>
            <Grid item md={3}>
                <LeftBar menuList={adminListMenu} />
            </Grid>
            <Grid item md={9}>
                <AdminEventAdd />
            </Grid>
        </Grid>
    )
}
