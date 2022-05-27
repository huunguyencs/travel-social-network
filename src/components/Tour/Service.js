import {
  Button,
  Card,
  CardMedia,
  ClickAwayListener,
  Collapse,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  TextField,
  Typography
} from '@material-ui/core';
import { Label, MoreVert } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { success } from '../../redux/actions/alertAction';
import * as tourAction from '../../redux/actions/createTourAction';
import { tourdetailStyles } from '../../style';
import { ReviewArea } from '../Service/ServiceDetail';

function DetailService(props) {
  const { service, isEdit, indexService, indexDate, joined } = props;

  const [cost, setCost] = useState(service.cost);
  const [description, setDescription] = useState(service.description);
  const [time, setTime] = useState(service.time);

  const dispatch = useDispatch();

  const handleUpdate = () => {
    // console.log(cost);
    dispatch(
      tourAction.updateService({
        cost: parseInt(cost),
        description: description,
        indexDate: indexDate,
        index: indexService,
        time: time
      })
    );
    dispatch(success({ message: 'Cập nhật thành công!' }));
  };

  const classes = tourdetailStyles();

  return (
    <div style={{ padding: 5 }}>
      {isEdit ? (
        <div>
          <InputBase
            placeholder="Mô tả"
            title="Thông tin"
            variant="outlined"
            name="description"
            id="description"
            rows={5}
            className={classes.descriptionInput}
            // className={classes.hashtag}
            multiline
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <TextField
            label="Chi phí (nghìn VND)"
            variant="outlined"
            name="cost"
            id="cost"
            className={classes.fullField}
            type={'number'}
            value={cost}
            onChange={e => setCost(e.target.value)}
          />
          <TextField
            id="time"
            label="Thời gian"
            type="time"
            defaultValue={service.time}
            onChange={e => setTime(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              step: 300 // 5 min
            }}
          />
          <div className={classes.btnWrap}>
            <Button
              onClick={handleUpdate}
              // variant="contained"
              className={classes.reviewBtn}
            >
              Cập nhật
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <Typography>
            <Label style={{ fontSize: 15 }} />
            <span style={{ fontWeight: 500 }}>Chi phí: </span>{' '}
            {new Intl.NumberFormat().format(cost * 1000)} VND
          </Typography>
          <Typography>
            <Label style={{ fontSize: 15 }} />{' '}
            <span style={{ fontWeight: 500 }}> Mô tả: </span> {description}
          </Typography>
        </div>
      )}
      {!isEdit && joined && service?.service && (
        <ReviewArea id={service.service._id} />
      )}
    </div>
  );
}

export default function ServiceCard(props) {
  const { service, index, isEdit, indexDate, joined } = props;

  const classes = tourdetailStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const handleShowDetail = () => {
    setShowDetail(state => !state);
  };

  const dispatch = useDispatch();

  const handleShowMenu = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleShowDelete = () => {
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const handleDelete = () => {
    dispatch(
      tourAction.deleteEvent({
        index: index,
        indexDate: indexDate
      })
    );
    handleCloseMenu();
    handleCloseDelete();
    // dispatch(tourAction.deleteService({ index: index }))
  };

  return (
    <Card className={classes.serviceContainer}>
      <Grid container>
        <Grid item md={5} sm={3} className={classes.imageLocation}>
          <CardMedia style={{ height: '100%' }}>
            <img
              src={
                service?.service?.images
                  ? service.service.images[0]
                  : '/default1.jpg'
              }
              alt="Service"
              className={classes.img}
            />
          </CardMedia>
        </Grid>
        <Grid item md={7} sm={9} xs={12}>
          <div className={classes.contentContainer}>
            <div className={classes.locationContentContainer}>
              <div>
                <div>
                  <Typography variant="h6" className={classes.locationName}>
                    {service.service?.name}
                  </Typography>
                </div>
                <div>
                  <Typography>
                    Chi phí:{' '}
                    {new Intl.NumberFormat().format(service.cost * 1000)} VND
                  </Typography>
                </div>
                <Button
                  onClick={handleShowDetail}
                  className={classes.reviewBtn}
                >
                  Chi tiết
                </Button>
              </div>
              <div>
                {isEdit && (
                  <div style={{ display: 'flex', justifyContent: 'right' }}>
                    <IconButton
                      size="small"
                      onClick={handleShowMenu}
                      controls={anchorEl ? 'service-item-menu' : undefined}
                    >
                      <MoreVert />
                    </IconButton>
                    <Popper
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      onClose={handleCloseMenu}
                      disablePortal
                    >
                      <ClickAwayListener onClickAway={handleCloseMenu}>
                        <Paper>
                          <MenuList>
                            <MenuItem onClick={handleShowDelete}>Xóa</MenuItem>
                            <Dialog
                              open={showDelete}
                              onClose={handleCloseDelete}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogTitle id="alert-dialog-title">
                                {'Bạn có chắc chắn muốn xóa?'}
                              </DialogTitle>
                              <DialogActions>
                                <Button onClick={handleCloseDelete}>Hủy</Button>
                                <Button
                                  onClick={handleDelete}
                                  className={classes.delete}
                                >
                                  Xóa
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </MenuList>
                        </Paper>
                      </ClickAwayListener>
                    </Popper>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <Collapse in={showDetail} style={{ width: '100%' }}>
            <DetailService
              service={service}
              isEdit={isEdit}
              indexService={index}
              indexDate={indexDate}
              joined={joined}
            />
          </Collapse>
        </Grid>
      </Grid>
    </Card>
  );
}
