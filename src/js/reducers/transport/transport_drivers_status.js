const initialState = [];

export default function transport_drivers_status(state = initialState, action) {
    if (action.type) {
        switch (action.type) {
            case 'transport-drivers-status':
                return state = action.data;
        }
    }
     return state
}