import { CircularProgress, IconButton, Paper, Typography, Button, Box } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NotFound } from '../../../../page/404';
import customAxios from '../../../../utils/fetchData';
import Feed from '../../../Feed';
import Post from '../../../Post';
import { tableStyles } from "../../../../style"

function formatTime(time) {
  var tmp = new Date(time);
  var dd = String(tmp.getDate()).padStart(2, '0');
  var mm = String(tmp.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = tmp.getFullYear();

  time = dd + '/' + mm + '/' + yyyy;
  return time;
}

function AdminPostReportDetail() {

  const classes = tableStyles();

  const { subpage } = useParams();

  const [report, setReport] = useState(null);
  const [post, setPost] = useState(null);
  const [state, setState] = useState({
    notFound: false,
    loading: false,
    error: false
  });

  const { token } = useSelector(state => state.auth);

  const getReport = async (id, _token) => {
    setState({
      notFound: false,
      loading: true,
      error: false
    });
    await customAxios(_token)
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

  const getPost = async id => {
    setState({
      notFound: false,
      loading: true,
      error: false
    });
    await customAxios(token)
      .get(`/post/${id}`)
      .then(res => {
        setPost(res.data.post);
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
  }

  const deletePost = async id => {
    setState({
      notFound: false,
      loading: true,
      error: false
    });
    await customAxios(token)
      .delete(`/post/${id}`)
      .then(res => {
        setPost(res.data.post);
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
  }

  useEffect(() => {
<<<<<<< HEAD
    getReport(subpage);
    if (report) {
      getPost(report.postId);
    }
  }, [subpage]);
=======
    getReport(subpage, token);
  }, [subpage, token]);
>>>>>>> f6600eb73e1ea629e63e4d3976ab459e802d880c

  useEffect(() => {
    if (report) {
      getPost(report.postId);
    }
  }, []);

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
        report &&
        <div className={classes.containerReport}>
          <div className={classes.cardPost}>
            <Typography variant='h4' gutterBottom>
              Chi tiết
            </Typography>
            {/* <div>
              <Feed>
                <Post
                  post={post}
                  key={post._id}
                />
              </Feed>
            </div> */}
          </div>
          <div className={classes.cardReport}>
            <div>
              <Typography variant='h4' gutterBottom>
                Thông tin report
              </Typography>
            </div>

            <div className={classes.textReport}>
              Người báo cáo: {report.userId.fullname}
            </div>

            <div className={classes.textReport}>
              Thời gian báo cáo: {formatTime(report.createdAt)}
            </div>

            <div className={classes.textReport}>
              Lý do báo cáo: {report.type}
            </div>

            <div className={classes.textReport}>
              Nội dung báo cáo: {report.content}
            </div>

            <div className={classes.btnReport}>
              <Button
                variant="contained"
                className={classes.addBtn}
                component={Link}
                to={`/admin/postReport`}
              >
                Xóa bài viết
              </Button>
            </div>
          </div>
        </div>
      )}
    </Paper>
  );
}

export default AdminPostReportDetail;
