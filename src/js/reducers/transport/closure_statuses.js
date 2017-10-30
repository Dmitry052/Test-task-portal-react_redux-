const initialState = [];

export default function closure_statuses(state = initialState, action) {
    if (action.type) {
        switch (action.type) {
            case 'closureStatuses':
                state = action.data;
                break;
        }
    }
      return state
}