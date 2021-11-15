import React, { useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../redux/callApi/authCall';
import { useHistory } from 'react-router-dom'


export default function Login(props) {

    const history = useHistory();

    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login({ email: email, password: password }))
    }

    useEffect(() => {
        if (auth.token) {
            history.push("/")
        }
    }, [auth.token, history])

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
                    onSubmit={handleLogin}
                >
                    <TextField
                        autoComplete=""
                        label="Email"
                        variant="outlined"
                        name="email"
                        className="form-input"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
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
                        value={password}
                        onChange={e => setPassword(e.target.password)}
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