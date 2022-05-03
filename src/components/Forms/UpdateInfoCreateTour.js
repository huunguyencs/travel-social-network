import {
  InputBase,
  Typography,
  Button,
  Paper,
  TextField,
  Chip,
  InputAdornment
} from '@material-ui/core';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { formStyles } from '../../style';
import { updateInfo } from '../../redux/actions/createTourAction';
import EmojiPicker from '../Input/EmojiPicker';

export default function UpdateTourInfo({ name, content, hashtags, cost }) {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: name,
    cost: cost
  });
  const [hashtagArr, setHashtagArr] = useState(hashtags);
  const [hashtag, setHashtag] = useState('');

  const [text, setText] = useState(content);

  const handleInput = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const hashtagSplit = text => {
    var ht = text.split(' ');
    return ht.filter(item => item !== '');
  };

  const handleSubmit = () => {
    // console.log(state);
    let ht = hashtagSplit(hashtag);
    ht = [...hashtagArr, ...ht];
    dispatch(
      updateInfo({
        name: state.name,
        content: text,
        hashtags: ht,
        cost: parseInt(state.cost)
      })
    );
  };

  const addHashtag = e => {
    e.preventDefault();
    let arr = hashtagSplit(hashtag);
    arr = [...hashtagArr, ...arr];
    setHashtagArr(arr);
    setHashtag('');
  };

  const changeHashtag = e => {
    setHashtag(e.target.value);
  };

  const removeHashtag = index => {
    let temp = [...hashtagArr];
    temp.splice(index, 1);
    setHashtagArr(temp);
  };

  const classes = formStyles();

  return (
    <Paper className={classes.paperUpdateInfoContainer}>
      <div className={classes.textTitle}>
        <Typography variant="h5">Thông tin hành trình</Typography>
      </div>
      <div>
        <div className={classes.formContainer}>
          <TextField
            name="name"
            id="name"
            label="Tên tour"
            variant="outlined"
            value={state.name}
            className={classes.tourNameInput}
            onChange={handleInput}
          />
          <TextField
            type={'number'}
            name="cost"
            id="cost"
            label="Chi phí"
            variant="outlined"
            value={state.cost}
            className={classes.tourNameInput}
            onChange={handleInput}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">.000 VND</InputAdornment>
              )
            }}
          />
          <div className={classes.postContentInput}>
            <InputBase
              placeholder="Nội dung tour ..."
              rows={7}
              name="content"
              id="content"
              multiline
              className={classes.input}
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </div>
          <div>
            <div>
              {hashtagArr.map((value, idx) => (
                <Chip
                  label={'#' + value}
                  onDelete={() => removeHashtag(idx)}
                  key={idx}
                  style={{ marginInline: 5 }}
                />
              ))}
            </div>
            <form onSubmit={addHashtag}>
              <InputBase
                placeholder="Hashtag. Ex: #bien #lehoi ..."
                variant="outlined"
                name="hashtag"
                id="hashtag"
                value={hashtag}
                className={classes.hashtag}
                onChange={changeHashtag}
              />
            </form>
          </div>
          <div className={classes.formAction}>
            <div>
              <EmojiPicker content={text} setContent={setText} />
            </div>
            <div>
              <Button className={classes.button} onClick={handleSubmit}>
                Cập nhật
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
}
