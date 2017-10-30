const initialState = [];

export default function transpUserToWg(state = initialState, action) {

    if (action.type) {
        switch (action.type) {
            case 'transpUserToWg':
                return state = action.data;
        }
    }
    return state
}