import { CircularProgress, IconButton, Paper } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import FormLocationAdmin from "./Form";
import { NotFound } from '../../../page/404'
import customAxios from "../../../utils/fetchData";


function AdminLocationDetail() {

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
    await customAxios().get(`/location/${id}`).then(res => {
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
    getLocation(subpage);
  }, [subpage])

  const editLocation = (e) => {
    e.preventDefault();
  }


  return (
    <Paper style={{ marginTop: 120, marginInline: 50, marginBottom: 30, padding: 30 }}>
      <IconButton component={Link} to={`/admin/location`} title="Quay lại">
        <ArrowBack />
      </IconButton>
      {
        state.notFound ?
          <NotFound /> :
          state.loading ?
            <div>
              <CircularProgress />
            </div> :
            state.error ?
              <div></div> :
              location && <FormLocationAdmin location={location} setLocation={setLocation} mode='edit' handleSubmit={editLocation} />
      }
    </Paper>
  );
}

export default AdminLocationDetail;
