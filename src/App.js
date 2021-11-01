import React from "react";
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
