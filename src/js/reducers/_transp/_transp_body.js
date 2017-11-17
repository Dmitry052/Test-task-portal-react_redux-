const initialState = {
    currentMenu: 'toMyWg',
}

export default function transp_body(state = initialState, action) {
    if (action.type === 'CURRENT_MENU_TRANSP') {
        state.currentMenu = action.data;
        return { currentMenu: action.data };
    }
    return state;
}