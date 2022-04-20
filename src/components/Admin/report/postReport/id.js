import { CircularProgress, IconButton, Paper } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NotFound } from '../../../../page/404';
import customAxios from '../../../../utils/fetchData';

function AdminPostReportDetail() {
  const { subpage } = useParams();

  const [report, setReport] = useState(null);
  const [state, setState] = useState({
    notFound: false,
    loading: false,
    error: false
  });
  const { token } = useSelector(state => state.auth);

  const getReport = async id => {
    setState({
      notFound: false,
      loading: true,
      error: false
    });
    await customAxios(token)
      .get(`/report/${id}`)
      .then(res => {
        setReport(res.data.report);
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
    getReport(subpage);
  }, [subpage]);

  useEffect(() => {
    document.title = 'Admin - Bài viết được báo cáo';
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
            to={`/admin/postReport`}
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
          <CircularProgress color="inherit" />
        </div>
      ) : state.error ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}
        >
          Có lỗi xảy ra
        </div>
      ) : (
        report && <div>{report._id}</div>
      )}
    </Paper>
  );
}

export default AdminPostReportDetail;
