import {TEST_IT} from './../constants/action-types';

const testReducer = (state = [], action) => {
    switch(action.type){
        case TEST_IT:
            return {message: action.payload}
        default:
            return state;
    }
};
export default testReducer;