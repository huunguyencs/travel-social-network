import React, { useEffect, useState } from "react";
import { ImageList as ImgList, ImageListItem, Typography } from "@material-ui/core";
import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css';
import { modalListStyles } from "../../style";
import useMediaQuery from '@material-ui/core/useMediaQuery';


export default function ImageList(props) {
    const classes = modalListStyles();

    const { imageList, show2Image } = props;

    const [open, setOpen] = useState(false);
    const [pictureIndex, setPictureIndex] = useState(0);
    const [height, setHeight] = useState(500);
    const media920 = useMediaQuery('(max-width:920px)');
    const media1280 = useMediaQuery('(max-width:1280px)');

    useEffect(() => {
        if (media1280) {
            setHeight(395)
        }
        else if (media920) {
            setHeight(495)
        }
        else setHeight(495)

        // window.addEventListener("resize", changeHeight);
    }, [setHeight, media1280, media920])

    return (
        <>
            <ImgList rowHeight={height} className={classes.imageList} cols={imageList.length > 1 && show2Image ? 2 : 1}>
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
                    prevSrcThumbnail={imageList[(pictureIndex + imageList.length - 1) % imageList.length]}
                    onCloseRequest={() => setOpen(false)}
                    onMoveNextRequest={() => setPictureIndex((pictureIndex + 1) % imageList.length)}
                    onMovePrevRequest={() => setPictureIndex((pictureIndex + imageList.length - 1) % imageList.length)}
                />
            )}

        </>
    )
}