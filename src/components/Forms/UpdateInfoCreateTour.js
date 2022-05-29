import {
  InputBase,
  Typography,
  TextField,
  Chip,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import React, { useState } from 'react';

import { formStyles } from '../../style';
// import EmojiPicker from '../Input/EmojiPicker';
import QuillEditor from '../QuillEditor';

export default function UpdateTourInfo({ tourInfo, setTourInfo, image, cost }) {
  const { name, hashtags, content, isPublic } = tourInfo;

  const [hashtagArr, setHashtagArr] = useState(hashtags);
  const [hashtag, setHashtag] = useState('');

  const handleInput = e => {
    setTourInfo(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  // const setContent = value => {
  //   setTourInfo(state => ({
  //     ...state,
  //     content: value
  //   }));
  // };

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
    <div className={classes.paperUpdateInfoContainer}>
      <div className={classes.textTitle}>
        <Typography variant="h5">Thông tin hành trình</Typography>
      </div>
      <div>
        <div className={classes.formContainerTour}>
          <TextField
            name="name"
            id="name"
            label="Tên tour"
            variant="outlined"
            value={name}
            className={classes.tourNameInput}
            onChange={handleInput}
          />
          <Typography className={classes.costTotalTour}>
            <b>Tổng chi phí: </b>
            {new Intl.NumberFormat().format(cost * 1000)} VND
          </Typography>
          <div className={classes.postContentInput}>
            {/* <ReactQuill
              value={content}
              onChange={e => setTourInfo(state => ({ ...state, content: e }))}
              style={{ width: '100%' ,height: 200}}
              placeholder="Nội dung tour ..."
              modules={modules}
              formats={formats}
            /> */}
            <QuillEditor
              value={content}
              setValue={e => setTourInfo(state => ({ ...state, content: e }))}
              placeholder="Nội dung tour ..."
            />
          </div>
          <div style={{ marginTop: 50 }}>
            <div>
              {hashtagArr.map((value, idx) => (
                <Chip
                  label={'#' + value}
                  onDelete={() => removeHashtag(idx)}
                  key={idx}
                  style={{ marginInline: 5, backgroundColor: '#a5dec8' }}
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
          <div style={{ display: 'flex' }}>
            {/* <EmojiPicker content={content} setContent={setContent} /> */}
            <FormControlLabel
              control={
                <Switch
                  checked={isPublic}
                  onChange={e =>
                    setTourInfo(state => ({
                      ...state,
                      isPublic: !state.isPublic
                    }))
                  }
                  name="isPublic"
                  color="primary"
                />
              }
              label={isPublic ? 'Công khai' : 'Riêng tư'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
