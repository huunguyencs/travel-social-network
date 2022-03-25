import React from "react";
import {
  makeStyles,
  Button,
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@material-ui/core";
import { ArrowBack, Update } from "@material-ui/icons";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "100px"
  },
  fullField: {
    width: "100%",
    marginBlock: 10
  },
  background: {
    position: "relative",
    width: "100%",
    height: "200px",

  },
  bg_img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 10
  },
  avatar: {
    position: "relative",
    marginTop: -100,
    display: 'flex',
    justifyContent: 'center',
  },
  avatar_img: {
    borderRadius: "50%",
    objectFit: "cover",
    backgroundColor: 'white',
    border: "2px solid #555",
  },
  login_group: {
    display: 'flex',
    justifyContent: 'right',
    margin: 30
  },
  image: {
    marginBlock: 10
  }
}));

function AdminUserDetail(props) {
  const classes = useStyles();

  const { user, setUser } = props;

  const onChangeRole = (e) => {
    setUser(oldState => ({
      ...oldState,
      role: e.target.value
    }))
  }

  const updateUser = (e) => {
    e.preventDefault();
  }


  const history = useHistory();

  const back = () => {
    history.push('/admin/user');
  }

  return (
    <>
      {user &&
        <Container className={classes.container}>
          <IconButton onClick={back}>
            <ArrowBack />
          </IconButton>
          <div className={classes.image}>
            <div className={classes.background}>
              <img className={classes.bg_img} src={user.background} alt="background" />
            </div>
            <div className={classes.avatar}>
              <img alt="avatar" src={user.avatar} width={180} height={180} className={classes.avatar_img} />
            </div>

          </div>
          <div>
            <div className={classes.change_form}>
              <form noValidate autoComplete="off">
                <TextField
                  label="ID"
                  variant="outlined"
                  name="id"
                  className={classes.fullField}
                  defaultValue={user._id}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  label="Tên người dùng"
                  variant="outlined"
                  name="name"
                  className={classes.fullField}
                  defaultValue={user.username}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  label="Tên đầy đủ"
                  variant="outlined"
                  name="name"
                  className={classes.fullField}
                  defaultValue={user.fullname}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  name="email"
                  className={classes.fullField}
                  required={true}
                  defaultValue={user.email}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <FormControl variant="outlined" className={classes.fullField}>
                  <InputLabel id="role-user-change-label">Role</InputLabel>
                  <Select
                    labelId="role-user-change-label"
                    label='role-user-change'
                    value={user.role}
                    onChange={onChangeRole}
                  >
                    <MenuItem value={0}>Người dùng bình thường</MenuItem>
                    <MenuItem value={1}>Đối tác</MenuItem>
                    <MenuItem value={2}>Admin</MenuItem>
                  </Select>
                </FormControl>

                {
                  user.confirmAccount &&
                  <div>
                    <img height={200} width={300} src={user.confirmAccount.cmndFront} alt='front' />
                    <img height={200} width={300} src={user.confirmAccount.cmndBack} alt='back' />
                    <img height={200} width={300} src={user.confirmAccount.cmndFace} alt='face' />
                  </div>
                }

                <div className={classes.login_group}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={(
                      <Update />
                    )}
                    type="submit"
                    className={classes.login_button}
                    onClick={updateUser}
                  >
                    Cập nhập
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      }
    </>

  );
}

export default AdminUserDetail;
