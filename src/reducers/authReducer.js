import {LOG_IN, LOG_OUT, UPDATE_DATA} from './../constants/action-types';

const authReducer = (state = [], action) => {
    switch(action.type){
        case LOG_IN:
            return {isAuth: true, authedUser: action.payload.user, authedData: action.payload.data};
        case LOG_OUT:
            return {isAuth: false, authedUser: null, authedData: null};
        case UPDATE_DATA:
        return {isAuth: state.isAuth, authedUser: state.authedUser, authedData: action.payload};
        break;
        default:
            return state;
    }
}

export default authReducer;