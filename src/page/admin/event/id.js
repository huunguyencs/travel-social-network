import { Grid } from '@material-ui/core';
import React from 'react'

import LeftBar from '../../../components/Leftbar';
import { adminListMenu } from '../../../constant/adminMenu';
import { adminStyles } from '../../../style';
import AdminEventDetail from '../../../components/admin/Event/Detail'

export default function AdminEventDetailPage() {
    const classes = adminStyles();

    return (
        <Grid container>
            <Grid item md={3} className={classes.smHidden}>
                <LeftBar menuList={adminListMenu} />
            </Grid>
            <Grid item md={9}>
                <AdminEventDetail />
            </Grid>
        </Grid>
    )
}
