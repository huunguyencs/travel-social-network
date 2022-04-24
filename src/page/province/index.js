import { Button, Grid, Input, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

import ProvinceCard from '../../components/Card/ProvinceCard';
import LeftBar from '../../components/Leftbar';
import Loading from '../../components/Loading';
import SpeedDialButton from '../../components/SpeedDialBtn';
import { homeMenu } from '../../constant/menu';
import useStyles from '../../style';
import customAxios from '../../utils/fetchData';

export default function ProvincePage() {
  const [provincesCon, setProvincesCon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const classes = useStyles();
  const [provinces, setProvinces] = useState([]);

  const getProvince = async () => {
    setLoading(true);
    setError(false);
    await customAxios()
      .get(`/province/all`)
      .then(res => {
        setLoading(false);
        setProvincesCon(res.data.provinces);
        setProvinces(res.data.provinces);
      })
      .catch(err => {
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    getProvince();
  }, []);

  const handleChangeSearch = e => {
    let temp = e.target.value;
    setSearch(temp);
    if (e.target.value === '') {
      setProvinces(provincesCon);
      return;
    }
  };

  useEffect(() => {
    if (search !== '') {
      let pros = provincesCon.filter(item =>
        item.fullname.toLowerCase().match(search.toLowerCase())
      );
      setProvinces(pros);
    }
  }, [search, provincesCon]);

  useEffect(() => {
    document.title = 'Tỉnh thành | Triple H';
  }, []);

  return (
    <Grid container style={{ margin: 0, padding: 0 }}>
      <SpeedDialButton />
      <Grid item md={3} sm={2} xs={2} className={classes.leftbar}>
        <LeftBar menuList={homeMenu} />
      </Grid>
      <Grid item md={9} sm={10} xs={10} className={classes.content}>
        {loading ? (
          <div className={classes.center}>
            <Loading />
          </div>
        ) : error ? (
          <div className={classes.center}>
            <Button onClick={getProvince}>Thử lại</Button>
          </div>
        ) : (
          <Grid container style={{ marginTop: 100 }}>
            <Grid item md={12} sm={12} xs={12}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'right',
                  marginRight: 50,
                  marginBottom: 20
                }}
              >
                <Input
                  type="search"
                  name="search"
                  id="search-province"
                  value={search}
                  onChange={handleChangeSearch}
                  placeholder="Tìm kiếm ..."
                  startAdornment={
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  }
                />
              </div>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              {provinces.length === 0 && (
                <div className={classes.center}>Không tìm thấy tỉnh.</div>
              )}
            </Grid>
            {provinces.map(province => (
              <Grid item md={4} sm={6} xs={12} key={province._id}>
                <ProvinceCard province={province} />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
