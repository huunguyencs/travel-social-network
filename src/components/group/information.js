import React from "react";
import { GroupAdd } from "@material-ui/icons";
import { Avatar, Button, Container, Typography } from "@material-ui/core";

import profileStyles from "../../style";
import { Link } from "react-router-dom";

function Group_Info(props) {
  const classes = profileStyles();
  return (
    <Container className={classes.container}>
      <div style={{alignItems: "center"}}>
        <img
          className={classes.group_overImage}
          style={{width: "80%"}}
          src="https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg"
          alt="cover"
        />
      </div>
      
      <div className={classes.group_info} style={{display: "flex", flexDirection: "row"}}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "100px",
            marginLeft: "5vw",
          }}
        >
            <Typography
                variant="body1"
                color="black"
                component="p"
                style={{ fontSize: "35px" }}
            >
                Nhóm đi du lịch phượt
            </Typography>
            <div>
                <Typography
                variant="body1"
                color="#9b9696"
                component="p"
                style={{ fontSize: "20px" }}
                >
                <Link style={{ marginRight: "20px" }}>300 Thành viên</Link>
                </Typography>
            </div>
            <div className={classes.group_list_menber} style={{display: 'flex', flexDirection: 'row'}}>
                <Avatar
                className={classes.group_avatar__img}
                src="https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg"
                alt="avatar"
                />
                <Avatar
                className={classes.group_avatar__img}
                src="https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg"
                alt="avatar"
                />
                <Avatar
                className={classes.group_avatar__img}
                src="https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg"
                alt="avatar"
                />
                <Avatar
                className={classes.group_avatar__img}
                src="https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg"
                alt="avatar"
                />
                <Avatar
                className={classes.group_avatar__img}
                src="https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg"
                alt="avatar"
                />
            </div>
        </div>

        <div
          className={classes.profile_button}
          style={{ marginTop: "120px", marginLeft: "10vw" }}
        >
          <Button
            variant="outlined"
            startIcon={<GroupAdd />}
            style={{ backgroundColor: "#A5DEC8", marginRight: "20px" }}
          >
            Tham gia nhóm
          </Button>
        </div>

      </div>
    </Container>
  );
}

export { Group_Info };
