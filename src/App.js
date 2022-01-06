import React, { useEffect } from "react";
import { Route } from "react-router-dom";

import Header from "./components/header/Header";
import PageRender from "./router/PageRender";
import color from "./style/color";
import Scroll from './components/scroll';
import CustomRouter from "./router/CustomRouter";
import HomePage from './page/home';
import './App.css'
import { WithRouterScroll } from './components/scroll';
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./redux/callApi/authCall";
import { io } from 'socket.io-client';
import SocketClient from "./SocketClient";
import * as SOCKET_TYPES from './redux/constants/index';

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
  useEffect(()=>{
    dispatch(refreshToken(() => {
      if (location.pathname !== "/login" && location.pathname !== "/register")
        history.push("/login");
    }));
    const socket = io();
    dispatch({type: SOCKET_TYPES.SOCKET, payload: socket});
    return () => socket.close();
  },[dispatch])

  useEffect(() => {
    if (!auth.token) {
      dispatch(refreshToken(() => {
        if (location.pathname !== "/login" && location.pathname !== "/register")
          history.push("/login");
      }));

      // const socket = io();
      // dispatch({type: GLOBLE_TYPES.SOCKET, payload: socket});
      // return () => socket.close();
    }
  }, [dispatch, auth.token, history, location])

  return (
    <div style={{ backgroundColor: color.background, backgroundSize: "100%" }}>
      <WithRouterScroll />
      <Scroll showBelow={500} />
      {displayHeader() && <Header />}
      {auth.token && <SocketClient/>}
      <Route path="/" component={HomePage} exact />
      <CustomRouter path='/:page' component={PageRender} exact />
      <CustomRouter path='/:page/:id' component={PageRender} exact />
      <CustomRouter path='/:page/:id/:subpage' component={PageRender} exact />
    </div>

  );
}

export default App;
