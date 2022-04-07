import React, { useEffect } from 'react'
import { Grid } from "@material-ui/core";
import LeftBar from "../../../components/Leftbar";
import { adminListMenu } from "../../../constant/adminMenu";
import AdminEventContribute from '../../../components/Admin/report/eventContribute';

export default function AdminLocationContributePage() {

    useEffect(() => {
        document.title = "Admin - Sự kiện được đóng góp"
    }, [])

    return (
        <Grid container>
            <Grid item md={3}>
                <LeftBar menuList={adminListMenu} />
            </Grid>
            <Grid item md={9}>
                <AdminEventContribute/>
            </Grid>
        </Grid>

    )
}