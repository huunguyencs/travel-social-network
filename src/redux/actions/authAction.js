import { AUTH } from "../constants"

const auth = (props) => {
    return {
        type: AUTH,
        payload: props,
    }
}

export default auth;