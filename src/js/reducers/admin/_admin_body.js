const initialState = {
    currentMenu: 'users',
}

export default function admin_body(state = initialState, action) {
    if (action.type === 'CURRENT_MENU') {
        state.currentMenu = action.data;
        return { currentMenu: action.data };
    }
    return state;
}