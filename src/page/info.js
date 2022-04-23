import {
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  TextField
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import React, { useState } from 'react';
import ChangeImage from '../components/Forms/ChangeImage';
import DateFnsUtils from '@date-io/date-fns';
import { formStyles } from '../style';
import customAxios from '../utils/fetchData';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImages } from '../utils/uploadImage';
import { Link, useHistory } from 'react-router-dom';
import { getUserInfo } from '../redux/actions/userAction';

const hobbiesOption = [
  'Biển',
  'Núi',
  'Lễ hội',
  'Lịch sử',
  'Văn hóa',
  'Thiên nhiên',
  'Con người'
];

export default function InfoPage() {
  const { token } = useSelector(state => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(null);
  const [bg, setBg] = useState(null);
  const [hobbies, setHobbies] = useState([]);
  const [birthday, setBirthday] = useState(null);
  const [andress, setAndress] = useState(null);
  const [state, setState] = useState({
    loading: false,
    error: false
  });

  const classes = formStyles();

  const changeHobbies = (e, value) => {
    // console.log(value);
    setHobbies(value);
  };

  const handleChangeDate = e => {
    setBirthday(e);
    // console.log(e);
  };

  const handleSubmit = async () => {
    setState(state => ({
      ...state,
      loading: true
    }));
    let urlAvatar = '',
      urlBg = '';
    if (avatar) urlAvatar = await uploadImages([avatar]);
    if (bg) urlBg = await uploadImages([bg]);

    customAxios(token)
      .patch('/user/change_new', {
        avatar: urlAvatar,
        background: urlBg,
        hobbies,
        birthday,
        andress
      })
      .then(res => {
        setState({
          loading: false
        });
        dispatch(getUserInfo({ user: res.data.user }));
        history.push('/');
      })
      .catch(() => {
        setState({
          loading: false,
          error: true
        });
      });
  };

  return (
    <Container style={{ marginTop: 150 }}>
      <Grid container spacing={8}>
        <Grid item md={4} sm={12}>
          <ChangeImage
            src={avatar}
            setSrc={setAvatar}
            textSize={20}
            className={classes.sizeAvatarInfo}
          />
        </Grid>
        <Grid item md={8} sm={12}>
          <ChangeImage
            src={bg}
            setSrc={setBg}
            textSize={20}
            className={classes.sizeBgInfo}
          />
        </Grid>
      </Grid>
      <Autocomplete
        multiple
        id="tags-filled"
        options={hobbiesOption}
        freeSolo
        value={hobbies}
        onChange={changeHobbies}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip label={option} {...getTagProps({ index })} color="primary" />
          ))
        }
        renderInput={params => (
          <TextField
            {...params}
            variant="filled"
            label="Sở thích"
            placeholder="Favorites"
          />
        )}
      />
      <div>
        <TextField
          label="Địa chỉ"
          variant="outlined"
          name="andress"
          onChange={e => setAndress(e.target.value)}
          value={andress}
          className={classes.fullField}
          required
        />
      </div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          name="birthday"
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="birthday"
          label="Ngày sinh"
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
          onChange={handleChangeDate}
          value={birthday}
          // className={classes.fullField}
        />
      </MuiPickersUtilsProvider>
      {state.error && <span>Có lỗi xảy ra!</span>}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Button
            variant="contained"
            component={Link}
            to="/"
            disabled={state.loading}
          >
            Bỏ qua
          </Button>
        </div>
        {state.loading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Xong
          </Button>
        )}
      </div>
    </Container>
  );
}
