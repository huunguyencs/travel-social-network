import * as VOLUNTEER_TYPES from '../constants/volunteerConstant';

const INIT_STATE = {
    volunteers: [],
    loading: false,
    error: null,
    page: 1
}

const volunteerReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case VOLUNTEER_TYPES.GET_VOLUNTEERS: {
            return {
                ...state,
                volunteers: action.payload.volunteers,
                page: 1,
                loading: false,
                error: null,
            }
        }
        case VOLUNTEER_TYPES.ADD_VOLUNTEER: {
            return {
                ...state,
                volunteers: [...state.volunteers, action.payload.volunteer],
                loading: false,
                error: null
            }
        }

        case VOLUNTEER_TYPES.GET_MORE_VOLUNTEER: {
            return {
                ...state,
                volunteers: [...state.volunteers, ...action.payload.volunteers],
                page: state.page + 1,
                loading: false,
                error: null
            }
        }
        case VOLUNTEER_TYPES.LOADING_VOLUNTEER: {
            return {
                ...state,
                loading: true,
                error: null,
            }
        }
        case VOLUNTEER_TYPES.DELETE_VOLUNTEER: {
            return {
                ...state,
                error: null,
                volunteers: state.volunteers.filter(volunteer => volunteer._id !== action.payload.id)
            }
        }
        case VOLUNTEER_TYPES.ERROR_VOLUNTEER: {
            return {
                ...state,
                loading: false,
                volunteers: [],
                page: 0,
                error: action.payload.error,
            }
        }
        default: {
            return state;
        }
    }
}

export default volunteerReducer;