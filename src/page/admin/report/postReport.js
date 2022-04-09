import React, { useEffect } from 'react'
import { Grid } from "@material-ui/core";
import LeftBar from "../../../components/Leftbar";
import { adminListMenu } from "../../../constant/adminMenu";
import AdminPostReport from '../../../components/Admin/report/postReport';

export default function AdminPostReportPage() {

    useEffect(() => {
        document.title = "Admin - Bài viết bị báo cáo"
    }, [])

    return (
        <Grid container>
            <Grid item md={3}>
                <LeftBar menuList={adminListMenu} />
            </Grid>
            <Grid item md={9}>
                <AdminPostReport />
            </Grid>
        </Grid>

    )
}