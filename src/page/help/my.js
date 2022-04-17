import { CircularProgress, Container, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import HelpCard from '../../components/Help/HelpCard';
import customAxios from '../../utils/fetchData';

export default function MyHelpPage() {
  const { token } = useSelector(state => state.auth);

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getList = token => {
    setLoading(true);
    customAxios(token)
      .get('/help/my')
      .then(res => {
        setList(res.data.helps);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const { search } = useLocation();
  const { id } = queryString.parse(search);

  useEffect(() => {
    if (!id) return;
    const violation = document.getElementById(id);
    if (!violation) return;
    window.scrollTo({
      top: violation.offsetTop,
      behavior: 'smooth',
    });
  }, [id]);

  useEffect(() => {
    getList(token);
  }, [token]);

  if (loading)
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: 150 }}
      >
        <CircularProgress />
      </div>
    );

  return (
    <Container style={{ marginTop: 150 }}>
      <Grid container spacing={5}>
        {list.map(item => (
          <Grid item md={4} sm={6} xs={12} key={item._id} id={item._id}>
            <HelpCard help={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
