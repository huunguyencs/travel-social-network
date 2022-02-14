import { Grid } from '@material-ui/core';
import React from 'react'

import LeftBar from '../../../components/Leftbar';
import { adminListMenu } from '../../../constant/adminMenu';
import DetailProvinceAdmin from '../../../components/admin/Province/Detail';

export default function AdminProvinceDetail() {

    return (
        <Grid container>
            <Grid item md={3}>
                <LeftBar menuList={adminListMenu} />
            </Grid>
            <Grid item md={9}>
                <DetailProvinceAdmin />
            </Grid>
        </Grid>
    )
}
