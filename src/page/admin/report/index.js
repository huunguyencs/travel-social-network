import React, {useEffect} from 'react'
import { Grid } from "@material-ui/core";
import LeftBar from "../../../components/Leftbar";
import { adminListMenu } from "../../../constant/adminMenu";
import AdminReport from '../../../components/Admin/report';

export default function AdminReportPage() {

    return (
        <Grid container>
            <Grid item md={3}>
                <LeftBar menuList={adminListMenu} />
            </Grid>
            <Grid item md={9}>
                <AdminReport/>
            </Grid>
        </Grid>

    )
}
