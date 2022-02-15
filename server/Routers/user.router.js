const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/user.controller')
const auth = require('../Middlewares/auth');
// đã test
router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.post("/logout", UserController.logout);

router.post('/refresh_token', UserController.refreshToken);
router.patch("/change_avatar", auth, UserController.changeAvatar);
router.patch("/change_background", auth, UserController.changeBackground);
router.patch("/change_info", auth, UserController.editProfile);
router.patch("/change_password", auth, UserController.changePassword)

router.get("/get_all", auth, UserController.getAll)

router.get('/get_friend_recommend', auth, UserController.getFriendRecommend)
router.get('/search', UserController.searchUsers);
router.get('/get_tour_saved', auth, UserController.getTourSaved)

// lấy thông tin một user
router.get("/:id", UserController.getUser);

router.put('/:id/follow', auth, UserController.follow); //id là id của người mà mình follow
router.put('/:id/unfollow', auth, UserController.unfollow); // id là id của người mình unfollow

router.put('/save_tour', auth, UserController.saveTour);
router.put('/unsaved_tour', auth, UserController.unsaveTour);




module.exports = router;