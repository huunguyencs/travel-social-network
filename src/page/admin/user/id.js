import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import LeftBar from "../../../components/Leftbar";
import { adminListMenu } from "../../../constant/adminMenu";
import AdminUserDetail from "../../../components/admin/User/Detail"
import { useParams } from "react-router-dom";
import customAxios from "../../../utils/fetchData";



export default function AdminUserDetailPage(props) {

    const { subpage } = useParams();

    const [user, setUser] = useState(null);
    const [state, setState] = useState({
        loading: false,
        error: null
    })

    const getUser = async (id) => {
        setState({
            loading: true,
            error: null
        })
        await customAxios().get(`/user/${id}`).then(res => {
            setUser(res.data.user);
            setState({
                loading: false,
                error: null
            })
        }).catch(err => {
            setState({
                loading: false,
                error: err
            })
        })
    }

    useEffect(() => {
        getUser(subpage);
    }, [subpage])

    useEffect(() => {
        document.title = "Admin - Chi tiết người dùng"
    })

    return (
        <Grid container>
            <Grid item md={3}>
                <LeftBar menuList={adminListMenu} />
            </Grid>
            <Grid item md={9}>
                <>
                    {
                        state.loading ?
                            <CircularProgress /> :
                            state.error ?
                                <div>
                                    <Button onClick={() => getUser(subpage)}>Tải lại</Button>
                                </div> :
                                <AdminUserDetail user={user} setUser={setUser} />
                    }
                </>

            </Grid>
        </Grid>
    )
}