import React, { useEffect, useState } from "react";
import { ImageList as ImgList, ImageListItem, Typography } from "@material-ui/core";
import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css';
import { modalListStyles } from "../../style";
import useMediaQuery from '@material-ui/core/useMediaQuery';


export default function ImageList(props) {
    const classes = modalListStyles();

    const { imageList, show2Image, defaultHeight } = props;

    const [open, setOpen] = useState(false);
    const [pictureIndex, setPictureIndex] = useState(0);
    const [twoImage, setTwoImage] = useState(show2Image || false);
    const media1280 = useMediaQuery('(max-width:1280px)');

    useEffect(() => {
        if (media1280) {
            setTwoImage(false);
        }
        else {
            setTwoImage(true);
        }

    }, [media1280]);

    const handleClick = (i) => {
        setOpen(true);
        setPictureIndex(i);
    }

    const closePress = () => {
        setOpen(false);
    }

    const next = () => {
        setPictureIndex((pictureIndex + 1) % imageList.length)
    }

    const prev = () => {
        setPictureIndex((pictureIndex + imageList.length - 1) % imageList.length)
    }

    return (
        <>
            <ImgList rowHeight={defaultHeight || 500} className={classes.imageList} cols={imageList.length > 1 && twoImage ? 2 : 1}>
                <ImageListItem
                    key={imageList[0]}
                    className={classes.imageItem}
                    onClick={() => handleClick(0)}
                >
                    <img src={imageList[0]} alt={"Đang tải..."} />
                </ImageListItem>
                {imageList.length > 1 && twoImage && (
                    <ImageListItem
                        key={imageList[1]}
                        className={imageList.length > 2 ? classes.more : classes.imageItem}
                        onClick={() => handleClick(1)}
                    >
                        <img src={imageList[1]} alt={"Đang tải..."} />
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
                    prevSrcThumbnail={imageList[(pictureIndex + imageList.length - 1) % imageList.length]}
                    onCloseRequest={closePress}
                    onMoveNextRequest={next}
                    onMovePrevRequest={prev}
                />
            )}

        </>
    )
}