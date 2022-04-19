import { Grid, CircularProgress, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import LeftBar from '../components/Leftbar';
import SpeedDialButton from '../components/SpeedDialBtn';
import { homeMenu } from '../constant/menu';
import customAxios from '../utils/fetchData';

export default function ActivatePage() {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');
  const [state, setState] = useState({
    error: false,
    loading: true
  });
  useEffect(() => {
    document.title = 'Kích hoạt';
  }, []);

  const activateToken = async token => {
    setState({
      error: false,
      loading: true
    });
    await customAxios()
      .post('/user/activate_email', {
        activation_token: token
      })
      .then(res => {
        setState({
          loading: false,
          error: false
        });
      })
      .catch(err => {
        setState({
          loading: false,
          error: true
        });
      });
  };

  useEffect(() => {
    if (token) {
      activateToken(token);
    } else {
      setState({
        error: true,
        loading: false
      });
    }
  }, [token]);
  return (
    <Grid container style={{ margin: 0, padding: 0 }}>
      <SpeedDialButton />
      <Grid item md={3} sm={2} xs={2}>
        <LeftBar menuList={homeMenu} />
      </Grid>
      <Grid item md={9} sm={10} xs={10} style={{ marginTop: 70 }}>
        {state.loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: 50
            }}
          >
            <CircularProgress color="inherit" />
          </div>
        ) : state.error ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: 50
            }}
          >
            <Button onClick={activateToken}>Thử lại</Button>
          </div>
        ) : (
          <div style={{ marginTop: 80, fontSize: 25 }}>
            <p>Tài khoản của bạn đã được kích hoạt.</p>
            <p>Hãy đăng nhập và cùng trải nghiệm Tripple H nào!</p>
            <Link to="/login" style={{ color: 'green' }}>
              Đăng nhập
            </Link>
          </div>
        )}
      </Grid>
    </Grid>
  );
}
