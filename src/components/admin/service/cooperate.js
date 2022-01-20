import React from "react";
import {
  makeStyles,
  Container,
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  appBarSpacer: {
    marginTop: 120,
  },
  tableContainer: {
    height: 400,
    margin: 50,
    marginBottom: 100,
  },
  table: {
    backgroundColor: "white",
  },
  chart: {
    margin: 50,
  },
}));

function AdminServiceCooperate(props) {
  const classes = useStyles();
  return (
    <Container className={classes.container} style={{ marginTop: "160px" }}>
      <div className={classes.appBarSpacer} />

    </Container>
  );
}

export default AdminServiceCooperate;
