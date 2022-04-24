import { IconButton, Paper } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import FormEventAdmin from '../../Event/Form';
import { NotFound } from '../../../../page/404';
import customAxios from '../../../../utils/fetchData';
import Loading from '../../../Loading';

export default function AdminEventContributeDetail() {
  const { subpage } = useParams();

  const [event, setEvent] = useState(null);
  const [state, setState] = useState({
    notFound: false,
    loading: false,
    error: false
  });

  const getEvent = async id => {
    setState({
      notFound: false,
      loading: true,
      error: false
    });
    await customAxios()
      .get(`/event/${id}`)
      .then(res => {
        setEvent(res.data.event);
        setState({
          notFound: false,
          loading: false,
          error: false
        });
      })
      .catch(err => {
        setState({
          notFound: false,
          loading: false,
          error: true
        });
      });
  };

  useEffect(() => {
    getEvent(subpage);
    console.log(subpage);
  }, [subpage]);

  useEffect(() => {
    document.title = 'Admin - Sự kiện được đóng góp';
  }, []);

  return (
    <Paper
      style={{
        marginTop: 120,
        marginInline: 50,
        marginBottom: 30,
        padding: 30
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <IconButton
            component={Link}
            to={`/admin/eventContribute`}
            title="Quay lại"
          >
            <ArrowBack />
          </IconButton>
        </div>
      </div>

      {state.notFound ? (
        <NotFound />
      ) : state.loading ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}
        >
          <Loading />
        </div>
      ) : state.error ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}
        >
          Có lỗi xảy ra
        </div>
      ) : (
        event && <FormEventAdmin event={event} setEvent={setEvent} mode="add" />
      )}
    </Paper>
  );
}
