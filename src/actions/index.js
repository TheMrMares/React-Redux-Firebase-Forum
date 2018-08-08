//testReducer
export const testIt = (payload) => ({
    type: 'TEST_IT',
    payload: payload
})
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
//dataReducer
export const SetData = (payload) => ({
    type: 'SET_DATA',
    payload: payload
})
export const AddData = (payload) => ({
    type: 'ADD_DATA',
    payload: payload
})
//messagesReducer
export const SetMessages = (payload) => ({
    type: 'SET_MESSAGES',
    payload: payload
})