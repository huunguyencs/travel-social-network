import React, { useEffect } from "react";
import { Route } from "react-router-dom";

import Header from "./components/Header";
import PageRender from "./router/PageRender";
// import color from "./style/color";
import Scroll, { WithRouterScroll } from './components/Scroll';
import CustomRouter from "./router/CustomRouter";
import HomePage from './page/home';
import './App.css'
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFriendRecommend, refreshToken } from "./redux/callApi/authCall";
import { io } from 'socket.io-client';
import SocketClient from "./SocketClient";
import * as SOCKET_TYPES from './redux/constants/index';
import AlertBar from "./components/Alert";

import { getNotifies } from './redux/callApi/notifyCall';

function App() {
  const location = useLocation();
  const history = useHistory();

  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();


  const displayHeader = () => {
    if (location.pathname === "/login" || location.pathname === "/register")
      return false;
    return true;
  }

  useEffect(() => {
    dispatch(refreshToken());
    const socket = io();
    dispatch({ type: SOCKET_TYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch, history])


  useEffect(() => {
    if (auth.token) {
      dispatch(getNotifies(auth.token))
    }
  }, [dispatch, auth.token])

  useEffect(() => {
    if (auth.token) {
      dispatch(getFriendRecommend(auth.token, 5))
    }
  }, [auth.token, dispatch])
  return (
    <div>
      <WithRouterScroll />
      <Scroll showBelow={500} />
      <AlertBar />
      {displayHeader() && <Header />}
      {auth.token && <SocketClient />}
      <Route path="/" component={HomePage} exact />
      <CustomRouter path='/:page' component={PageRender} exact />
      <CustomRouter path='/:page/:id' component={PageRender} exact />
      <CustomRouter path='/:page/:id/:subpage' component={PageRender} exact />
    </div>
  );
}

export default App;
