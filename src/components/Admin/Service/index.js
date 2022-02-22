import React from "react";
import { Container } from "@material-ui/core";


import Typography from '@material-ui/core/Typography';

import { adminStyles } from "../../../style";




function AdminServices(props) {
    const classes = adminStyles();


    return (
        <Container className={classes.container}>
            <div className={classes.appBarSpacer} />

            <div
                className={classes.admin_location_header}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingLeft: "50px",
                    paddingRight: "50px",
                }}
            >
                <div className={classes.admin_location_header_left}>
                    <Typography variant="h4" gutterBottom>100 Dịch vụ</Typography>
                </div>
            </div>
        </Container>
    );
}

export default AdminServices;