import React, { useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../redux/callApi/authCall';
import { useHistory } from 'react-router-dom';

import Validator, { isEmpty } from '../utils/validator';
import { CircularProgress } from "@material-ui/core";

import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

export default function Login(props) {

    const history = useHistory();

    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);
    const [loading, setLoading] = useState(false);
    const [context, setContext] = useState({
        email: '',
        password: '',
        errors: {},
        submit: false,
    })

    const [showPassword, setShowPassword] = useState(false);
    const [errorServer, setErrorServer] = useState(null);

    const { errors } = context;

    const rules = [
        {
            field: "email",
            method: "isEmpty",
            validWhen: false,
            message: "Email không được bỏ trống!",
        },
        {
            field: "email",
            method: "isEmail",
            validWhen: true,
            message: "Email không hợp lệ!",
        },
        {
            field: "password",
            method: isEmpty,
            validWhen: false,
            message: "Mật khẩu không được bỏ trống!",
        }
    ]
    const validator = new Validator(rules);

    const handleInput = (e) => {
        setContext({
            ...context,
            errors: {},
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setContext({
            ...context,
            submit: true,
            errors: validator.validate(context)
        })
    }


    useEffect(() => {
        if (auth.token) {
            history.push("/")
        }
    }, [auth.token, history])

    useEffect(() => {
        document.title = "Đăng nhập";
    }, [])

    useEffect(() => {
        if (context.submit) {
            setLoading(true);
            setErrorServer(null);
            if (Object.keys(errors).length === 0) {
                dispatch(login({
                    email: context.email,
                    password: context.password.trim()
                }, () => {
                    setLoading(false);
                }, (err) => {
                    setLoading(false);
                    setErrorServer(err);
                }));
            }
            setContext({
                ...context,
                submit: false,
            })
        }
    }, [errors, dispatch, context])




    const handleClickShowPassword = () => {
        setShowPassword(state => !state);
    };


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
                <form
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <TextField
                        autoComplete=""
                        label="Email"
                        variant="outlined"
                        name="email"
                        id="email"
                        type="email"
                        className="form-input"
                        required
                        error={errors?.email}
                        helperText={errors?.email}
                        value={context.email}
                        onChange={handleInput}
                    >
                    </TextField>
                    <TextField
                        autoComplete=""
                        label="Mật khẩu"
                        variant="outlined"
                        required
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        error={errors?.password}
                        helperText={errors?.password}
                        className="form-input"
                        value={context.password}
                        onChange={handleInput}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    >
                    </TextField>
                    <p style={{
                        opacity: 0.5,
                        textDecoration: 'underline',
                        // color: '#f37435c4'
                    }}>
                        Quên mật khẩu?
                    </p>
                    <span style={{ fontSize: "15px", color: "red", marginInline: "20px", marginTop: "10px" }}>{errorServer}</span>
                    <div className="login-group">
                        <Button
                            variant="contained"
                            type="submit"
                            className="login-button"
                        >
                            {loading ?
                                <CircularProgress size="25px" color="inherit" />
                                : "Đăng nhập"
                            }
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}