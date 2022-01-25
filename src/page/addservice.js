import { Button, Container, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BasicServiceInfo, DetailServiceInfo } from '../components/service/AddService';
import { getProvinces } from '../redux/callApi/locationCall';
import { addServiceStyles } from '../style';

function getStep() {
    return ["Thông tin cơ bản", "Thông tin chi tiết", "Hoàn thành"]
}

function Complele(props) {
    return (
        <div style={{ marginBlock: 100 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}>
                <CheckCircle style={{ fontSize: 100, color: "#777" }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography>Nhấn HOÀN TẤC để kết thúc</Typography>
            </div>
        </div>

    )
}

function getStepContent(step, props) {
    switch (step) {
        case 0:
            return <BasicServiceInfo {...props} />
        case 1:
            return <DetailServiceInfo {...props} />
        case 2:
            return <Complele />
        default:
            return "Error"
    }
}


export default function AddServicePage() {

    const classes = addServiceStyles();

    const { location } = useSelector(state => state);
    const dispatch = useDispatch();

    const [images, setImages] = useState([]);
    const [context, setContext] = useState({
        name: "",
        type: "",
        description: "",
        contact: "",
        cost: "",
        andress: "",
        province: null,
    });
    const [detail, setDetail] = useState({
        conform: "",
        featured: "",
    })
    const [activeStep, setActiveStep] = useState(0);
    const step = getStep();

    const handleBack = () => {
        setActiveStep(prev => prev - 1);
    }

    const handleNext = () => {
        setActiveStep(prev => prev + 1)
    }

    const handleSubmit = () => {

    }


    useEffect(() => {
        if (location.provinces?.length === 0) {
            dispatch(getProvinces());
        }
    }, [dispatch, location.provinces])

    useEffect(() => {
        document.title = "Thêm dịch vụ"
    }, [])

    return (

        <Container className={classes.root}>
            <Stepper activeStep={activeStep}>
                {step.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                <div>
                    {getStepContent(activeStep, {
                        images: images,
                        setImages: setImages,
                        context: context,
                        setContext: setContext,
                        detail: detail,
                        setDetail: setDetail
                    })}
                </div>
                <div className={classes.buttonContainer}>
                    <Button disabled={activeStep === 0} onClick={handleBack} variant='contained' color="primary">
                        Quay lại
                    </Button>
                    {
                        activeStep === step.length - 1 ?
                            <Button
                                onClick={handleSubmit}
                                variant='contained'
                                color="primary"
                            >
                                Hoàn tất
                            </Button> :
                            <Button
                                onClick={handleNext}
                                variant='contained'
                                color="primary"
                            >
                                Tiếp
                            </Button>
                    }
                </div>
            </div>
        </Container>
    );
}
