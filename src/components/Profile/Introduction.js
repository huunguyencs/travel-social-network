import React, { useEffect, useState } from "react";
import { RssFeed, Update, VerifiedUser } from "@material-ui/icons";
import { Avatar, Button, Container, Typography, Modal, Backdrop, CircularProgress, Tooltip } from "@material-ui/core";

import { profileStyles } from "../../style";
import UserList from "../Modal/UserList";
import ImageModal from "../Modal/Image";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { follow, unfollow } from "../../redux/callApi/userCall";
import ChatIcon from "../Icons/Chat";
import { addUser, getConversations } from '../../redux/callApi/messageCall';

export default function Introduction(props){
    
}