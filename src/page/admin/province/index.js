import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react'
import AdminProvinces from '../../../components/admin/Province';
import LeftBar from '../../../components/Leftbar';
import { adminListMenu } from '../../../constant/adminMenu';

export default function AdminProvince() {

    useEffect(() => {
        document.title = "Admin - Tỉnh"
    }, [])


    return (
        <Grid container>
            <Grid item md={3}>
                <LeftBar menuList={adminListMenu} />
            </Grid>
            <Grid item md={9} sm={10} xs={12}>
                <AdminProvinces />
            </Grid>
        </Grid>
    )
}
