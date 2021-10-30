import React from "react";
// import HomePage from "./page/home/home";
// import TourPage from './page/home/tour';
// import Province from "./page/province";
// import './App.css';
// import Login from "./page/login/login";
// import Register from "./page/login/register";
import NotFound from "./page/404";
import color from "./style/color";

function App() {
  return (
    <div style={{ backgroundColor: color.background }}>
      <NotFound />
    </div>

  );
}

export default App;
