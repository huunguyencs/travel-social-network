import {
  InputBase,
  Typography,
  Paper,
  TextField,
  Chip
} from '@material-ui/core';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useState } from 'react';

import { formStyles } from '../../style';
import EmojiPicker from '../Input/EmojiPicker';

const modules = {
  toolbar: [
    [{ header: [3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
      { align: [] }
    ],
    ['link']
  ]
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'align',
  'link'
];

export default function UpdateTourInfo({ tourInfo, setTourInfo, image, cost }) {
  const { name, hashtags, content } = tourInfo;

  const [hashtagArr, setHashtagArr] = useState(hashtags);
  const [hashtag, setHashtag] = useState('');

  const handleInput = e => {
    setTourInfo(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const setContent = value => {
    setTourInfo(state => ({
      ...state,
      content: value
    }));
  };

  const hashtagSplit = text => {
    var ht = text.split(' ');
    return ht.filter(item => item !== '');
  };

  const changeHashtags = () => {
    let ht = hashtagSplit(hashtag);
    ht = [...hashtagArr, ...ht];
    setTourInfo(state => ({
      ...state,
      hashtags: ht
    }));
  };

  const addHashtag = e => {
    e.preventDefault();
    let arr = hashtagSplit(hashtag);
    arr = [...hashtagArr, ...arr];
    setHashtagArr(arr);
    setHashtag('');
    changeHashtags();
  };

  const changeHashtag = e => {
    setHashtag(e.target.value);
  };

  const removeHashtag = index => {
    let temp = [...hashtagArr];
    temp.splice(index, 1);
    setHashtagArr(temp);
    changeHashtags();
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
            value={name}
            className={classes.tourNameInput}
            onChange={handleInput}
          />
          <Typography>
            <b>Tổng chi phí: </b>
            {new Intl.NumberFormat().format(cost * 1000)} VND
          </Typography>
          {/* <TextField
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
          /> */}
          <div className={classes.postContentInput}>
            {/* <InputBase
              placeholder="Nội dung tour ..."
              rows={7}
              name="content"
              id="content"
              multiline
              className={classes.input}
              value={content}
              onChange={handleInput}
            /> */}
            <ReactQuill
              value={content}
              onChange={e => setTourInfo(state => ({ ...state, content: e }))}
              style={{ width: '100%' }}
              placeholder="Nội dung tour ..."
              modules={modules}
              formats={formats}
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
              <EmojiPicker content={content} setContent={setContent} />
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
}
