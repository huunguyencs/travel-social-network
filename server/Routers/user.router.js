const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/user.controller')

// đã test
router.post("/register", UserController.register);
router.post("/login",  UserController.login);


// chưa test

router.post("/logout",UserController.logout);

router.patch("/change_avatar", UserController.changeAvatar);
router.patch("/change_background", UserController.changeBackground);
router.patch("/change_profile", UserController.editProfile);

router.get('/search', UserController.searchUsers);
// lấy thông tin một user
router.get("/:id", UserController.getUser);

router.put('/:id/follow',  UserController.follow); //id là id của người mà mình follow
router.put('/:id/unfollow', UserController.unfollow); // id là id của người mình unfollow

module.exports = router;