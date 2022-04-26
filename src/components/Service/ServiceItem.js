import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Drawer,
  IconButton,
  InputBase,
  Typography
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { serviceStyles } from '../../style';
import { getStar } from '../../utils/utils';
import { SeeMoreText } from '../SeeMoreText';
import ImageList from '../Modal/ImageList';
import { getDetail, reviewService } from '../../redux/callApi/serviceCall';
import { useDispatch, useSelector } from 'react-redux';
import EmojiPicker from '../Input/EmojiPicker';
import { AddAPhoto, Close, Send } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import MapCard from '../Map/MapCard';
import { checkImage } from '../../utils/uploadImage';
import Lightbox from 'react-image-lightbox';
import Loading from '../Loading';

function Image(props) {
  const { image, index, handleRemove } = props;

  const remove = () => {
    // console.log(index);
    handleRemove(index);
  };

  return (
    <div>
      <img
        src={URL.createObjectURL(image)}
        alt="Error"
        width={80}
        height={80}
      />
      <IconButton size="small" onClick={remove}>
        <Close />
      </IconButton>
    </div>
  );
}

export function ReviewArea(props) {
  const { id } = props;
  const [text, setText] = useState('');
  const { auth } = useSelector(state => state);
  const [rate, setRate] = useState(0);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const classes = serviceStyles();
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    if (rate && rate !== 0) {
      setError('');
      dispatch(reviewService(id, auth, rate, text, images));
      setText('');
      setRate(0);
      setImages([]);
    } else setError('Cần thêm đánh giá!');
  };

  const addOneImage = img => {
    setImages(state => [...state, img]);
  };

  const addImage = e => {
    if (images.length + e.target.files.length > 5) {
      setError('Không được quá 5 ảnh!');
      return;
    }
    const files = e.target.files;
    for (var img of files) {
      let check = checkImage(img);
      if (check === '') addOneImage(img);
    }
  };

  const handleRemove = index => {
    setImages(state => [...state.slice(0, index), ...state.slice(index + 1)]);
  };

  return (
    <div className={classes.formContainer}>
      <form onSubmit={handleSubmit} className={classes.formReview}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 10
          }}
        >
          <Rating
            size="small"
            name="rate"
            value={rate}
            onChange={e => setRate(parseInt(e.target.value))}
            disabled={!auth.token}
          />
        </div>
        <div style={{ display: 'flex', marginInline: 10, overflowY: 'auto' }}>
          {images.map((item, index) => (
            <Image
              key={index}
              image={item}
              index={index}
              handleRemove={handleRemove}
            />
          ))}
        </div>
        <span style={{ color: 'red', fontSize: 12 }}>{error}</span>
        <div className={classes.contentWrap}>
          <div style={{ display: 'flex' }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="input-image"
              name="images"
              multiple
              type="file"
              onChange={addImage}
            />
            <label htmlFor="input-image">
              <IconButton variant="raised" component="span" title="Thêm ảnh">
                <AddAPhoto style={{ color: 'inherit' }} />
              </IconButton>
            </label>
            <EmojiPicker content={text} setContent={setText} />
          </div>
          <InputBase
            name="content"
            placeholder="Viết review..."
            value={text}
            multiline
            disabled={!auth.token}
            onChange={e => setText(e.target.value)}
            className={classes.contentInput}
          />
          <IconButton disabled={!text || text.trim() === ''} type="submit">
            <Send />
          </IconButton>
        </div>
      </form>
    </div>
  );
}

