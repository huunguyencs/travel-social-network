import React from "react";
import { Grid } from "@material-ui/core";
import LeftBar from "../../../components/Leftbar";
import { adminListMenu } from "../../../constant/adminMenu";
import AdminServiceDetail from "../../../components/Admin/Service/Detail"



export default function AdminServiceDetailPage(props) {
    return (
        <Grid container>
            <Grid item md={3}>
                <LeftBar menuList={adminListMenu} />
            </Grid>
            <Grid item md={9}>
                <AdminServiceDetail />
            </Grid>
        </Grid>
    )
}