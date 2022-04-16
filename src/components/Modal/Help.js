import { Button, CircularProgress, IconButton, InputBase, Paper, TextField, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { error, success } from '../../redux/actions/alertAction';
import { modalStyles } from '../../style';
import customAxios from '../../utils/fetchData';

const type = [
    'Phương tiện, xe cộ',
    'Lạc đường',
    'Tai nạn, chấn thương',
    'Thiên tai',
    'Cướp giật',
    'Khác'
]

const filter = createFilterOptions();

export default function Help({ handleClose }) {

    const { auth, socket } = useSelector(state => state)
    const dispatch = useDispatch();

    const [context, setContext] = useState({
        description: "",
        type: null,
        positionStr: "",
        position: null
    })

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setContext(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const changeType = (value) => {
        setContext(state => ({
            ...state,
            type: value
        }))
    }

    const handleSubmit = async () => {
        setLoading(true);
        await customAxios(auth.token).post('/help', context).then(res => {
            socket.emit('createHelp', res.help)
            setLoading(false);
            handleClose();
            dispatch(success({ message: 'Tạo yêu cầu trợ giúp thành công!' }));
        }).catch(err => {
            dispatch(error({ message: 'Có lỗi xảy ra!' }));
        })
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                setContext(state => ({
                    ...state,
                    position: [position.coords.longitude, position.coords.latitude]
                }))
            }
        )
    }, [])

    const classes = modalStyles();
    return (
        <Paper className={classes.paperHelp}>
            <div className={classes.modal_header}>
                <div />
                <h2>Tôi cần trợ giúp</h2>
                <div>
                    <IconButton onClick={handleClose} size="small">
                        <Close className={classes.modal_header_closeIcon} />
                    </IconButton>
                </div>
            </div>
            <div className={classes.explainText}>
                <div>
                    <Typography variant='body2'>Nếu khẩn cấp, bạn có thể không cần điền các thông tin bên dưới mà có thể chọn tạo trợ giúp ngay!</Typography>
                </div>
                <Typography variant='body2'>Tuy nhiên, chúng tôi khuyến khích bạn cung cấp đầy đủ thông tin để có thể nhận được trợ giúp từ người khác dễ dàng hơn.</Typography>
            </div>
            <div className={classes.form}>
                <div className={classes.formItem}>
                    <InputBase
                        placeholder="Mô tả vấn đề cần trợ giúp"
                        title="Vấn đề cần trợ giúp"
                        rows={10}
                        name="description"
                        id="description"
                        multiline
                        className={classes.input}
                        value={context.description}
                        onChange={handleChange}
                    />
                </div>
                <div className={classes.formItem}>
                    <Autocomplete
                        value={context.type}
                        className={classes.autocomplete}
                        onChange={(event, newValue) => {
                            if (typeof newValue === 'string') {
                                changeType(newValue);
                            } else if (newValue && newValue.inputValue) {
                                // Create a new value from the user input
                                changeType(newValue.inputValue);
                            } else {
                                changeType(newValue);
                            }
                        }}
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params);

                            // Suggest the creation of a new value
                            if (params.inputValue !== '') {
                                filtered.push(params.inputValue);
                            }

                            return filtered;
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        id="free-solo-with-text-demo"
                        options={type}
                        getOptionLabel={(option) => {
                            // Value selected with enter, right from the input
                            if (typeof option === 'string') {
                                return option;
                            }
                            // Add "xxx" option created dynamically
                            if (option.inputValue) {
                                return option.inputValue;
                            }
                            // Regular option
                            return option;
                        }}
                        renderOption={(option) => option}
                        style={{ width: 300 }}
                        freeSolo
                        renderInput={(params) => (
                            <TextField {...params} label="Loại trợ giúp" variant="outlined" />
                        )}
                    />
                </div>
                <div className={classes.formItem}>
                    <InputBase
                        placeholder="Mô tả vị trí"
                        title="Vị trí"
                        rows={3}
                        name="positionStr"
                        id="positionStr"
                        multiline
                        className={classes.input}
                        value={context.positionStr}
                        onChange={handleChange}
                    />
                    <div className={classes.explainText} style={{ marginTop: 10 }}>
                        <Typography variant='body2'>Khi không cung cấp, chúng tôi vẫn có thể xác định vị trí của bạn qua định vị. Tuy nhiên, chúng tôi khuyến khích bạn cung cấp mô tả để người khác tìm bạn dễ dàng hơn.</Typography>
                        <div>
                            <Typography variant='body2'>Chúng tôi xin cam đoan chỉ sử dụng vị trí của người dùng với mục đích trợ giúp.</Typography>
                        </div>
                    </div>
                </div>
                <div className={classes.button}>
                    <Button onClick={handleSubmit} variant='contained' startIcon={loading && <CircularProgress />}>
                        Tạo yêu cầu trợ giúp
                    </Button>
                </div>
            </div>
        </Paper>
    )
}
