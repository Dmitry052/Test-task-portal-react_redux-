const initialState = {
    showHistoryModal: false,
    dataHistory: '',
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
    return state;
}