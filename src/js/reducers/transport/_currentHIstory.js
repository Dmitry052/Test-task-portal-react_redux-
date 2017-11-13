const initialState = {
    data: {
        showHistoryModal: false,
        dataHistory: '',
        currentHistory: []
    }

}

export default function currentOrderHistory(state = initialState, action) {
    if (action.type === "SHOW_HISTORY") {
        state.data.showHistoryModal = !state.data.showHistoryModal;
        return { data: state.data }
    }
    if (action.type === "GET_HISTORY") {
        state.data.dataHistory = action.data;
        return { data: state.data }
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