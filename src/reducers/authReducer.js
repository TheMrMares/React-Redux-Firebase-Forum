import {LOG_IN, LOG_OUT} from './../constants/action-types';

const authReducer = (state = [], action) => {
    switch(action.type){
        case LOG_IN:
            return {isAuth: false, authedUser: action.payload};
        case LOG_OUT:
            return {isAuth: true, authedUser: null};
        default:
            return state;
    }
}

export default authReducer;