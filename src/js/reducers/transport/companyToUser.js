const initialState = [];

export default function companyToUser(state = initialState, action) {
    if (action.type) {
        switch (action.type) {
            case 'companyToUser':
                state = action.data;
                break;
        }
    }
      return state
}