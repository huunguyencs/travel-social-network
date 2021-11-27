import * as locationActions from '../actions/locationAction';
import * as notifyActions from '../actions/notifyAction';
import customAxios from '../../utils/fetchData';

export const getLocations = (data) => async (dispatch) => {

    dispatch(notifyActions.callStart());

    try {
        // call api to get location list
        const res = await customAxios().get("location/locations");
        console.log(res.data.location);
        // const temp = [
        //     { _id: "1", name: "Chùa Một Cột", province: { _id: 1, name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
        //     { _id: "2", name: "Hồ Gươm", province: { _id: 1, name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
        //     { _id: "3", name: "Lăng Chủ tịch", province: { _id: 1, name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
        //     { _id: "4", name: "Vịnh Hạ Long", province: { _id: 1, name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
        //     { _id: "5", name: "Biển Mỹ Khê", province: { _id: 1, name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
        //     { _id: "6", name: "Biển Vũng Tàu", province: { _id: 1, name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
        //     { _id: "7", name: "Biển Nha Trang", province: { _id: 1, name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
        //     { _id: "8", name: "Phố cổ Hội An", province: { _id: 1, name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
        //     { _id: "9", name: "Chùa Một Cột", province: { _id: 1, name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
        //     { _id: "10", name: "Chùa Một Cột", province: { _id: 1, name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
        //     { _id: "11", name: "Chùa Một Cột", province: { _id: 1, name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
        //     { _id: "12", name: "Chùa Một Cột", province: { _id: 1, name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
        //     { _id: "13", name: "Chùa Một Cột", province: { _id: 1, name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
        // ];
        dispatch(locationActions.getLocations({ location: res.data.location }));
        dispatch(notifyActions.callSuccess({ message: "" }));
    }
    catch (err) {
        dispatch(notifyActions.callFail({ error: err }));
    }
}

export const getLocationHot = (data) => async (dispatch) => {
    dispatch(locationActions.loading());

    try {
        const res = [
            {
                _id: 1,
                image: "https://toplist.vn/images/800px/le-hoi-giong-362211.jpg",
                locationName: "Chùa Một Cột",
                rate: 5,
            },
            {
                _id: 2,
                image: "https://toplist.vn/images/800px/le-hoi-giong-362211.jpg",
                locationName: "Đền Hùng",
                rate: 5,
            },
            {
                _id: 3,
                image: "https://toplist.vn/images/800px/le-hoi-giong-362211.jpg",
                locationName: "Lăng Chủ tịch",
                rate: 4,
            },
            {
                _id: 4,
                image: "https://toplist.vn/images/800px/le-hoi-giong-362211.jpg",
                locationName: "Vịnh Hạ Long",
                rate: 5
            }
        ];
        dispatch(locationActions.getLocationHot({ hot: res }));
    }
    catch (err) {
        dispatch(locationActions.error({ error: err.response.data.message }));
    }
}