import React, { useState } from "react";
import { ImageList as ImgList, ImageListItem, Typography } from "@material-ui/core";
import Lightbox from "react-image-lightbox";
import { makeStyles } from "@material-ui/core";
import 'react-image-lightbox/style.css';


const useStyles = makeStyles((theme) => ({
    imageList: {
        margin: 20,
        height: "100%",
        [theme.breakpoints.down("md")]: {
            height: 400,
        },
        // [theme.breakpoints.down("sm")]: {
        //     height: 200,
        // },
    },
    imageItem: {
        cursor: "pointer",
        transition: "0.5s",
        "&:hover": {
            filter: "brightness(85%)",
        }
    },
    more: {
        filter: "brightness(90%)",
    },
    textCenter: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "white",
    }
}))


export default function ImageList(props) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [pictureIndex, setPictureIndex] = useState(0);

    const imageList = props.imgList;
    const show2Image = props.show2Image;

    return (
        <>
            <ImgList rowHeight={600} className={classes.imageList} cols={imageList.length > 1 && show2Image ? 2 : 1}>
                <ImageListItem
                    key={imageList[0]}
                    className={classes.imageItem}
                    onClick={() => {
                        setOpen(true);
                        setPictureIndex(0);
                    }}
                >
                    <img src={imageList[0]} alt={imageList[0]} />
                </ImageListItem>
                {imageList.length > 1 && show2Image && (
                    <ImageListItem
                        key={imageList[1]}
                        className={imageList.length > 2 ? [classes.imageItem, classes.more] : classes.imageItem}
                        onClick={() => {
                            setOpen(true);
                            setPictureIndex(1);
                        }}
                    >
                        <img src={imageList[1]} alt={imageList[1]} />
                        {(imageList.length > 2) && <Typography variant="h2" className={classes.textCenter}>{imageList.length - 1}+</Typography>}
                    </ImageListItem>
                )}
            </ImgList>

            {open && (
                <Lightbox
                    mainSrc={imageList[pictureIndex]}
                    nextSrc={imageList[(pictureIndex + 1) % imageList.length]}
                    prevSrc={imageList[(pictureIndex + imageList.length - 1) % imageList.length]}
                    mainSrcThumbnail={imageList[pictureIndex]}
                    imageCaption={imageList[pictureIndex]}
                    nextSrcThumbnail={imageList[(pictureIndex + 1) % imageList.length]}
                    prevSrcThumbnail={imageList[(pictureIndex + imageList.length - 1) % imageList.length].url}
                    onCloseRequest={() => setOpen(false)}
                    onMoveNextRequest={() => setPictureIndex((pictureIndex + 1) % imageList.length)}
                    onMovePrevRequest={() => setPictureIndex((pictureIndex + imageList.length - 1) % imageList.length)}
                />
            )}

        </>
    )
}