function DetailService(props) {
  const { attribute, type } = props;
  return (
    <>
      {attribute && (
        <>
          <Typography>
            <b>Phù hợp: </b>
            {attribute.conform}
          </Typography>
          <Typography>
            <b>Đặc trưng: </b>
            {attribute.featured}
          </Typography>
          <Typography>
            <b>
              {type === 'nhahang'
                ? 'Menu:'
                : type === 'khachsan'
                ? 'Phòng:'
                : type === 'dichuyen'
                ? 'Các loại phương tiện:'
                : 'Các loại dịch vụ'}
            </b>
          </Typography>
          <ul style={{ marginLeft: 20, listStyleType: 'disc' }}>
            {attribute.menu.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <Typography>
            <b>Tiện nghi: </b>
            {attribute.convenient}
          </Typography>
          <Typography>
            <b>Cách đặt trước: </b>
            {attribute.book}
          </Typography>

          <Typography>
            <b>Các lưu ý: </b>
            {attribute.note}
          </Typography>
          <Typography>
            <b>Thông tin thêm:</b>
          </Typography>
          <div style={{ marginLeft: 10 }}>
            {attribute.more_info.map(item => (
              <Chip key={item} label={item} color="primary" />
            ))}
          </div>
          {attribute?.time !== '' && (
            <Typography>
              <b>Thời gian mở cửa: </b>
              {attribute.time}
            </Typography>
          )}
          {attribute?.space !== '' && (
            <Typography>
              <b>Không gian: </b>
              {attribute.space}
            </Typography>
          )}
          {attribute?.park !== '' && (
            <Typography>
              <b>Chỗ đỗ xe: </b>
              {attribute.park}
            </Typography>
          )}
          {attribute?.shuttle !== '' && (
            <Typography>
              <b>Đưa đón: </b>
              {attribute.shuttle}
            </Typography>
          )}
          {attribute.pickup.length > 0 && (
            <Typography>
              <b>Điểm đón khách: </b>
              {attribute.pickup.join(', ')}
            </Typography>
          )}
          {attribute.stop.length > 0 && (
            <Typography>
              <b>Điểm trả khách: </b>
              {attribute.stop.join(', ')}
            </Typography>
          )}
        </>
      )}
    </>
  );
}

function ReviewService(props) {
  const { review } = props;
  const [open, setOpen] = useState(false);
  const [pictureIndex, setPictureIndex] = useState(0);

  const imageList = review?.images || null;

  const classes = serviceStyles();

  const handleClick = index => {
    setOpen(true);
    setPictureIndex(index);
  };

  const closePress = () => {
    setOpen(false);
  };

  const next = () => {
    setPictureIndex((pictureIndex + 1) % imageList.length);
  };

  const prev = () => {
    setPictureIndex((pictureIndex + imageList.length - 1) % imageList.length);
  };

  return (
    <div className={classes.reviewItemContainer}>
      <Avatar
        alt="avatar"
        src={review.userId.avatar}
        className={classes.avatar}
      />
      <div className={classes.reviewContentContainer}>
        <Typography
          className={classes.reviewerName}
          component={Link}
          to={`/u/${review.userId._id}`}
        >
          {review.userId.fullname}
        </Typography>
        <div className={classes.rate}>
          <Rating name="read-only" value={review.rate} readOnly size="small" />
        </div>
        {review.content !== '' && (
          <Typography className={classes.reviewContent}>
            {review.content}
          </Typography>
        )}
        {imageList && (
          <>
            <div>
              {imageList.slice(0, 2).map((item, index) => (
                <img
                  src={item}
                  key={index}
                  alt="Loading..."
                  width={100}
                  height={100}
                  onClick={() => handleClick(index)}
                  className={classes.imageReview}
                />
              ))}
            </div>
            {open && (
              <Lightbox
                mainSrc={imageList[pictureIndex]}
                nextSrc={imageList[(pictureIndex + 1) % imageList.length]}
                prevSrc={
                  imageList[
                    (pictureIndex + imageList.length - 1) % imageList.length
                  ]
                }
                mainSrcThumbnail={imageList[pictureIndex]}
                imageCaption={imageList[pictureIndex]}
                nextSrcThumbnail={
                  imageList[(pictureIndex + 1) % imageList.length]
                }
                prevSrcThumbnail={
                  imageList[
                    (pictureIndex + imageList.length - 1) % imageList.length
                  ]
                }
                onCloseRequest={closePress}
                onMoveNextRequest={next}
                onMovePrevRequest={prev}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ServiceDetail(props) {
  const { service, state, getServiceDetail, handleClose } = props;
  const classes = serviceStyles();

  return (
    <div className={classes.reviewContainer}>
      <div className={classes.closeButton}>
        <IconButton onClick={handleClose(false)} size="small">
          <Close />
        </IconButton>
      </div>
      <div className={classes.centerMarginTop}>
        <Typography variant="h4">{service.name}</Typography>
      </div>
      <div className={classes.contentContainerWrap}>
        <div className={classes.detailDes}>
          <Typography>{service.description}</Typography>
          {service.andress !== '' && (
            <Typography>
              <b>Địa chỉ: </b>
              {service.andress}
            </Typography>
          )}
          {service.discount.length > 0 && (
            <>
              <b>Ưu đãi:</b>
              <ul style={{ marginLeft: 20, listStyleType: 'disc' }}>
                {service.discount.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </>
          )}
          <DetailService attribute={service.attribute} type={service.type} />
          {service.position && (
            <div style={{ margin: 20 }}>
              <MapCard
                position={service.position}
                zoom={12}
                name={service.name}
                height={300}
              />
            </div>
          )}
        </div>

        <div className={classes.center}>
          {service.rate && (
            <>
              <Typography variant="body1">
                Tổng số review: {service.rate?.length}
              </Typography>
              <Rating
                name="read-only"
                value={getStar(service.star)}
                readOnly
                size="medium"
              />
            </>
          )}
        </div>

        <div className={classes.contentReview}>
          {service.rate &&
            (service.rate.length === 0 ? (
              <div className={classes.centerMarginTop}>
                <Typography>
                  <i>Chưa có review cho dịch vụ này</i>
                </Typography>
              </div>
            ) : (
              <div>
                {service.rate.map((item, index) => (
                  <ReviewService key={index} review={item} />
                ))}
              </div>
            ))}
          {state.loading && (
            <div className={classes.centerMarginTop}>
              <Loading />
            </div>
          )}
          {state.error && (
            <div className={classes.centerMarginTop}>
              <Button onClick={getServiceDetail(service)}>Thử lại</Button>
            </div>
          )}
        </div>
      </div>

      <div className={classes.reviewArea}>
        <hr
          style={{
            color: '#aaa',
            width: '60%'
          }}
        />
        <ReviewArea id={service._id} />
      </div>
    </div>
  );
}

export default function ServiceItem(props) {
  const { service } = props;
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    loading: false,
    error: false
  });

  const dispatch = useDispatch();

  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    )
      return;
    setOpen(open);
  };

  useEffect(() => {
    if (open && !service.rate) {
      getServiceDetail(service, dispatch);
    }
  }, [open, service, dispatch]);

  const getServiceDetail = (service, dispatch) => {
    if (!service.rate) {
      setState({
        loading: true,
        error: false
      });
      dispatch(
        getDetail(
          service._id,
          () => {
            setState({
              loading: false,
              error: false
            });
          },
          () => {
            setState({
              loading: false,
              error: true
            });
          }
        )
      );
    }
  };

  const classes = serviceStyles();

  return (
    <>
      <Card className={classes.container} id={service._id}>
        <CardMedia>
          <ImageList
            imageList={service.images}
            show2Image={false}
            defaultHeight={500}
            isPost={false}
          />
        </CardMedia>
        <div>
          <CardContent>
            <Typography
              variant="h5"
              className={classes.serviceName}
              onClick={toggleDrawer(true)}
            >
              {service.name}
            </Typography>
            <Typography>{service.andress}</Typography>
            <Typography>{service.cost}</Typography>
            <SeeMoreText
              maxText={100}
              text={service.description}
              variant={'body1'}
            />
            <div className={classes.rate}>
              <Rating
                name="read-only"
                value={getStar(service.star)}
                readOnly
                size="medium"
              />
            </div>
            <ul className={classes.discount}>
              {service.discount.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
          <div>
            <Button className={classes.seeReview} onClick={toggleDrawer(true)}>
              Xem chi tiết
            </Button>
          </div>
        </div>
      </Card>
      <Drawer
        anchor={'right'}
        open={open}
        onClose={toggleDrawer(false)}
        style={{ zIndex: 10 }}
      >
        <ServiceDetail
          service={service}
          state={state}
          getServiceDetail={getServiceDetail}
          handleClose={toggleDrawer}
        />
      </Drawer>
    </>
  );
}
