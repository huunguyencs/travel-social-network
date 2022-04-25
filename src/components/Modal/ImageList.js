import React, { useState } from "react";
import { ImageList as ImgList, ImageListItem, Typography } from "@material-ui/core";
import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css';
import { modalListStyles } from "../../style";
// import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function ImageList(props) {
    const classes = modalListStyles();

    const { imageList, show2Image, defaultHeight } = props;

    const [open, setOpen] = useState(false);
    const [pictureIndex, setPictureIndex] = useState(0);
    const heightRow = defaultHeight/ 6 || 84;
    // const [twoImage, setTwoImage] = useState(show2Image || false);
    // const media1280 = useMediaQuery('(max-width:1280px)');

    // useEffect(() => {
    //     if (media1280) {
    //         setTwoImage(false);
    //     }
    //     else {
    //         setTwoImage(true);
    //     }

    // }, [media1280]);

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
            {/* <ImgList rowHeight={defaultHeight || 500} className={classes.imageList} cols={imageList.length > 1 && twoImage ? 2 : 1}>
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
            </ImgList> */}
            {
                imageList.length === 1 ? 
                <ImgList rowHeight={heightRow} cols={8} className={classes.imageList} >
                    <ImageListItem cols={8} rows={6} 
                        className={classes.imageItem} 
                        key={imageList[0]} 
                        onClick={() => handleClick(0)}
                    >
                        <img src={imageList[0]} alt="loading..." />
                    </ImageListItem>
                </ImgList> :
                imageList.length === 2 ?
                <ImgList rowHeight={heightRow} cols={8} className={classes.imageList} >
                    {imageList.map((item, index) => (
                        <ImageListItem cols={4} rows={6} 
                            className={classes.imageItem} 
                            key={item} 
                            onClick={() => handleClick(index)}
                        >
                            <img src={item}  alt="loading..."/>
                        </ImageListItem>
                    ))}
                </ImgList>:
                imageList.length === 3 ?
                <ImgList rowHeight={heightRow} cols={8} className={classes.imageList} >
                    <ImageListItem cols={4} rows={6} 
                        className={classes.imageItem} 
                        key={imageList[0]} 
                        onClick={() => handleClick(0)}
                    >
                        <img src={imageList[0]} alt="loading..."/>
                    </ImageListItem>
                    <ImageListItem cols={4} rows={6} className={classes.imageItem}>
                        <ImgList rowHeight={heightRow} cols={1} className={classes.imageList} >
                            <ImageListItem cols={1} rows={3} 
                                className={classes.imageItem} 
                                key={imageList[1]} 
                                onClick={() => handleClick(1)}
                            >
                                <img src={imageList[1]} alt="loading..."/>
                            </ImageListItem>
                            <ImageListItem cols={1} rows={3} 
                                className={classes.imageItem} 
                                key={imageList[2]} 
                                onClick={() => handleClick(2)}
                            >
                                <img src={imageList[2]} alt="loading..."/>
                            </ImageListItem>
                        </ImgList>
                    </ImageListItem>
                </ImgList>:
                imageList.length === 4 ?
                <ImgList rowHeight={heightRow} cols={8} className={classes.imageList} >
                    {imageList.map((item, index) => (
                        <ImageListItem cols={4} rows={3}
                            className={classes.imageItem} 
                            key={item} 
                            onClick={() => handleClick(index)}
                        >
                            <img src={item} alt="loading..." />
                        </ImageListItem>
                    ))}
                </ImgList>:
                <ImgList rowHeight={heightRow} cols={8} className={classes.imageList} >
                    <ImageListItem cols={5} rows={6} className={classes.imageItem}>
                        <ImgList rowHeight={heightRow} cols={1} >
                            {imageList.slice(0,2).map((item, index) => (
                                <ImageListItem cols={1} rows={3}
                                    className={classes.imageItem} 
                                    key={item} 
                                    onClick={() => handleClick(index)}
                                >
                                    <img src={item}  alt="loading..."/>
                                </ImageListItem>
                            ))}
                        </ImgList>
                    </ImageListItem>
                    <ImageListItem cols={3} rows={6} className={classes.imageItem}>
                        <ImgList rowHeight={heightRow} cols={1} >
                            {imageList.slice(2,5).map((item, index) => (
                                <ImageListItem rows={2} cols={1}
                                    className={classes.imageItem} 
                                    key={item} 
                                    onClick={() => handleClick(index)}
                                >
                                    <img src={item}  alt="loading..."/>
                                    {(imageList.length > 5) && <Typography variant="h2" className={classes.textCenter}>{imageList.length - 5}+</Typography>}
                                </ImageListItem>
                            ))}
                        </ImgList>
                    </ImageListItem>
                </ImgList>

            }

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