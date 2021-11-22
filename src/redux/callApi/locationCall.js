import * as locationActions from '../actions/locationAction';
import * as notifyActions from '../actions/notifyAction';

export const getLocations = (data) => async (dispatch) => {

    dispatch(notifyActions.callStart());

    try {
        // call api to get location list
        const res = [
            { _id: "1", locationName: "Chùa Một Cột", province: { name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
            { _id: "2", locationName: "Hồ Gươm", province: { name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
            { _id: "3", locationName: "Lăng Chủ tịch", province: { name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
            { _id: "4", locationName: "Vịnh Hạ Long", province: { name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
            { _id: "5", locationName: "Biển Mỹ Khê", province: { name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
            { _id: "6", locationName: "Biển Vũng Tàu", province: { name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
            { _id: "7", locationName: "Biển Nha Trang", province: { name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
            { _id: "8", locationName: "Phố cổ Hội An", province: { name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
            { _id: "9", locationName: "Chùa Một Cột", province: { name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
            { _id: "10", locationName: "Chùa Một Cột", province: { name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
            { _id: "11", locationName: "Chùa Một Cột", province: { name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
            { _id: "12", locationName: "Chùa Một Cột", province: { name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
            { _id: "13", locationName: "Chùa Một Cột", province: { name: "Hà Nội" }, image: ["https://toplist.vn/images/800px/le-hoi-giong-362211.jpg"] },
        ];
        dispatch(locationActions.getLocations({ location: res }));
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