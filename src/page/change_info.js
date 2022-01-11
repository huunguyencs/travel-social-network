import React from "react";
import { Box, Tab, Tabs, Container } from "@material-ui/core";
import PropTypes from 'prop-types';


import { profileStyles } from "../style";

import ChangePassword from "../components/forms/changePassword";
import ChangeInfo from "../components/forms/changeInfo";
import { useSelector } from "react-redux";


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


export default function Change_info(props) {
    const classes = profileStyles();

    const { token } = useSelector(state => state.auth)

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
                    {token && <ChangeInfo />}
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