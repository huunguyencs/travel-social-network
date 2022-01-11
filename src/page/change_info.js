import React, { useEffect } from "react";
import { Box, Tab, Tabs, TextField, Button, Radio, Container } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import PropTypes from 'prop-types';
import { RadioGroup, FormControlLabel } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';

import { profileStyles } from "../style";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useSelector } from "react-redux";
import ChangePassword from "../components/forms/changePassword";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`
    };
}

function ChangeInfo(props) {

    const classes = profileStyles();

    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        document.title = "Thay đổi thông tin";
    }, []);

    return (
        <>
            {
                user && <div className={classes.change_info}>
                    <div className={classes.change_background}>
                        <div className={classes.change_background_upload}>
                            <input accept="image/*" style={{ display: "none" }} id="icon-button-file" type="file" />
                            <label htmlFor="icon-button-file" style={{ cursor: 'pointer' }}>
                                <PhotoCamera />
                            </label>
                        </div>
                        <img className={classes.change_bg} src={user?.background} alt="cover"></img>
                    </div>
                    <div className={classes.change_wrapper}>
                        <div className={classes.change_avatar}>
                            <div className={classes.change_avatar_upload}>
                                <input accept="image/*" style={{ display: "none" }} id="icon-button-file" type="file" />
                                <label htmlFor="icon-button-file" style={{ cursor: 'pointer' }}>
                                    <PhotoCamera />
                                </label>
                            </div>
                            <img className={classes.change_avatar_img} src={user?.avatar} alt="avatar"></img>
                        </div>
                        <div className={classes.change_form}>
                            <form

                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    value={user?.username}
                                    label="Tên tài khoản"
                                    variant="outlined"
                                    name="username"
                                    className="form-input"
                                    required
                                />
                                <TextField
                                    value={user?.fullname}

                                    label="Họ và Tên"
                                    variant="outlined"
                                    name="name"
                                    className="form-input"
                                    required
                                />
                                <TextField
                                    value={user?.email}

                                    label="Email"
                                    variant="outlined"
                                    name="email"
                                    className="form-input"
                                    required
                                />
                                <TextField
                                    value={user?.phone}

                                    label="Số điện thoại"
                                    variant="outlined"
                                    name="phone"
                                    className="form-input"
                                />
                                <TextField


                                    label="Sở thích du lịch"
                                    variant="outlined"
                                    name="hobby"
                                    type="text"
                                    className="form-input"
                                />
                                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                    <KeyboardDatePicker
                                        name="date"
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Ngày sinh"
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        onChange={(e) => e}
                                        className={classes.inputfield}
                                    />
                                </MuiPickersUtilsProvider>
                                <RadioGroup className={classes.inputfield} row aria-label="position" name="position" defaultValue="male">
                                    <FormControlLabel value="male" control={<Radio color="primary" />} label="Nam" />
                                    <FormControlLabel value="female" control={<Radio color="primary" />} label="Nữ" />
                                    <FormControlLabel value="other" control={<Radio color="primary" />} label="Khác" />
                                </RadioGroup>
                                <div className="login-group">
                                    <Button
                                        variant="contained"
                                        // color="primary"
                                        type="submit"
                                        className="login-button"
                                    >
                                        Cập nhập
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>}
        </>
    )
}


export default function Change_info(props) {
    const classes = profileStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <Container className={classes.root}>

                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab className={classes.tab} label="Thay đổi thông tin" {...a11yProps(0)} />
                    <Tab className={classes.tab} label="Thay đổi mật khẩu" {...a11yProps(1)} />
                    <Tab className={classes.tab} label="Bảo mật và riêng tư" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0} className={classes.tabPanel}>
                    <ChangeInfo />
                </TabPanel>
                <TabPanel value={value} index={1} className={classes.tabPanel}>
                    <ChangePassword />
                </TabPanel>
                <TabPanel value={value} index={2} className={classes.tabPanel}>
                    404
                </TabPanel>
            </Container>
        </div>
    )
}