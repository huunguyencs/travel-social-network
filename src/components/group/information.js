import React from "react";
import { GroupAdd } from "@material-ui/icons";
import { Avatar, Button, Container, Typography } from "@material-ui/core";

import profileStyles from "../../style";
import { Link } from "react-router-dom";

function GroupInfo(props) {
  const classes = profileStyles();
  return (
    <Container className={classes.container} style={{ alignItems: "center", background: "#FFFFFF", width: "100%", padding: "20px" }}>
      <div
        style={{ width: "100%", alignItems: "center" }}
      >
        <img
          className={classes.group_overImage}
          style={{ borderRadius: "20px", width: "100%", height: "500px", marginTop: "60px" }}
          src="https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg"
          alt="cover"
        />
      </div>

      <div className={classes.group_info} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "20px",
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
          <div className={classes.group_list_menber} style={{ display: 'flex', flexDirection: 'row' }}>
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
          style={{ marginTop: "70px", marginRight: "5vw" }}
        >
          <Button
            variant="outlined"
            startIcon={<GroupAdd />}
            style={{ backgroundColor: "#A5DEC8" }}
          >
            Tham gia nhóm
          </Button>
        </div>

      </div>
    </Container>
  );
}

export default GroupInfo;
