const initialState = {
    filter1: '',
    filter2: '',
    filter3: '',
    filter4: '',
    filter5: '',
    filter6: '',
    filter7: '',
    filter8: '',
    filter9: '',
};

export default function transpUserToWg(state = initialState, action) {

    if (action.type === 'FILETER_ACTIVE') {
        var i = 0;
        for (var key in state) {
            if (i === action.data) {
                state[key] = 'active';
            }else{
                state[key] = '';
            }
            i++;
        }
        return state;
    }
    return state
}