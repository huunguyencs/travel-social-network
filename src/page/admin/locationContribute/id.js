import React, { useEffect } from 'react'
import { Grid } from "@material-ui/core";
import LeftBar from "../../../components/Leftbar";
import { adminListMenu } from "../../../constant/adminMenu";
import { adminStyles } from '../../../style';
import AdminLocationContributeDetail from '../../../components/Admin/report/locationContribute/id';

export default function AdminLocationContributeDetailPage() {

    return (
        <Grid container>
            <Grid item md={3} sm={2} xs={2}>
                <LeftBar menuList={adminListMenu} />
            </Grid>
            <Grid item md={9} sm={10} xs={10}>
                <AdminLocationContributeDetail/>
            </Grid>
        </Grid>

    )
}