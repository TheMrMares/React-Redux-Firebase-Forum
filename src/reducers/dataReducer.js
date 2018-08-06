import {SET_DATA, ADD_DATA} from './../constants/action-types';

const initialSate = {
    threads: []
}

const dataReducer = (state = initialSate, action) => {
    switch(action.type){
        case SET_DATA:
            return {threads: action.payload}
        case ADD_DATA:
            return {threads: [...state.threads, action.payload]}
        default:
            return state;
    }
}

export default dataReducer;