import { Button, CircularProgress, IconButton, Paper } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { NotFound } from '../../../../page/404'
import customAxios from "../../../../utils/fetchData";
import FormLocationAdmin from "../../Location/Form";


function AdminLocationContributeDetail() {

  const { subpage } = useParams();

  const [location, setLocation] = useState(null);
  const [state, setState] = useState({
    notFound: false,
    loading: false,
    error: false,
  });



  const getLocation = async (id) => {
    setState({
      notFound: false,
      loading: true,
      error: false
    })
    await customAxios().get(`/locationContribute/${id}`).then(res => {
      setLocation(res.data.location);
      setState({
        notFound: false,
        loading: false,
        error: false
      })
    }).catch(err => {
      setState({
        notFound: false,
        loading: false,
        error: true
      })
    })
  }

  useEffect(() => {
    console.log(subpage);
    getLocation(subpage);
  }, [subpage])

  useEffect(() => {
    document.title = 'Admin - Địa điểm được đóng góp'
  }, [])

  return (
    <Paper style={{ marginTop: 120, marginInline: 50, marginBottom: 30, padding: 30 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <IconButton component={Link} to={`/admin/locationContribute`} title="Quay lại">
            <ArrowBack />
          </IconButton>
        </div>
      </div>
      {
        state.notFound ?
          <NotFound /> :
          state.loading ?
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}>
              <CircularProgress color='inherit' />
            </div> :
            state.error ?
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}>Có lỗi xảy ra</div> :
              location && <FormLocationAdmin location={location} setLocation={setLocation} mode='add' />
      }
    </Paper>
  );
}

export default AdminLocationContributeDetail;
