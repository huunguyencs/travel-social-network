import React from 'react';
import { Grid } from '@material-ui/core';
import LeftBar from '../../../components/Leftbar';
import { adminListMenu } from '../../../constant/adminMenu';
import AdminProvinceContribute from '../../../components/Admin/contribute/provinceContribute';

export default function AdminProvinceContributePage() {
  return (
    <Grid container>
      <Grid item md={3}>
        <LeftBar menuList={adminListMenu} showHelp={false} />
      </Grid>
      <Grid item md={9}>
        <AdminProvinceContribute />
      </Grid>
    </Grid>
  );
}
