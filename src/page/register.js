import React, { useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
// import Checkbox from "@material-ui/core/Checkbox";
import { Link, useHistory } from "react-router-dom";

import Validator, { nonSpace, username, validatePassword, validatePhoneNumber } from "../utils/validator";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { register } from "../redux/callApi/authCall";

import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

export default function Register(props) {

    const history = useHistory();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errorServer, setErrorServer] = useState(null);

    const [state, setState] = useState({
        username: "",
        fullname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        errors: {},
        submit: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { errors } = state;

    const confirmPass = (value, field, sta) => value === sta[field];

    const rules = [
        {
            field: "username",
            method: username,
            validWhen: true,
            message: "Tên tài khoản không hợp lệ!"
        },
        {
            field: "fullname",
            method: "isEmpty",
            validWhen: false,
            message: "Tên đầy đủ không được bỏ trống!"
        },
        {
            field: "email",
            method: "isEmpty",
            validWhen: false,
            message: "Email không được bỏ trống!"
        },
        {
            field: "password",
            method: "isEmpty",
            validWhen: false,
            message: "Mật khẩu không được bỏ trống!"
        },
        {
            field: "email",
            method: "isEmail",
            validWhen: true,
            message: "Email không hợp lệ!"
        },
        {
            field: "password",
            method: nonSpace,
            validWhen: true,
            message: "Mật khẩu không được chứa khoảng cách",
        },
        {
            field: "password",
            method: validatePassword,
            validWhen: true,
            message: "Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường, một chữ số và có độ dài lớn hơn 6"
        },
        {
            field: "confirmPassword",
            method: confirmPass,
            args: ['password'],
            validWhen: true,
            message: "Xác nhận mật khẩu không khớp"
        },
        {
            field: "phone",
            method: validatePhoneNumber,
            validWhen: true,
            message: "Số điện thoại không hợp lệ"
        }
    ];

    const validator = new Validator(rules);

    const handleInput = e => {
        setState({
            ...state,
            errors: {},
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setState({
            ...state,
            submit: true,
            errors: validator.validate(state)
        })
    }

    useEffect(() => {
        if (state.submit) {
            setLoading(true);
            setErrorServer(null);
            if (Object.keys(errors).length === 0) {
                // call api to register
                dispatch(register({
                    username: state.username,
                    fullname: state.fullname,
                    password: state.password.trim(),
                    email: state.email,
                    phone: state.phone,
                }, () => {
                    setLoading(false);
                    history.push('/login');
                }, (err) => {
                    setLoading(false);
                    setErrorServer(err);
                }))
            }
            setState({
                ...state,
                submit: false,
            })
        }
    }, [errors, state, dispatch, history])

    useEffect(() => {
        document.title = "Đăng kí";
    }, []);

    //Show password

    const handleClickShowPassword = () => {
        setShowPassword(state => !state);
    };

    const handleClickShowConfirm = () => {
        setShowConfirm(state => !state);
    }

    return (
        <div className="login">
            <div className="login-img">
                <img src={'/login-1.jpeg'} alt="login"></img>
            </div>
            <div className="form-login">
                {/* <h3 className="form-login-title">GOGO</h3> */}
                <div className="login-register-switch">
                    <h4 className="login-register-switch__notactive"><Link to="/login" style={{ color: "#2F3542" }}> Đăng nhập </Link></h4>
                    <h4 className="login-register-switch__active__register">Đăng ký</h4>
                </div>
                <form
                    onSubmit={handleSubmit}
                >
                    <TextField
                        autoComplete=""
                        label="Username"
                        variant="outlined"
                        id="username"
                        name="username"
                        required
                        className="form-input-half"
                        error={errors?.username}
                        onChange={handleInput}
                        helperText={errors?.username}
                    />
                    <TextField
                        autoComplete=""
                        label="Tên đầy đủ"
                        id="fullname"
                        variant="outlined"
                        name="fullname"
                        required
                        className="form-input-half"
                        error={errors?.fullname}
                        onChange={handleInput}
                        helperText={errors?.fullname}
                    />
                    <TextField
                        autoComplete=""
                        label="Email"
                        variant="outlined"
                        id="email"
                        name="email"
                        required
                        className="form-input"
                        error={errors?.email}
                        onChange={handleInput}
                        helperText={errors?.email}
                    />
                    <TextField
                        autoComplete=""
                        label="Số điện thoại"
                        variant="outlined"
                        name="phone"
                        className="form-input"
                        error={errors?.phone}
                        helperText={errors?.phone}
                        onChange={handleInput}
                    />
                    <TextField
                        autoComplete=""
                        label="Mật khẩu (6+ kí tự)"
                        variant="outlined"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="form-input"
                        error={errors?.password}
                        helperText={errors?.password}
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
                    />
                    <TextField
                        autoComplete=""
                        label="Xác nhận mật khẩu"
                        variant="outlined"
                        name="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                        required
                        className="form-input"
                        error={errors?.confirmPassword}
                        helperText={errors?.confirmPassword}
                        onChange={handleInput}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirm}
                                        edge="end"
                                    >
                                        {showConfirm ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    {/* <div style={{
                        display: 'flex',
                        textAlign: 'center',
                    }}
                    >
                        <Checkbox
                            style={{
                                display: 'inline-block',
                            }}
                            name="agree"
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
                    </div> */}

                    <span style={{ fontSize: "15px", color: "red", marginInline: "20px", marginTop: "10px" }}>{errorServer}</span>

                    <div className="login-group">
                        <Button
                            variant="contained"
                            // color="primary"
                            type="submit"
                            className="login-button"
                        >
                            {loading ?
                                <CircularProgress size="25px" color="white" />
                                : "Đăng ký"
                            }

                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}