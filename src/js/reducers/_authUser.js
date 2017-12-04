const initialState = {};

export default function carDrivers(state = initialState, action) {
    if (action.type === 'AUTH') {
        return {
            id: action.data.id,
            displayname: action.data.displayname
        }
    }
    if (action.type === 'AUTH_RESULT') {
        
    }
    return state;
}