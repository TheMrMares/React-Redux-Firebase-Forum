import { combineReducers } from 'redux';

import authReducer from './authReducer';
import messageReducer from './messageReducer';
import threadReducer from './threadReducer';

export default combineReducers({ 
    auths: authReducer,
    messages: messageReducer,
    threads: threadReducer
});