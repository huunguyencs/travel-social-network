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
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./page/login";


function App() {
  const location = useLocation();

  const { auth } = useSelector(state => state);

  const displayHeader = () => {
    if (!auth.token) return false;
    return location.pathname !== '/login' && location.pathname !== "/register";
  }

  // useEffect(() => {
  //   if(authReducer.)
  // })

  return (
    <div style={{ backgroundColor: color.background }}>
      <WithRouterScroll />
      <Scroll showBelow={500} />
      {displayHeader() && <Header />}
      <Route path="/" component={auth.token ? HomePage : Login} exact />
      <CustomRouter path='/:page' component={PageRender} exact />
      <CustomRouter path='/:page/:id' component={PageRender} exact />
      <CustomRouter path='/:page/:id/:subpage' component={PageRender} exact />
    </div>

  );
}

export default App;
