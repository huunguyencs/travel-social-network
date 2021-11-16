import React, { useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
// import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";

import Validator, { validatePassword, validatePhoneNumber } from "../utils/validator";

export default function Register(props) {

    const [state, setState] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        errors: {},
        submit: false,
    });

    const { errors } = state;

    const confirmPass = (value, field, sta) => value === sta[field];

    const rules = [
        {
            field: "firstname",
            method: "isEmpty",
            validWhen: false,
            message: "Họ và chữ lót không được bỏ trống!"
        },
        {
            field: "lastname",
            method: "isEmpty",
            validWhen: false,
            message: "Tên không được bỏ trống!"
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
            method: validatePassword,
            validWhen: true,
            message: "Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường, một kí tự đặc biệt, một chữ số và có độ dài lớn hơn 8"
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
            if (Object.keys(errors).length === 0) {
                console.log("register success")

                // call api to register
            }
            else {
                setState({
                    ...state,
                    submit: false,
                })
            }
        }
    }, [errors, state])

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
                <p style={{
                    opacity: 0.5,
                    marginTop: '1rem',
                    marginBottom: '1rem'
                }}>Đăng ký tài khoản</p>
                <form
                    // style={{
                    //     marginTop: '-10px'
                    // }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <div style={{ display: "flex", margin: 0 }}>
                        <TextField
                            autoComplete=""
                            label="Họ và chữ lót"
                            variant="outlined"
                            id="lastname"
                            name="lastname"
                            className="form-input-half"
                            error={errors?.lastname}
                            onChange={handleInput}
                            helperText={errors?.lastname}
                        />
                        <TextField
                            autoComplete=""
                            label="Tên"
                            id="firstname"
                            variant="outlined"
                            name="firstname"
                            className="form-input-half"
                            error={errors?.firstname}
                            onChange={handleInput}
                            helperText={errors?.firstname}
                        />
                    </div>
                    <TextField
                        autoComplete=""
                        label="Email"
                        variant="outlined"
                        id="email"
                        name="email"
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
                        label="Password (8+ Charactor)"
                        variant="outlined"
                        name="password"
                        type="password"
                        className="form-input"
                        error={errors?.password}
                        helperText={errors?.password}
                        onChange={handleInput}
                    />
                    <TextField
                        autoComplete=""
                        label="Confirm password"
                        variant="outlined"
                        name="confirmPassword"
                        type="password"
                        className="form-input"
                        error={errors?.confirmPassword}
                        helperText={errors?.confirmPassword}
                        onChange={handleInput}
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