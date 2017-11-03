const initialState = [];

export default function carDrivers(state = initialState, action) {
    if (action.type) {
        switch (action.type) {
            case 'carDrivers':
                state = action.data;
                break;
        }
    }
    return state;
}