import axios from 'axios';
// import {refreshToken } from "../redux/callApi/authCall";
// import { useDispatch, useSelector } from "react-redux";

const customAxios = (token = '') => {
  const instance = axios.create({
<<<<<<< HEAD
    baseURL: 'http://localhost:5000',
    // baseURL: 'http://14.169.217.11:5000',
    // baseURL: 'https://api-triple-h.herokuapp.com/',
=======
    // baseURL: 'http://localhost:5000',
    baseURL: process.env.REACT_APP_HOST_API,
>>>>>>> a915721d8edf30278d0553b852d0106b75fb444e
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    timeout: 50 * 1000
  });
  //sau khi response từ server
  // instance.interceptors.response.use( async (response) => {
  //     console.log("token",token)
  //     if(response.config.url.indexOf('/login')>=0
  //     || response.config.url.indexOf('/refresh_token')>=0){
  //         //những route không cần token
  //         return response
  //     }
  //     if(response.data.message === "Access Token Expired"){
  //        const token_new = refreshToken()
  //        console.log("new_token",token_new)
  //        if(token_new){
  //             response.config.headers["Authorization"] = "Bearer " + token_new
  //             return instance(response.config)
  //        }
  //     }
  //     return response;
  // }, (error) => {

  // });
  return instance;
};
export default customAxios;
