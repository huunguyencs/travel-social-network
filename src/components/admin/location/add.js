import React from "react";
import {
  Group,
  GroupAdd,
  GroupWork,
  LocationOn,
  Public,
  RemoveRedEye,
} from "@material-ui/icons";
import {
  Avatar,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from "@material-ui/core";

import { useState } from "react";

import adminStyles from "../../../style";

function AdminAddLocation(props) {
  const [selectedImage, setSelectedImage] = useState();

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const classes = adminStyles();
  return (
    <Container className={classes.container} style={{ marginTop: "160px" }}>
      <div>
        <Typography variant="h4" color= "primary">Thêm địa điểm</Typography>
      </div>
      <div className={classes.adminLocation_body} style={{ width: "700px" }}>
        <form
          style={{
            marginTop: "-10px",
          }}
          noValidate
          autoComplete="off"
          method="POST"
        >
          <div
            className={classes.adminLocation_itemInput}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Typography>Tên</Typography>
            <TextField
              autoComplete=""
              variant="outlined"
              name="name"
              className="form-input"
              required
            ></TextField>
          </div>

          <div
            className={classes.adminLocation_itemInput}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Typography>Mô tả</Typography>
            <TextField
              autoComplete=""
              variant="outlined"
              required
              name="description"
              className="form-input"
            ></TextField>
          </div>

          <div
            className={classes.adminLocation_itemInput}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Typography>Categories</Typography>
            <TextField
              autoComplete=""
              variant="outlined"
              required
              name="categories"
              className="form-input"
            ></TextField>
          </div>

          <div>
            <Button>
                Chọn vị trí
            </Button>
          </div>

          <div>
            <input accept="image/*" type="file" onChange={imageChange} />

            {selectedImage && (
              <div style={styles.preview}>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  style={styles.image}
                  alt="Thumb"
                />
                <button onClick={removeSelectedImage} style={styles.delete}>
                  Remove This Image
                </button>
              </div>
            )}
          </div>

          <div className="login-group">
            <Button
              variant="contained"
              // color="primary"
              type="submit"
              className="login-button"
            >
              Thêm địa điểm
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}

const styles = {
  preview: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "100%", maxHeight: 320 },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "red",
    color: "white",
    border: "none",
  },
};

export default AdminAddLocation;
