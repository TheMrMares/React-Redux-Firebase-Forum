//authReducer
export const LogIn = (payload) => ({
    type: 'LOG_IN',
    payload: payload
})

export const LogOut = (payload) => ({
    type: 'LOG_OUT',
    payload: payload
})

export const UpdateData = (payload) => ({
    type: 'UPDATE_DATA',
    payload: payload
})
//messagesReducer
export const SetMessages = (payload) => ({
    type: 'SET_MESSAGES',
    payload: payload
})
//threadsReducer
export const SetThreads = (payload) => ({
    type: 'SET_THREADS',
    payload: payload
})