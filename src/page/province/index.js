import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ProvinceCard from '../../components/card/ProvinceCard';
import LeftBar from '../../components/leftbar/LeftBar';
import SpeedDialButton from '../../components/speedDialBtn';
import { homeMenu } from '../../constant/menu';
import useStyles from '../../style';
import customAxios from '../../utils/fetchData';

export default function ProvincePage() {

    const [provinces, setProvinces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const classes = useStyles();

    const getProvince = async () => {
        setLoading(true);
        setError(false);
        await customAxios().get(`/province/all`).then((res) => {
            setLoading(false);
            setProvinces(res.data.provinces)
        }).catch((err) => {
            setLoading(false);
            setError(true)
        })
    }

    useEffect(() => {
        getProvince();
    }, [])


    return (
        <Grid container style={{ margin: 0, padding: 0 }}>
            <SpeedDialButton />
            <Grid item md={3} sm={2} xs={2} className={classes.leftbar}>
                <LeftBar menuList={homeMenu} />
            </Grid>
            <Grid item md={9} sm={10} xs={10} className={classes.content}>
                <Grid container style={{ marginTop: 100 }}>
                    {loading ?
                        <div >
                            <div className={classes.center}>
                                <CircularProgress />
                            </div>
                        </div> :
                        error ?
                            <div>
                                <div className={classes.center}>
                                    <Typography >Có lỗi xảy ra</Typography>
                                    <Button onClick={getProvince}>Thử lại</Button>
                                </div>
                            </div> :
                            provinces.map(province =>
                            (
                                <Grid item md={4} sm={6} xs={12} key={province._id}>
                                    <ProvinceCard province={province} />
                                </Grid>
                            )
                            )}
                </Grid>
            </Grid>
        </Grid>
    );
}
