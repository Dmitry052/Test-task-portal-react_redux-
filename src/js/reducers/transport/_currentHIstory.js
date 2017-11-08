const initialState = {
    showHistoryModal: false,
    dataHistory: '',
    currentHistory: []
}

export default function currentOrderHistory(state = initialState, action) {
    if (action.type === "SHOW_HISTORY") {
        state.showHistoryModal = !state.showHistoryModal;
        return state;
    }
    if (action.type === "GET_HISTORY") {
        state.dataHistory = action.data;
        return state;
    }
    // if (action.type === "PUSH_HISTORY") {
    //     state.dataHistory.push(action.data);
    //     return state;
    // }
    // if (action.type === "DEL_HISTORY") {
    //     state.dataHistory = [];
    //     return state;
    // }
    return state;
}