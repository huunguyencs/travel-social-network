import * as AUTH_TYPES from "../constants/authConstant"

const auth = (props) => {
    return {
        type: AUTH_TYPES.AUTH,
        payload: props,
    }
}

export default auth;