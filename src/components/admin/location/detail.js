import { Container } from "@material-ui/core";
import React from "react";

import { locationStyles } from "../../../style";


function AdminLocationDetail(props) {
  const classes = locationStyles();
  return (
    <Container className={classes.container} style={{ marginTop: "160px" }}>
      <div className={classes.appBarSpacer} />
      <div>

      </div>
    </Container>
  );
}

export default AdminLocationDetail;
