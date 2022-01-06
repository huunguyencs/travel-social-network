import React from "react";
import { Grid } from "@material-ui/core";
import LeftBar from "../../../components/leftbar/LeftBar";
import { adminListMenu } from "../../../constant/adminMenu";
import GMComponent from "../../../components/admin/post/index"
import Menu from "../../../components/leftbar/menu";



export default function AdminPosts(props) {
    return (
        <Grid container>
            <Grid item md={3}>
                <LeftBar >
                    <Menu menuList={adminListMenu} />
                </LeftBar>
            </Grid>
            <Grid item md={9}>
                <GMComponent />
            </Grid>
        </Grid>
    )
}