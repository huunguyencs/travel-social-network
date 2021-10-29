import React from "react";
// import HomePage from "./page/home/home";
import TourPage from './page/home/tour';
import './App.css';
// import Login from "./page/login/login";
// import Register from "./page/login/register";
import color from "./style/color";

function App() {
  return (
    <div style={{ backgroundColor: color.background }}>
      <TourPage />
    </div>

  );
}

export default App;
