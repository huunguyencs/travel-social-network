import React from 'react';
import { Grid } from '@material-ui/core';
import LeftBar from '../../../components/Leftbar';
import { adminListMenu } from '../../../constant/adminMenu';
import AdminLocationContributeDetail from '../../../components/Admin/contribute/locationContribute/id';

export default function AdminLocationContributeDetailPage() {
  return (
    <Grid container>
      <Grid item md={3} sm={2} xs={2}>
        <LeftBar menuList={adminListMenu} showHelp={false} />
      </Grid>
      <Grid item md={9} sm={10} xs={10}>
        <AdminLocationContributeDetail />
      </Grid>
    </Grid>
  );
}
