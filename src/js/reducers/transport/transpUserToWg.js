const initialState = [];

export default function transpUserToWg(state = initialState, action) {

    if (action.type) {
        switch (action.type) {
            case 'transpUserToWg':
                state = action.data;
                return action.data;
        }
    }
    return state
}