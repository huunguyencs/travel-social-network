import React from "react";
<<<<<<< HEAD

export default function AdminGroup(props) {
    return (
        <></>
=======
import {Grid} from "@material-ui/core";
import LeftBar from "../../../components/leftbar/LeftBar";
import Menu from "../../../components/leftbar/menu";
import { adminListMenu } from "../../../constant/adminMenu";
import GMComponent from "../../../components/admin/group/index"



export default function AdminLocation(props) {
    return (
        <Grid container>
            <Grid item md={3}>
                <LeftBar>
                    <Menu menuList={adminListMenu} />
                </LeftBar>
            </Grid>
            <Grid item md={9}>
                <GMComponent/>
            </Grid>
        </Grid>
>>>>>>> hung
    )
}