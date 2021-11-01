import React from "react";
<<<<<<< HEAD
import HomePage from "./page/HomePage";
import Login from "./page/login/login";
import  Register from "./page/login/register";

import './App.css';
=======
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
>>>>>>> 121ec0bc9cbe62c23b521b7506ca5b99e8a6a1d8

function App() {
  const location = useLocation();

  const displayHeader = () => {
    return location.pathname !== '/login' && location.pathname !== "/register";
  }

  return (
    <div style={{ backgroundColor: color.background }}>
      <WithRouterScroll />
      <Scroll showBelow={500} />
      {displayHeader() && <Header />}
      <Route path="/" component={HomePage} exact />
      <CustomRouter path='/:page' component={PageRender} exact />
      <CustomRouter path='/:page/:subparam' component={PageRender} exact />
    </div>

  );
}

export default App;
