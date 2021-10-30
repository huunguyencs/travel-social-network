import React from "react";
import loginImg1 from './login-1.jpeg';

import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import Checkbox from "@material-ui/core/Checkbox";

export default function Register(props) {
    // const classes = useStyles();

    return (
        <div className="login">
            <div className="login-img">
                <img src={loginImg1} alt="image-login"></img>
            </div>
            <div className="form-login">
                {/* <h3 className="form-login-title">GOGO</h3> */}
                <div className="login-register-switch">
                    <h4 className="login-register-switch__notactive">Đăng nhập</h4>
                    <h4 className="login-register-switch__active__register">Đăng ký</h4>
                </div>
                <p style={{
                    opacity: 0.5,
                    marginTop: '1rem',
                    marginBottom: '1rem'
                }}>Đăng ký tài khoản</p>
                <form
                    style={{
                        marginTop: '-10px'
                    }}
                    noValidate
                    autoComplete="off"
                    method="POST"
                >
                    <TextField
                        autoComplete=""
                        label="Họ và Tên"
                        variant="outlined"
                        name="name"
                        className="form-input"
                        required
                    >
                    </TextField>
                    <TextField
                        autoComplete=""
                        label="Email"
                        variant="outlined"
                        name="email"
                        className="form-input"
                        required
                    >
                    </TextField>
                    <TextField
                        autoComplete=""
                        label="Số điện thoại"
                        variant="outlined"
                        name="phone"
                        className="form-input"
                        required
                    >
                    </TextField>
                    <TextField
                        autoComplete=""
                        label="Password (6+ Charactor)"
                        variant="outlined"
                        required
                        name="password"
                        type="password"
                        className="form-input"
                    >
                    </TextField>
                    <TextField
                        autoComplete=""
                        label="Confirm password"
                        variant="outlined"
                        required
                        name="password"
                        type="password"
                        className="form-input"
                    >
                    </TextField>
                    <div style={{
                        display: 'flex',
                        textAlign: 'center',
                    }}
                    >
                        <Checkbox
                            style={{
                                display: 'inline-block',
                            }}
                            // checked
                            // onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <p style={{
                            opacity: 0.5,
                            textDecoration: 'underline',
                            // color: '#f37435c4',
                            display: 'inline-block',
                        }}>
                            Tôi đồng ý với các quy định của GoGo
                        </p>
                    </div>

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