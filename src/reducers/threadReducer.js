import {SET_THREADS} from './../constants/action-types';

const initialSate = {
    threads: []
}

const threadReducer = (state = initialSate, action) => {
    switch(action.type){
        case SET_THREADS:
            return {threads: action.payload}
        default:
            return state;
    }
}

export default threadReducer;