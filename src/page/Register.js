import {
  Container,
  makeStyles,
  Typography,
  Grid,
  TextField,
  Button,
  InputAdornment,
  Input,
  InputLabel,
  IconButton,
} from "@material-ui/core";

import {
  AccountCircle,
  Home,
  LockRounded,
  Visibility,
  VisibilityOff,
  LocalPhone,
  Mail,
} from "@material-ui/icons";

import React from "react";
import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#69f0ae",
      main: "#00e676",
      dark: "#00c853",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  container: {},
  left: {},
  right: {
    padding: 10,
  },
  brand: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  logo: {
    width: 200,
  },
}));

function Register() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={6} className={classes.left}>
          <img
            src="https://www.tripsavvy.com/thmb/83STNqhF4DLqtne1w4-O_t_EXd8=/950x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/when-to-travel-vietnam-5ab887c131283400375b1126.jpg"
            className={classes.brand}
            alt="brand"
          ></img>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          alignItems="center"
          direction="column"
          justify="space-between"
          className={classes.right}
        >
          <div />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 400,
              minWidth: 300,
            }}
          >
            <Grid container justify="center">
              <img
                src="data:image/jpeg;base64,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"
                className={classes.logo}
                alt="logo"
              ></img>
            </Grid>

            <div style={{ height: 20 }}></div>

            <InputLabel htmlFor="standard-adornment-name">Họ và tên</InputLabel>
            <Input
              id="standard-adornment-name"
              type="text"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle></AccountCircle>
                </InputAdornment>
              }
            />

            <div style={{ height: 20 }}></div>

            <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
            <Input
              id="standard-adornment-email"
              type="text"
              startAdornment={
                <InputAdornment position="start">
                  <Mail></Mail>
                </InputAdornment>
              }
            />

            <div style={{ height: 20 }}></div>

            <InputLabel htmlFor="standard-adornment-phone">
              Số điện thoại
            </InputLabel>
            <Input
              id="standard-adornment-phone"
              type="text"
              startAdornment={
                <InputAdornment position="start">
                  <LocalPhone></LocalPhone>
                </InputAdornment>
              }
            />

            <div style={{ height: 20 }}></div>

            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              startAdornment={
                <InputAdornment position="start">
                  <LockRounded></LockRounded>
                </InputAdornment>
              }
            />
            <div style={{ height: 20 }}></div>
            <Button theme={theme.primary} variant="contained">
              Đăng ký
            </Button>
            <div style={{ height: 20 }}></div>
            <Button>Đã có tài khoản</Button>
          </div>
          <div />
        </Grid>
      </Grid>
    </div>
  );
}

function Login(){
    
}
export default Register;
