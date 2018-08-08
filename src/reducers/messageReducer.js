import {SET_MESSAGES} from './../constants/action-types';

const initialState = {
    messages: []
}

const messageReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_MESSAGES:
            return {messages: action.payload}
        default:
            return state;
    }
}

export default messageReducer;