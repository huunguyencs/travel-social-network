import React from "react";
import { Route } from "react-router-dom";
import Header from "./components/header/Header";
import PageRender from "./router/PageRender";
import color from "./style/color";
import Scroll from './components/scroll';
import CustomRouter from "./router/CustomRouter";
import HomePage from './page/home';

function App() {
  return (
    <div style={{ backgroundColor: color.background }}>
      <Scroll showBelow={500} />
      <Header />
      <Route path="/" component={HomePage} exact />
      <CustomRouter path='/:page' component={PageRender} exact />
    </div>

  );
}

export default App;
