// Родительский Reducer
import { combineReducers } from 'redux';
import transp from './transport/transport_filters_left_menu';


import expl from './exploitation/exploitation';

import left_menu from './transport/left_menu';
import carDrivers from './transport/carDrivers';
import carDriversAll from './transport/carDriversAll';
import cars from './transport/transport_drivers';
import transpStatus from './transport/transpStatuses';
import transpUserToWg from './transport/transpUserToWg';
import transpExecutor from './transport/transpExecutor';
import currentOrder from './transport/_currentOrder';
import directoties from './transport/_directories';
import closureStatuses from './transport/closure_statuses';
import companyToUser from './transport/companyToUser';
import transport_drivers_status from './transport/transport_drivers_status';
import transport_cars_status from'./transport/transport_cars_status';

const left_menuReducer = combineReducers ({
    left_menu
});
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
const directotiesReducer = combineReducers ({
    directoties
});
const companyToUserReducer = combineReducers ({
    companyToUser
});
const carDriversAllReducer = combineReducers ({
    carDriversAll
});
const transport_drivers_statusReducer = combineReducers ({
    transport_drivers_status
});
const transport_cars_statusReducer = combineReducers ({
    transport_cars_status
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
    closureStatuses,
    directoties,
    companyToUser,
    carDriversAll,
    transport_drivers_status,
    transport_cars_status,
    left_menu
});
