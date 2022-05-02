import React, { useEffect } from 'react';
import { Card, List, Typography } from '@material-ui/core';
import { friendCardStyles } from '../../style';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTours } from '../../redux/callApi/tourCall';
import { useDispatch } from 'react-redux';

export default function RecommendCard(props) {
  const { tour } = useSelector(state => state);

  const history = useHistory();
  const dispatch = useDispatch();
  const classes = friendCardStyles();
  const { title } = props;

  useEffect(() => {
    dispatch(getTours());
  }, [dispatch]);

  return (
    <Card className={classes.friend}>
      <div className={classes.friendHeader}>
        <Typography style={{ fontSize: 18 }} className={classes.text}>
          {title}
        </Typography>
      </div>
      <div>
        <List className={classes.list}>
          {tour?.tours?.length > 0 ? (
            tour.tours.slice(0, 4).map(
              item =>
                !item.shareId && (
                  <div
                    key={item._id}
                    className={classes.itemWrapper}
                    onClick={() => history.push(`/tour/${item._id}`)}
                  >
                    <div className={classes.itemImage}>
                      <img
                        className={classes.image}
                        src={item.image}
                        alt="loading"
                      />
                      <Typography variant="h6" className={classes.itemText}>
                        {item.name}
                      </Typography>
                    </div>
                  </div>
                )
            )
          ) : (
            <div>Không có gợi ý hành trình</div>
          )}
        </List>
      </div>
    </Card>
  );
}
