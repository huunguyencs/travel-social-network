import {
  Button,
  Card,
  CardContent,
  CardMedia,
  ClickAwayListener,
  // Collapse,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  // TextField,
  Typography
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as tourAction from '../../redux/actions/createTourAction';
import { tourdetailStyles } from '../../style';
import { ReviewArea } from '../Service/ServiceDetail';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';

export default function ServiceCard(props) {
  const { service, index, isEdit, indexDate } = props;

  const classes = tourdetailStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

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
      tourAction.deleteService({
        indexEvent: index,
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
                service.service?.images
                  ? service.service.images[0]
                  : '/default1.jpg'
              }
              alt="Service"
              className={classes.img}
            />
          </CardMedia>
        </Grid>
        <Grid item md={7} sm={9} xs={12}>
          <CardContent style={{ padding: 0 }}>
            <div className={classes.locationContentContainer}>
              <div style={{ margin: 16 }}>
                <div>
                  <Typography className={classes.locationName}>
                    {service.service?.name}
                  </Typography>
                </div>
                <div>
                  <Typography
                    style={{ fontSize: 16, fontWeight: 400 }}
                    component={Link}
                    to={'/province/' + service.service?.province.name}
                  >
                    {service.service?.province.fullname}
                  </Typography>
                </div>
                {!isEdit && service?.service && (
                  <ReviewArea id={service.service._id} />
                )}
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
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}
