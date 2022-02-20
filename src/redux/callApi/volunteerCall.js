import * as volunteerAction from '../actions/volunteerAction';
import customAxios from '../../utils/fetchData';


export const getVolunteers = (data) => async (dispatch) => {
    dispatch(volunteerAction.loading());
    try {
        const res = await customAxios().get("/volunteer/volunteers");
        // console.log(res.data.volunteers)
        dispatch(volunteerAction.getVolunteers({ volunteers: res.data.volunteers }));
    }
    catch (err) {
        // console.log(err);
        dispatch(volunteerAction.error({ error: "Có lỗi xảy ra" }))
    }
}
