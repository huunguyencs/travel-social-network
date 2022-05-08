import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import DetailProvinceContributeAdmin from '../../../components/Admin/contribute/provinceContribute/id';
import LeftBar from '../../../components/Leftbar';
import { adminListMenu } from '../../../constant/adminMenu';
import { adminStyles } from '../../../style';

export default function AdminProvinceDetail() {
  const classes = adminStyles();

  useEffect(() => {
    document.title = 'Admin - Đóng góp ý kiến';
  }, []);

  return (
    <Grid container>
      {/* <DetailProvinceContributeAdmin /> */}
      <Grid item md={3} className={classes.smHidden}>
        <LeftBar menuList={adminListMenu} showHelp={false} />
      </Grid>
      <Grid item md={9} sm={12} xs={12}>
        <DetailProvinceContributeAdmin />
      </Grid>
    </Grid>
  );
}
