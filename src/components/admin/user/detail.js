import React from "react";
import {
  makeStyles,
  Button,
  Container,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
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

function AdminUserDetail(props) {
  const classes = useStyles();
  return (
    <Container className={classes.container} style={{ marginTop: "160px" }}>
      <div className={classes.appBarSpacer} />
      <div>
        <div className={classes.change_form}>
          <form noValidate autoComplete="off">
            <TextField
              autoComplete=""
              label="Họ và Tên"
              variant="outlined"
              name="name"
              className="form-input"
              required={true}
            ></TextField>
            <TextField
              autoComplete=""
              label="Email"
              variant="outlined"
              name="email"
              className="form-input"
              required={true}
            ></TextField>
            <TextField
              autoComplete=""
              label="Số điện thoại"
              variant="outlined"
              name="phone"
              className="form-input"
              required={true}
            ></TextField>
            <TextField
              autoComplete=""
              label="Sở thích du lịch"
              variant="outlined"
              required={true}
              name="hobby"
              type="text"
              className="form-input"
            ></TextField>
            <TextField
              id="date"
              label="Birthday"
              type="date"
              defaultValue="2017-05-24"
              style={{ margin: "10px 0", width: "30%" }}
            ></TextField>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="man"
              style={{ marginBottom: "10px" }}
            >
              <FormControlLabel
                value="man"
                control={<Radio color="primary" />}
                label="Nam"
              />
              <FormControlLabel
                value="male"
                control={<Radio color="primary" />}
                label="Nữ"
              />
              <FormControlLabel
                value="other"
                control={<Radio color="primary" />}
                label="Khác"
              />
            </RadioGroup>
            <div className="login-group">
              <Button
                variant="contained"
                // color="primary"
                type="submit"
                className="login-button"
              >
                Cập nhập
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default AdminUserDetail;
