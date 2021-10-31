import React from "react";
import HomePage from "./page/home/home";
import TourPage from './page/home/tour';
import './App.css';
// import Login from "./page/login/login";
// import Register from "./page/login/register";
import Profile_Posts from "./page/profile/posts";
import Message from "./page/message/message";
import Change_info from "./page/profile/change_info";
function App() {
  return (
    <div style={{ backgroundColor: "#EEF6F3" }}>
      <Change_info />
    </div>

  );
}

export default App;
