import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import LeftBar from "../../../components/Leftbar";
import { adminListMenu } from "../../../constant/adminMenu";
import AdminUsers from "../../../components/admin/User"



export default function AdminUsersPage(props) {

    useEffect(() => {
        document.title = "Admin - Người dùng"
    })

    return (
        <Grid container>
            <Grid item md={3}>
                <LeftBar menuList={adminListMenu} />
            </Grid>
            <Grid item md={9}>
                <AdminUsers />
            </Grid>
        </Grid>
    )
}