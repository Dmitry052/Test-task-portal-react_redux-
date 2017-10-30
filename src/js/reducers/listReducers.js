// Родительский Reducer
import { combineReducers } from 'redux';
import transp from './transport/transport';
import expl from './exploitation/exploitation';
import carDrivers from './transport/carDrivers';
import cars from './transport/transport_drivers';
import transpStatus from './transport/transpStatuses';
import transpUserToWg from './transport/transpUserToWg';
import transpExecutor from './transport/transpExecutor';
import currentOrder from './transport/_currentOrder';
import closureStatuses from './transport/closure_statuses';

const transpReducer = combineReducers ({
    transp
});
const explReducer = combineReducers ({
    expl
});
const carDriversReducer = combineReducers ({
    carDrivers
});
const carsReducer = combineReducers ({
    cars
});
const transpStatusReducer = combineReducers ({
    transpStatus
});
const transpUserToWgReducer = combineReducers ({
    transpUserToWg
});
const transpExecutorReducer = combineReducers ({
    transpExecutor
});
const currentOrderReducer = combineReducers ({
    currentOrder
});
const closureStatusesReducer = combineReducers ({
    closureStatuses
});

export default combineReducers({
    transp,
    expl,
    carDrivers,
    cars,
    transpStatus,
    transpUserToWg,
    transpExecutor,
    currentOrder,
    closureStatuses
});
