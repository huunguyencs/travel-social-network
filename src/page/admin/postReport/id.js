import React from 'react'
import { Grid } from "@material-ui/core";
import LeftBar from "../../../components/Leftbar";
import { adminListMenu } from "../../../constant/adminMenu";
import AdminPostReportDetail from '../../../components/Admin/report/postReport/id';

export default function AdminPostReportDetailPage(props) {

    return (
        <Grid container>
            <Grid item md={3} sm={2} xs={2}>
                <LeftBar menuList={adminListMenu} />
            </Grid>
            <Grid item md={9} sm={10} xs={10}>
                <AdminPostReportDetail/>
            </Grid>
        </Grid>
    )
}