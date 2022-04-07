import { Container, Paper } from "@material-ui/core";

import React, { useState } from "react";

import FormLocationAdmin from "../../components/Admin/Location/Form";



function LocationContribute() {

  const [location, setLocation] = useState({
    name: '',
    images: [],
    fullname: '',
    province: null,
    position: {
      lng: 108,
      lat: 16
    },
    information: ''
  })

  return (

    <Container>
      <Paper style={{ marginTop: 120, marginInline: 50, marginBottom: 30, padding: 30 }}>
        <FormLocationAdmin location={location} setLocation={setLocation} mode='contribute' />
      </Paper>
    </Container>
  );
}

export default LocationContribute;
