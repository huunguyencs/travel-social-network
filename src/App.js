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
    if (!auth.token) {
      dispatch(refreshToken(() => {
        history.push("/login");
      }));
    }
  }, [dispatch, auth.token, history])

  return (
    <div style={{ backgroundColor: color.background, backgroundSize: "100%" }}>
      <WithRouterScroll />
      <Scroll showBelow={500} />
      {displayHeader() && <Header />}
      <Route path="/" component={HomePage} exact />
      <CustomRouter path='/:page' component={PageRender} exact />
      <CustomRouter path='/:page/:id' component={PageRender} exact />
      <CustomRouter path='/:page/:id/:subpage' component={PageRender} exact />
    </div>

  );
}

export default App;
