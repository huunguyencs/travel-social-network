import React from "react";
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import { Link } from "react-router-dom";


export default function Login(props) {

    return (
        <div className="login">
            <div className="login-img">
                <img src={'/login-1.jpeg'} alt="login"></img>
            </div>
            <div className="form-login">
                {/* <h3 className="form-login-title">GOGO</h3> */}
                <div className="login-register-switch">
                    <h4 className="login-register-switch__active">Đăng nhập</h4>
                    <h4><Link to='/register' style={{ color: "#2F3542" }}> Đăng ký </Link></h4>
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
                    method="POST"
                >
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
                        label="Password (6+ Charactor)"
                        variant="outlined"
                        required
                        name="password"
                        type="password"
                        className="form-input"
                    >
                    </TextField>
                    <p style={{
                        opacity: 0.5,
                        textDecoration: 'underline',
                        // color: '#f37435c4'
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