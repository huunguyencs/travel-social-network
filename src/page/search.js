import { Avatar, Box, Container, Grid, List, ListItem, ListItemAvatar, ListItemText, Tab, Tabs, Typography } from "@material-ui/core";
import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import { searchStyles } from "../style";
import SpeedDialButton from "../components/speedDialBtn";


function TabPanel(props) {
    const { value, index, ...other } = props;

    const classes = searchStyles();

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            <SpeedDialButton />
            {value === index && (
                <Box p={3}>
                    {value}
                    <List className={classes.listSearch} component={Link} to="/profile/4646">
                        <ListItem className={classes.itemSearch}>
                            <ListItemAvatar>
                                <Avatar alt="avatar" />
                            </ListItemAvatar>
                            <ListItemText>
                                Text
                            </ListItemText>
                        </ListItem>
                        <ListItem className={classes.itemSearch}>
                            <ListItemAvatar>
                                <Avatar alt="avatar" />
                            </ListItemAvatar>
                            <ListItemText>
                                Text
                            </ListItemText>
                        </ListItem>
                        <ListItem className={classes.itemSearch}>
                            <ListItemAvatar>
                                <Avatar alt="avatar" />
                            </ListItemAvatar>
                            <ListItemText>
                                Text
                            </ListItemText>
                        </ListItem>
                        <ListItem className={classes.itemSearch}>
                            <ListItemAvatar>
                                <Avatar alt="avatar" />
                            </ListItemAvatar>
                            <ListItemText>
                                Text
                            </ListItemText>
                        </ListItem>
                    </List>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


export default function SearchPage(props) {


    const classes = searchStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            <div className={classes.appBarSpacer} />
            <div className={classes.appBarSpacer} />
            <Grid container>
                <Grid item md={3}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        className={classes.tabs}
                    >
                        <Tab label="Tất cả" {...a11yProps(0)} className={value === 0 ? [classes.tab, classes.active] : classes.tab} />
                        <Tab label="Địa điểm" {...a11yProps(1)} className={value === 1 ? [classes.tab, classes.active] : classes.tab} />
                        <Tab label="Người dùng" {...a11yProps(2)} className={value === 2 ? [classes.tab, classes.active] : classes.tab} />
                        <Tab label="Dịch vụ" {...a11yProps(3)} className={value === 3 ? [classes.tab, classes.active] : classes.tab} />
                        <Tab label="Nhóm" {...a11yProps(4)} className={value === 4 ? [classes.tab, classes.active] : classes.tab} />
                        <Tab label="Sự kiện" {...a11yProps(5)} className={value === 5 ? [classes.tab, classes.active] : classes.tab} />
                    </Tabs>
                </Grid>
                <Grid item md={9}>
                    <Typography className={classes.query}>Hiển thị kết quả tìm kiếm cho "abcxyz"</Typography>
                    <TabPanel value={value} index={0} />
                    <TabPanel value={value} index={1} />
                    <TabPanel value={value} index={2} />
                    <TabPanel value={value} index={3} />
                    <TabPanel value={value} index={4} />
                    <TabPanel value={value} index={5} />
                </Grid>
            </Grid>
        </Container>
    )
}