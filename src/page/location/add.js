<<<<<<< HEAD
=======
import { Paper } from "@material-ui/core";

import React, { useState } from "react";

import FormLocationAdmin from "../../components/Admin/Location/Form";



function LocationAdd() {

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
    <Paper style={{ marginTop: 120, marginInline: 50, marginBottom: 30, padding: 30 }}>
      <FormLocationAdmin location={location} setLocation={setLocation} mode='donggop' />
    </Paper>
  );
}

export default LocationAdd;
>>>>>>> f8bf43794d134d4f1e74d690460bc5cd9d67bed3
