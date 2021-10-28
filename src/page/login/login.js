// import { makeStyles } from "@material-ui/core";
// import { Home } from "@material-ui/icons";
import React from "react";
import loginImg1 from './login-1.jpeg';

import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import { red } from "@material-ui/core/colors";
// const useStyles = makeStyles((theme) => ({

// }));

export default function Login(props) {
    // const classes = useStyles();

    return (
        <div className="login">
            <div className="login-img">
                <img src={loginImg1} alt="image-login"></img>
            </div>
            <div className="form-login">
                {/* <h3 className="form-login-title">GOGO</h3> */}
                <div className="login-register-switch">
                    <h4 className="login-register-switch__active">Đăng nhập</h4>
                    <h4>Đăng ký</h4>
                </div>
                <p style={{
                    opacity: 0.5,
                    marginTop: '1rem',
                    marginBottom: '1rem'
                }}>Đăng nhập bằng tài khoản</p>
                <form
                    style={{
                        marginTop: '-10px'
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        autoComplete=""
                        label="Email"
                        variant="outlined"
                        name="email"
                        className="form-input"
                        required={true}
                    >
                    </TextField>
                    <TextField
                        autoComplete=""
                        label="Password (6+ Charactor)"
                        variant="outlined"
                        required={true}
                        name="password"
                        type="password"
                        className="form-input"
                    >
                    </TextField>
                    <p style={{
                        opacity: 0.5,
                        textDecoration: 'underline',
                        color: '#f37435c4'
                    }}>
                        Quên mật khẩu?
                    </p>
                    <div className="login-group">
                        <Button
                            variant="contained"
                            // color="primary"
                            type="submit"
                            className="login-button"
                        >
                            Đăng nhập
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}