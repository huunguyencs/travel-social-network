import React from "react";
import { Grid } from "@material-ui/core";
import LeftBar from "../../../components/Leftbar";
import { adminListMenu } from "../../../constant/adminMenu";
import AdminPosts from "../../../components/Admin/Post"



export default function AdminPostsPage(props) {
    return (
        <Grid container>
            <Grid item md={3}>
                <LeftBar menuList={adminListMenu} />
            </Grid>
            <Grid item md={9}>
                <AdminPosts />
            </Grid>
        </Grid>
    )
}