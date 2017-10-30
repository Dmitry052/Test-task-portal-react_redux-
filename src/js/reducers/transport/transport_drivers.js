const initialState = [];

export default function carsReduce(state = initialState, action) {
    if (action.type) {
        switch (action.type) {
            case 'cars':
                return state = action.data;
        }
    }
     return state
}