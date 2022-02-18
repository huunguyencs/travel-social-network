import React, { useState } from "react";
import { IconButton, Paper } from "@material-ui/core";

import { Link } from "react-router-dom";
import { ArrowBack } from "@material-ui/icons";
import FormLocationAdmin from "./Form";

function AdminAddLocation(props) {


  const [location, setLocation] = useState({
    name: '',
    images: [],
    fullname: '',
    province: null,
    position: {
      lon: '',
      lat: ''
    },
    information: ''
  })

  const addLocation = (e) => {
    e.preventDefault();
  }

  return (
    <Paper style={{ marginTop: 120, marginInline: 50, marginBottom: 30, padding: 30 }}>
      <IconButton component={Link} to={`/admin/location`} title="Quay lại">
        <ArrowBack />
      </IconButton>

      <FormLocationAdmin location={location} setLocation={setLocation} mode='add' handleSubmit={addLocation} />
    </Paper>
  );
}


export default AdminAddLocation;
