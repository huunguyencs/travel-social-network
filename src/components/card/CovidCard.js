import { Backdrop, Button, Card, CardContent, CircularProgress, Fade, Link, Modal, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { cardStyles } from "../../style";
import CovidModal from "../modal/covid";

export default function CovidCard(props) {

    const { name } = props;
    const [covid, setCovid] = useState(null);
    const [data, setData] = useState(null);
    const [updateDate, setUpdateDate] = useState('');
    const [show, setShow] = useState(false);

    const classes = cardStyles();

    useEffect(() => {
        const getData = async () => {
            await fetch('https://static.pipezero.com/covid/data.json').then(res => res.json()).then(data => {
                setCovid(data);
                for (var loc of data.locations) {
                    if (loc.name === name) {
                        setData(loc);
                        break;
                    }
                }
                setUpdateDate(data.overview[data.overview.length - 1].date);
            });
        }
        if (name) {
            getData();
        }

    }, [name])

    return (
        <Card className={classes.weatherCardContainer}>
            <div className={classes.title}>
                <Typography variant="h6">Tình hình Covid-19</Typography>

            </div>

            <CardContent className={classes.content}>
                {
                    data ?
                        <div className={classes.detailInfo}>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Typography variant="h6">{data.name}</Typography>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", marginBottom: 10, }}>
                                <Typography>Cập nhật ngày {updateDate}</Typography>
                            </div>
                            <div className={classes.itemInfo}>
                                <Typography>Tổng ca nhiễm:</Typography>
                                <Typography className={classes.value}>{data.cases}</Typography>
                            </div>
                            <div className={classes.itemInfo}>
                                <Typography>Số ca nhiễm mới:</Typography>
                                <Typography className={classes.value}>{data.casesToday}</Typography>
                            </div>
                            <div className={classes.itemInfo}>
                                <Typography>Tử vong:</Typography>
                                <Typography className={classes.value}>{data.death}</Typography>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button onClick={() => setShow(true)} style={{ paddingInline: 20, backgroundColor: "#A5DEC8", marginTop: 20 }}>
                                    Xem tổng quát
                                </Button>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'right', marginTop: 10 }}>
                                <Typography variant="subtitle2">Dữ liệu được lấy từ <Link href="https://covid19.gov.vn/">Bộ y tế</Link></Typography>
                            </div>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={show}
                                onClose={() => setShow(false)}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={show}>
                                    <CovidModal covid={covid} handleClose={() => setShow(false)} updateDate={updateDate} />
                                </Fade>
                            </Modal>
                        </div> :
                        <CircularProgress />
                }
            </CardContent>
        </Card>
    )
}