import { Button, Container, Grid, Typography } from '@material-ui/core';
import { AccessibilityNew } from '@material-ui/icons';
import GoogleMapReact from 'google-map-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import HelpCard from '../../components/Help/HelpCard';
import Loading from '../../components/Loading';
import ImageLightBox from '../../components/Modal/ImageLightBox';
import KEY from '../../key/googlemap';
import customAxios from '../../utils/fetchData';
import { NotFound } from '../404';

export default function HelpDetailPage() {
  const { id } = useParams();

  const { token } = useSelector(state => state.auth);

  const [help, setHelp] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    customAxios(token)
      .get(`/help/${id}`)
      .then(res => {
        setHelp(res.data.help);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        if (err?.response?.status === 404) return setNotFound(true);
        return setError(true);
      });
  }, [id, token]);

  if (loading)
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: 150 }}
      >
        <Loading />
      </div>
    );
  if (notFound) return <NotFound />;
  if (error)
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: 150 }}
      >
        <Typography>Có lỗi xảy ra</Typography>
      </div>
    );

  return (
    <Container style={{ marginTop: 120 }}>
      <Button
        component={Link}
        to="/help"
        variant="contained"
        style={{ marginBlock: 30 }}
      >
        Yêu cầu trợ giúp gần bạn
      </Button>
      {help && (
        <Grid container spacing={5}>
          <Grid item lg={4} md={4} sm={12}>
            <HelpCard help={help} detail />
          </Grid>
          <Grid item lg={8} md={8} sm={12}>
            <div style={{ height: 500 }}>
              {help?.position?.length ? (
                <GoogleMapReact
                  bootstrapURLKeys={{ key: KEY }}
                  defaultCenter={{
                    lat: help.position[1],
                    lng: help.position[0]
                  }}
                  defaultZoom={15}
                >
                  <AccessibilityNew
                    style={{ color: 'red', fontSize: 32 }}
                    lng={help.position[0]}
                    lat={help.position[1]}
                  />
                </GoogleMapReact>
              ) : (
                <div>
                  <Typography>Không có vị trí của người yêu cầu</Typography>
                </div>
              )}
            </div>
          </Grid>

          {help.images && (
            <Grid item lg={12} md={12} sm={12}>
              <div style={{ display: 'flex' }}>
                {help.images.map(item => (
                  <ImageLightBox
                    src={item}
                    key={item}
                    style={{
                      margin: 10,
                      width: 250,
                      height: 200,
                      cursor: 'pointer'
                    }}
                    alt="Lỗi"
                  />
                ))}
              </div>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
}
