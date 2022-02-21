import { Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import LeftBar from '../components/Leftbar'
import SpeedDialButton from '../components/SpeedDialBtn'
import { homeMenu } from '../constant/menu'
import useStyles from '../style'

export default function SettingPage() {

    const classes = useStyles();

    useEffect(() => {
        document.title = 'Cài đặt'
    }, [])
    return (
        <Grid container style={{ margin: 0, padding: 0 }}>
            <SpeedDialButton />
            <Grid item md={3} sm={2} xs={2} className={classes.leftbar}>
                <LeftBar menuList={homeMenu} />
            </Grid>
            <Grid item md={9} sm={10} xs={10} className={classes.content}>
            </Grid>
        </Grid>
    )
}
