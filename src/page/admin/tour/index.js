import React from 'react'
import { Grid } from "@material-ui/core";
import LeftBar from "../../../components/Leftbar";
import { adminListMenu } from "../../../constant/adminMenu";
import AdminTour from '../../../components/Admin/Tour';

export default function AdminTourPage() {
    return (

        <Grid container>
            <Grid item md={3}>
                <LeftBar menuList={adminListMenu} />
            </Grid>
            <Grid item md={9}>
                <AdminTour />
            </Grid>
        </Grid>

    )
}
