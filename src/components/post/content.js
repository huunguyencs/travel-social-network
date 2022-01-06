import { Avatar, Backdrop, Box, Button, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogTitle, IconButton, Menu, MenuItem, Modal, Typography } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost } from '../../redux/callApi/postCall';

import { postStyles } from '../../style';
import { timeAgo } from '../../utils/date';
import UpdatePostForm from '../forms/updatePost';
import UpdateReviewForm from '../forms/updateReview';
import ImageList from '../modal/ImageList';
import { SeeMoreText } from '../seeMoreText';

const MenuListProps = {
    elevation: 0,
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
}

function Header(props) {

    const { post, share } = props;

    const dispatch = useDispatch();

    const { auth } = useSelector(state => state);

    const [anchorEl, setAnchorEl] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleShowMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    const handleCloseEdit = () => {
        setShowEdit(false);
        handleCloseMenu();
    }

    const handleDeletePost = () => {
        dispatch(deletePost(post._id, auth.token, () => {
            setShowDelete(false);
            handleCloseMenu();
        }));

    }

    const classes = postStyles();

    return (
        <CardHeader
            avatar={
                <Avatar alt="avatar" src={post.userId.avatar} />
            }
            action={
                <>
                    {
                        auth.user._id === post.userId._id && !share && <>
                            <IconButton aria-label="settings" onClick={handleShowMenu}>
                                <MoreVert />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleCloseMenu}
                                disablePortal={true}
                                MenuListProps={MenuListProps}
                            >
                                <MenuItem onClick={() => setShowEdit(true)}>Chỉnh sửa bài viết</MenuItem>
                                <Modal
                                    aria-labelledby="transition-modal-edit"
                                    aria-describedby="transition-modal-edit-description"
                                    open={showEdit}
                                    className={classes.modal}
                                    onClose={handleCloseEdit}
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
                                    {post.isPostReview ?
                                        <UpdateReviewForm review={post} handleClose={handleCloseEdit} /> :
                                        <UpdatePostForm post={post} handleClose={handleCloseEdit} />
                                    }
                                </Modal>
                                <MenuItem onClick={() => setShowDelete(true)}>Xóa bài viết</MenuItem>
                                <Dialog
                                    open={showDelete}
                                    onClose={() => setShowDelete(false)}
                                    aria-labelledby="show-delete-dialog"
                                    aria-describedby="show-delete-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"Bạn có chắc chắn muốn xóa?"}</DialogTitle>
                                    <DialogActions>
                                        <Button onClick={() => setShowDelete(false)}>
                                            Hủy
                                        </Button>
                                        <Button onClick={handleDeletePost}>
                                            Xóa
                                        </Button>
                                    </DialogActions>
                                </Dialog>

                            </Menu>
                        </>
                    }
                </>
            }
            title={

                <Typography component={Link} to={`/profile/${post.userId._id}`} noWrap={false} className={classes.userName}>{post.userId.fullname}</Typography>
            }
            subheader={
                <Link to={`/post/${post._id}`} style={{ cursor: "pointer" }}>
                    {timeAgo(new Date(post.createdAt))}
                </Link>
            }
        />
    )
}

function ShareContent({ post }) {
    const classes = postStyles();
    return (
        <>
            <Header post={post} />
            <CardContent>
                <SeeMoreText
                    variant="body1"
                    maxText={100}
                    text={post.content}
                />
                <div className={classes.hashtagWrap}>
                    {post.hashtags.map((item, index) =>
                        <Typography className={classes.hashtag} key={index}>{item}</Typography>
                    )}
                </div>
                <Box>
                    <BaseContent post={post.shareId} share={true} />
                </Box>

            </CardContent>
        </>
    )
}

function BaseContent(props) {
    const { post, share } = props;
    const classes = postStyles();

    return (
        <>
            <Header post={post} share={share} />
            <CardContent>
                {post.isPostReview &&
                    <>
                        <div>
                            <Typography variant="body1" component={Link} to={`/location/${post.locationId.name}`}>{post.locationId.fullname}</Typography>
                        </div>
                        <Rating name="location-rating" value={post.rate} readOnly style={{ marginBottom: 10 }} />

                    </>
                }
                <SeeMoreText
                    variant="body1"
                    maxText={100}
                    text={post.content}
                />
                <div className={classes.hashtagWrap}>
                    {post.hashtags.map((item, index) =>
                        <Typography className={classes.hashtag} key={index}>{item}</Typography>
                    )}
                </div>
            </CardContent>
            {
                post.images.length > 0 &&
                <CardMedia>
                    <ImageList imgList={post.images} show2Image={true} />
                </CardMedia>
            }
        </>
    )
}

export default function PostContent({ post }) {

    return (
        <>
            {post && post.shareId ? <ShareContent post={post} /> : <BaseContent post={post} share={false} />}
        </>
    )

}
