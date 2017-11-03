const initialState = [];

export default function transport_cars_status(state = initialState, action) {
    if (action.type) {
        switch (action.type) {
            case 'transport_cars_status':
                return state = action.data;
        }
    }
     return state
}