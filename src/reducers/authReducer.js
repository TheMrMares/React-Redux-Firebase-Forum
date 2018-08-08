import {LOG_IN, LOG_OUT, UPDATE_DATA} from './../constants/action-types';

const initialState = {
    authedUser: null,
    authedData: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case LOG_IN:
            return {authedUser: action.payload.user, authedData: action.payload.data};
        case LOG_OUT:
            return {authedUser: null, authedData: null};
        case UPDATE_DATA:
            return {authedUser: state.authedUser, authedData: action.payload};
        default:
            return state;
    }
}

export default authReducer;