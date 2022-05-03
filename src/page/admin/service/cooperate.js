import React from 'react';
import { Grid } from '@material-ui/core';
import LeftBar from '../../../components/Leftbar';
import { adminListMenu } from '../../../constant/adminMenu';
import AdminServiceCooperate from '../../../components/Admin/Service/Cooperate';

export default function AdminServiceCooperatePage(props) {
  return (
    <Grid container>
      <Grid item md={3}>
        <LeftBar menuList={adminListMenu} showHelp={false} />
      </Grid>
      <Grid item md={9}>
        <AdminServiceCooperate />
      </Grid>
    </Grid>
  );
}
