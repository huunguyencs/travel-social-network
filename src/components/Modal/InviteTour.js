import {
    InputBase,
    Typography,
    Button,
    Paper,
    IconButton,
    CircularProgress,
    Chip,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    NativeSelect
} from '@material-ui/core';
import { Create, Close, CheckCircle } from '@material-ui/icons';
import React, { useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { formStyles } from '../../style';
import LoginModal from '../Modal/Login';
import customAxios from '../../utils/fetchData';
import { changeIsEdit, inviteJoinTour, removeMemberTour } from '../../redux/callApi/tourCall';
export default function InviteTour(props) {
    const { handleClose, usersParent, id } = props;
    console.log("usersParent",usersParent)
    const dispatch = useDispatch();

    const [state, setState] = useState({
    loading: false,
    error: null,
    });
    const [error, setError] = useState("")

    const { auth, socket} = useSelector(state => state);

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [users, setUsers] = useState(usersParent|| []);
    const [usersInvite, setUsersInvite] =useState([])

    const classes = formStyles();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search) return setSearchResult([]);
        try {
            const res = await customAxios().get(`/user/search_by_name?fullname=${search}`)
            const tempData = res.data.users.filter(item => item._id !== auth.user._id)
            setSearchResult(tempData);
        } catch (err) {
            console.log(err)
        }
    }
    const handleAdd = (user) => {
        let isVail = users.filter(item => item.id._id === user._id);
        if(isVail.length === 0) isVail = usersInvite.filter(item => item.id._id === user._id)
        if(isVail.length > 0){
            setError("Đã thêm thành viên!")
            return;
        }else{
            let temp = {
                id:{...user},
                isEdit: false,
                isJoin: false
            }
            setUsersInvite([...usersInvite, temp]);
        }
    }

    const removeUserInvite = index => {
        let temp = [...usersInvite];
        temp.splice(index, 1);
        setUsersInvite(temp);
    };

    const removeUser = index => {
        let temp = [...users];
        dispatch(removeMemberTour(id, temp[index], auth.token, socket, () => {
            setState({
                loading: false,
                error: false
            });
        },
        () => {
            setState({
                loading: false,
                error: true
            });
        }
        ));
        temp.splice(index, 1);
        setUsers(temp);
    };
    const handleSubmit = e => {
        e.preventDefault();
        if(usersInvite.length < 1){
            setError("Cần thêm ít nhất 1 thành viên!")
            return;
        }
        console.log("-----usersInvite",usersInvite)
        setState({
            loading: true,
            error: null
        });
        dispatch(inviteJoinTour(id, usersInvite, auth, () => {
            setState({
                loading: false,
                error: false
            });
        },
        () => {
            setState({
                loading: false,
                error: true
            });
        }
        ));
        setUsers(users.concat(usersInvite))
        setUsersInvite([])  
    };
    const handleChangeEdit = (idx, event) => {
        const tmpUser = users.map((user, index) => index===idx ? {
            ...user,
            isEdit: event.target.value !== "false"
        }:
            user
        )
        setUsers(tmpUser)
        dispatch(changeIsEdit(id, tmpUser[idx], auth.token, socket, () => {
            setState({
                loading: false,
                error: false
            });
        },
        () => {
            setState({
                loading: false,
                error: true
            });
        }
        ));
    };

    const handleChangeEditInvite = (idx, event) => {
        setUsersInvite(usersInvite.map((user, index) => index === idx ? {
            ...user,
            isEdit: !(event.target.value === "false")
        }:{
            ...user
        } ))
    };
    return (
    <>
        {auth.token ? (
        <Paper className={classes.paperContainer}>
            <div className={classes.modal_header}>
            <Typography variant="h5" style={{ marginLeft: '35%' }}>
                Mời thành viên
            </Typography>
            <IconButton size="small" onClick={handleClose}>
                <Close className={classes.modal_header_closeIcon} />
            </IconButton>
            </div>
            {error !== "" &&
                <Typography variant='body1' style={{color:"red"}} >{error}</Typography>
            }
            <List className={classes.message_users_list}>
                {
                    users.length > 0 ? <>
                        {users.map((user,idx) => 
                            <ListItem button key={idx}>
                                <ListItemAvatar>
                                    <Avatar alt="avatar" src={user.id.avatar}>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={user.id.fullname} />
                                <ListItemSecondaryAction>
                                    {
                                        user.id._id !== auth.user._id ? 
                                        <>
                                            {
                                                user.isJoin && <CheckCircle size='small' style={{color:"#63B191"}}/>
                                            }
                                            <NativeSelect
                                                value={user.isEdit}
                                                onChange={(e) => handleChangeEdit(idx, e)}
                                                name="age"
                                                className={classes.selectEmpty}
                                                inputProps={{ 'aria-label': 'age' }}
                                                defaultValue= {user.isEdit}
                                            >
                                                <option value={false}>Nhận xét</option>
                                                <option value={true}>Chỉnh sửa</option>
                                            </NativeSelect>
                                            <IconButton
                                                size='small'
                                                onClick={() => removeUser(idx)}
                                            >
                                                <Close/>
                                            </IconButton>
                                        </>
                                        :
                                        <Typography variant='body1'>Chủ sỡ hữu</Typography>
                                    }
                                    
                                </ListItemSecondaryAction>
                            </ListItem>
                        )}
                    </> : <></>
                }
            </List>
            <div className={classes.usersInvite}>
                <form onSubmit={handleSearch}>
                    <InputBase
                        placeholder="Thêm thành viên"
                        title="search"
                        variant="outlined"
                        name="search"
                        id="search"
                        className={classes.user}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </form>
                <List className={classes.message_users_list}>
                    {
                        usersInvite.length > 0 ? <>
                            {usersInvite.map((user, idx) => 
                                <ListItem button key={idx}>
                                    <ListItemAvatar>
                                        <Avatar alt="avatar" src={user.id.avatar}>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={user.id.fullname} />
                                    <ListItemSecondaryAction>
                                        <NativeSelect
                                            value={user.isEdit}
                                            onChange={ (e)=> handleChangeEditInvite(idx, e)}
                                            name="age"
                                            className={classes.selectEmpty}
                                            inputProps={{ 'aria-label': 'age' }}
                                            defaultValue={user.isEdit}
                                        >
                                            <option value={false}>Nhận xét</option>
                                            <option value={true}>Chỉnh sửa</option>
                                        </NativeSelect>
                                        <IconButton
                                            size='small'
                                            onClick={() => removeUserInvite(idx)}
                                        >
                                           <Close/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )}
                        </> : <></>
                    }
                </List>
                <Button
                className={classes.button}
                onClick={handleSubmit}
                disabled={state.loading}
                >
                    {state.loading ? (
                        <CircularProgress size="25px" color="inherit" />
                    ) : (
                        <>
                        <Create style={{ marginRight: 10 }} />
                            Thêm
                        </>
                    )}
                </Button>
                <List className={classes.message_users_list}>
                    {
                        searchResult.length > 0 ? <>
                            {searchResult.map(user => 
                                <ListItem button key={user._id} onClick={() => handleAdd(user)}>
                                    <ListItemAvatar>
                                        <Avatar alt="avatar" src={user.avatar}>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={user.fullname} />
                                </ListItem>
                            )}
                        </> : <></>
                    }
                </List>
            </div>
            {/* <div className={classes.create} style={{marginBottom: 0}}>
            {error !== "" &&
                <Typography variant='body1' style={{color:"red"}} >{error}</Typography>
            }
            <div className={classes.createWrapper}>
                <InputBase
                    placeholder="Tên nhóm trò chuyện"
                    title="name"
                    variant="outlined"
                    name="name"
                    id="name"
                    required
                    className={classes.user}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <form onSubmit={handleSearch}>
                    <InputBase
                        placeholder="Tìm tên thành viên"
                        title="search"
                        variant="outlined"
                        name="search"
                        id="search"
                        className={classes.user}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </form>
                
            </div>
            </div>
            <div style={{ padding: '5px 0 5px 0' }}>
                {users.map((value, idx) => (
                <Chip
                    label={value.fullname}
                    onDelete={() => removeUser(idx)}
                    key={idx}
                    style={{
                    marginInline: 5,
                    marginBottom: 5,
                    backgroundColor: '#A5DEC8'
                    }}
                />
                ))}
            </div>
            <List className={classes.message_users_list}>
                    {
                        searchResult.length > 0 ? <>
                            {searchResult.map(user => 
                                <ListItem button key={user._id} onClick={() => handleAdd(user)}>
                                    <ListItemAvatar>
                                        <Avatar alt="avatar" src={user.avatar}>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={user.fullname} />
                                </ListItem>
                            )}
                        </> : <></>
                    }
            </List>
            <Button
            className={classes.button}
            onClick={handleSubmit}
            disabled={state.loading}
            >
            {state.loading ? (
                <CircularProgress size="25px" color="inherit" />
            ) : (
                <>
                <Create style={{ marginRight: 10 }} />
                    Tạo
                </>
            )}
            </Button> */}
        </Paper>
        ) : (
        <LoginModal />
        )}
    </>
    );
}
