import React from "react";
import { Typography, Grid, Box, Tab, Tabs, IconButton, TextField, Button, Radio } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import PropTypes from 'prop-types';
import { RadioGroup, FormControlLabel } from "@material-ui/core";

import { profileMenu } from "../../constant/menu";
import Header from "../../components/header/Header";
import LeftBar from "../../components/leftbar/LeftBar";
import { profileStyles } from "../../style";
import Menu from "../../components/leftbar/menu";


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
                <Box p={3}>
                    <Typography>{children}</Typography>
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


export default function Change_info(props) {
    const classes = profileStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <Header />
            <Grid container style={{ margin: 0, padding: 0 }}>
                <Grid item sm={3}>
                    <LeftBar >
                        <Menu menuList={profileMenu} />
                    </LeftBar>
                </Grid>
                <Grid item sm={9}>
                    <div className={classes.root}>
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
                            <div className={classes.change_info}>
                                <div className={classes.change_background}>
                                    <div className={classes.change_background_upload}>
                                        <input accept="image/*" style={{ display: "none" }} id="icon-button-file" type="file" />
                                        <label htmlFor="icon-button-file">
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <PhotoCamera />
                                            </IconButton>
                                        </label>
                                    </div>
                                    <img className={classes.change_bg} src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1625327484/Toho/close-up-opened-umbrella-mockup_53876-98796_nj3un5.jpg" alt="cover"></img>
                                </div>
                                <div className={classes.change_wrapper}>
                                    <div className={classes.change_avatar}>
                                        <div className={classes.change_avatar_upload}>
                                            <input accept="image/*" style={{ display: "none" }} id="icon-button-file" type="file" />
                                            <label htmlFor="icon-button-file">
                                                <IconButton color="primary" aria-label="upload picture" component="span">
                                                    <PhotoCamera />
                                                </IconButton>
                                            </label>
                                        </div>
                                        <img className={classes.change_avatar_img} src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1625327484/Toho/close-up-opened-umbrella-mockup_53876-98796_nj3un5.jpg" alt="avatar"></img>
                                    </div>
                                    <div className={classes.change_form}>
                                        <form

                                            noValidate
                                            autoComplete="off"
                                        >
                                            <TextField
                                                autoComplete=""
                                                label="Họ và Tên"
                                                variant="outlined"
                                                name="name"
                                                className="form-input"
                                                required={true}
                                            >
                                            </TextField>
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
                                                label="Số điện thoại"
                                                variant="outlined"
                                                name="phone"
                                                className="form-input"
                                                required={true}
                                            >
                                            </TextField>
                                            <TextField
                                                autoComplete=""
                                                label="Sở thích du lịch"
                                                variant="outlined"
                                                required={true}
                                                name="hobby"
                                                type="text"
                                                className="form-input"
                                            >
                                            </TextField>
                                            <TextField
                                                id="date"
                                                label="Birthday"
                                                type="date"
                                                defaultValue="2017-05-24"
                                                style={{ margin: "10px 0", width: "30%" }}
                                            ></TextField>
                                            <RadioGroup row aria-label="position" name="position" defaultValue="man" style={{ marginBottom: "10px" }}>
                                                <FormControlLabel value="man" control={<Radio color="primary" />} label="Nam" />
                                                <FormControlLabel value="male" control={<Radio color="primary" />} label="Nữ" />
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
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={1} className={classes.tabPanel}>
                            <div className={classes.change_password}>
                                <div className={classes.change_password_form}>
                                    <form

                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField
                                            autoComplete=""
                                            label="Mật khẩu cũ"
                                            variant="outlined"
                                            name="oldPassword"
                                            className="form-input"
                                            required={true}
                                        >
                                        </TextField>
                                        <TextField
                                            autoComplete=""
                                            label="Mật khẩu mới"
                                            variant="outlined"
                                            name="newPassword"
                                            className="form-input"
                                            required={true}
                                        >
                                        </TextField>
                                        <TextField
                                            autoComplete=""
                                            label="Xác nhận mật khẩu"
                                            variant="outlined"
                                            name="confirmPassword"
                                            className="form-input"
                                            required={true}
                                        >
                                        </TextField>

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
                        </TabPanel>
                        <TabPanel value={value} index={2} className={classes.tabPanel}>
                            404
                        </TabPanel>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}