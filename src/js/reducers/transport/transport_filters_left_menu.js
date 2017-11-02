const initialState = [];

export default function tranportReduce(state = initialState, action) {

    if (action.type) {
        switch (action.type) {
            case 'transpMyWG':
                return state = action.data;
            case 'transpNew':
                return state = action.data;
            case 'transpToMe':
                return state = action.data;
            case 'carAppoint':
                return state = action.data;
            case 'transpDoneTrip':
                return state = action.data;
            case 'transpDataSend':
                return state = action.data;
            case 'cancelClient':
                return state = action.data;
            case 'clean_up':
                return state = [];
        }
    }
     
    return state
}