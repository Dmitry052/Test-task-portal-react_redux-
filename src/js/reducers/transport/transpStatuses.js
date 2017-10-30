const initialState = [];

export default function tranpStatuses(state = initialState, action) {

    if (action.type) {
        switch (action.type) {
            case 'transport_statuses':
                return state = action.data;
        }
    }
    return state
}