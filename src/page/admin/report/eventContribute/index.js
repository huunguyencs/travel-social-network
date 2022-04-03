import React, {useEffect} from 'react'
import { Grid } from "@material-ui/core";
import LeftBar from "../../../../components/Leftbar";
import { adminListMenu } from "../../../../constant/adminMenu";

export default function AdminEventContributePage() {

    useEffect(() => {
        document.title = "Admin - Ý kiến đóng góp"
    }, [])

    return (
        <Grid container>
            <Grid item md={3}>
                <LeftBar menuList={adminListMenu} />
            </Grid>
            <Grid item md={9}>
                
            </Grid>
        </Grid>

    )
}