import React, { useEffect, useState } from "react";
import { TextField, Button, InputAdornment, IconButton, CircularProgress } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";


import Validator, { nonSpace, validatePassword } from "../../utils/validator";
import { profileStyles } from "../../style";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../redux/callApi/authCall";


export default function ChangePassword(props) {
    const classes = profileStyles();

    const dispatch = useDispatch();
    const { token } = useSelector(state => state.auth)


    const [context, setContext] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const [showPassword1, setShowPassword1] = useState(false);
    const handleClickShowPassword1 = () => {
        setShowPassword1(state => !state);
    }
    const [showPassword2, setShowPassword2] = useState(false);
    const handleClickShowPassword2 = () => {
        setShowPassword2(state => !state);
    }
    const [showPassword3, setShowPassword3] = useState(false);
    const handleClickShowPassword3 = () => {
        setShowPassword3(state => !state);
    }
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [errorServer, setErrorServer] = useState(null);
    const [submit, setSubmit] = useState(false);


    const confirmPass = (value, field, sta) => value === sta[field];

    const rules = [
        {
            field: "newPassword",
            method: "isEmpty",
            validWhen: false,
            message: "Mật khẩu không được bỏ trống!"
        },
        {
            field: "newPassword",
            method: nonSpace,
            validWhen: true,
            message: "Mật khẩu không được chứa khoảng cách",
        },
        {
            field: "newPassword",
            method: validatePassword,
            validWhen: true,
            message: "Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường, một chữ số và có độ dài lớn hơn 6"
        },
        {
            field: "confirmPassword",
            method: confirmPass,
            args: ['newPassword'],
            validWhen: true,
            message: "Xác nhận mật khẩu không khớp"
        },
    ]

    const validator = new Validator(rules);

    const handleInput = e => {
        setContext({
            ...context,
            [e.target.name]: e.target.value
        })
        setErrors({
            ...errors,
            [e.target.name]: null
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        setSubmit(true);
        setErrors(validator.validate(context));
    }

    useEffect(() => {
        if (submit) {
            setLoading(true);
            setErrorServer(null);
            if (Object.keys(errors).length === 0) {
                dispatch(changePassword(token, {
                    newPassword: context.newPassword,
                    oldPassword: context.oldPassword
                }, () => {
                    setLoading(false);
                }, (msg) => {
                    setLoading(false);
                    setErrorServer(msg);
                }))
            }
            else {
                setLoading(false);
            }

            setSubmit(false);
        }
    }, [errors, submit, context, dispatch, token])

    useEffect(() => {
        document.title = "Thay đổi mật khẩu";
    }, [])

    return (
        <div className={classes.change_password}>
            <div className={classes.change_password_form}>
                <form
                    onSubmit={handleSubmit}
                >
                    <TextField
                        autoComplete=""
                        label="Mật khẩu cũ"
                        variant="outlined"
                        name="oldPassword"
                        className="form-input"
                        required
                        onChange={handleInput}
                        helperText={errors?.oldPassword}
                        error={errors?.oldPassword}
                        type={showPassword1 ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle old password visibility"
                                        onClick={handleClickShowPassword1}
                                        edge="end"
                                        size="small"
                                    >
                                        {showPassword1 ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    >
                    </TextField>
                    <TextField
                        autoComplete=""
                        label="Mật khẩu mới"
                        variant="outlined"
                        name="newPassword"
                        className="form-input"
                        required
                        onChange={handleInput}
                        helperText={errors?.newPassword}
                        error={errors?.newPassword}
                        type={showPassword2 ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle new password visibility"
                                        onClick={handleClickShowPassword2}
                                        edge="end"
                                        size="small"
                                    >
                                        {showPassword2 ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    >
                    </TextField>
                    <TextField
                        autoComplete=""
                        label="Xác nhận mật khẩu"
                        variant="outlined"
                        name="confirmPassword"
                        className="form-input"
                        required
                        onChange={handleInput}
                        helperText={errors?.confirmPassword}
                        error={errors?.confirmPassword}
                        type={showPassword3 ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle confirm password visibility"
                                        onClick={handleClickShowPassword3}
                                        edge="end"
                                        size="small"
                                    >
                                        {showPassword3 ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    >
                    </TextField>

                    <span style={{ fontSize: "15px", color: "red", marginInline: "20px", marginTop: "10px" }}>{errorServer}</span>

                    <div className="login-group">
                        <Button
                            variant="contained"
                            type="submit"
                            className="login-button"

                        >
                            {
                                loading ?
                                    <CircularProgress size="25px" style={{ color: "white" }} />
                                    : "Cập nhật"
                            }
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}