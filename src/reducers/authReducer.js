import {LOG_IN, LOG_OUT} from './../constants/action-types';

const authReducer = (state = [], action) => {
    switch(action.type){
        case LOG_IN:
            return {isAuth: true, authedUser: action.payload};
        case LOG_OUT:
            return {isAuth: false, authedUser: null};
        default:
            return state;
    }
}

export default authReducer;