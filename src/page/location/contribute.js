import { Grid, Paper } from "@material-ui/core";

import React, { useState } from "react";

import FormLocationAdmin from "../../components/Admin/Location/Form";
import LeftBar from "../../components/Leftbar";
import { homeMenu } from "../../constant/menu";



function LocationContribute() {

  const [location, setLocation] = useState({
    name: '',
    images: [],
    fullname: '',
    province: null,
    position: {
      lon: 108,
      lat: 16
    },
    information: ''
  })

  return (
    <Grid container>
      <Grid item md={3}>
        <LeftBar menuList={homeMenu}></LeftBar>
      </Grid>
      <Grid item md={9}>
        <Paper style={{ marginTop: 120, marginInline: 50, marginBottom: 30, padding: 30 }}>
          <FormLocationAdmin location={location} setLocation={setLocation} mode='contribute' />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LocationContribute;
