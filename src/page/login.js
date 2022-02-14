import React, { useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

import Validator, { isEmpty } from '../utils/validator';
import { login } from '../redux/callApi/authCall';
import { authStyles } from "../style";

export default function Login(props) {

    const classes = authStyles();

    const history = useHistory();

    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);

    const [context, setContext] = useState({
        email: '',
        password: '',
    })

    const [showPassword, setShowPassword] = useState(false);
    const [errorServer, setErrorServer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [submit, setSubmit] = useState(false);


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
            [e.target.name]: e.target.value,
        })
        setErrors({
            ...errors,
            [e.target.name]: null
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmit(true);
        setErrors(validator.validate(context));
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
        if (submit) {
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
            else {
                setLoading(false);
            }
            setSubmit(false);
        }
    }, [errors, submit, dispatch, context])




    const handleClickShowPassword = () => {
        setShowPassword(state => !state);
    };


    return (
        <Grid container className={classes.root}>
            <Grid item md={6} className={classes.imageContainer}>
                <div className={classes.imageCover} />
            </Grid>
            <Grid item md={6} sm={12} xs={12} className={classes.formLogin}>
                {/* <h3 className="form-login-title">GOGO</h3> */}
                <div className={classes.buttonContainer}>
                    <div className={classes.buttonSwitch}>
                        <Button component="p" className={classes.buttonActiveLogin}>Đăng nhập</Button>
                        <Button component={Link} to='/register' className={classes.buttonUnActiveRegister}>Đăng ký</Button>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className={classes.form}
                >
                    <div className={classes.center}>
                        <TextField
                            autoComplete=""
                            label="Email"
                            variant="outlined"
                            name="email"
                            id="email"
                            type="email"
                            className={classes.formInput}
                            required
                            error={Boolean(errors?.email)}
                            helperText={errors?.email}
                            value={context.email}
                            onChange={handleInput}
                        />
                    </div>
                    <div className={classes.center}>
                        <TextField
                            autoComplete=""
                            label="Mật khẩu"
                            variant="outlined"
                            required
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            error={Boolean(errors?.password)}
                            helperText={errors?.password}
                            className={classes.formInput}
                            value={context.password}
                            onChange={handleInput}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            size="small"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                    <p className={classes.forgotPassword}>
                        Quên mật khẩu?
                    </p>
                    <span className={classes.error}>{errorServer}</span>
                    <div className={classes.loginGroup}>
                        <Button
                            variant="contained"
                            type="submit"
                            className={classes.loginButton}
                        >
                            {loading ?
                                <CircularProgress size="25px" color="inherit" />
                                : "Đăng nhập"
                            }
                        </Button>
                    </div>
                </form>
            </Grid>
        </Grid>
    )
}