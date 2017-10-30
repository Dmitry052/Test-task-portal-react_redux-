const initialState = {
    show:'none',
}

export default function directoties(state = initialState, action) {
    if(action.type === "SHOW_DIRECTORIES"){
        state.show = '';
    }
    return state;
}