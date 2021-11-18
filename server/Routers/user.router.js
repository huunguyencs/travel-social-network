const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/user.controller')
const auth = require('../Middlewares/auth');
// đã test
router.post("/register", UserController.register);
router.post("/login",  UserController.login);

router.post("/logout",UserController.logout);

// router.post('/refresh_token', UserController.getAccessToken);
router.patch("/change_avatar", auth, UserController.changeAvatar);
router.patch("/change_background", auth, UserController.changeBackground);
router.patch("/change_profile",auth, UserController.editProfile);

router.get('/search', UserController.searchUsers);
// lấy thông tin một user
router.get("/:id",auth, UserController.getUser);

router.put('/:id/follow',auth,  UserController.follow); //id là id của người mà mình follow
router.put('/:id/unfollow',auth, UserController.unfollow); // id là id của người mình unfollow

module.exports = router;