import React from 'react'
import { Grid } from "@material-ui/core";
import LeftBar from "../../../components/Leftbar";
import { adminListMenu } from "../../../constant/adminMenu";
import AdminLocationContribute from '../../../components/Admin/report/locationContribute';

export default function AdminLocationContributePage() {

    return (
        <Grid container>
            <Grid item md={3}>
                <LeftBar menuList={adminListMenu} />
            </Grid>
            <Grid item md={9}>
                <AdminLocationContribute />
            </Grid>
        </Grid>

    )
}