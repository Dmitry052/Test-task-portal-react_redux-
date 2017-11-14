// Родительский Reducer
import { combineReducers } from 'redux';
import admin_body from './admin/_admin_body';
import service_types from './admin/service_types';
import company from './admin/company';
import companytowgAdmin from './admin/conformity/companytowg';
import usertowgAdmin from './admin/conformity/usertowg';
import users from './admin/users';
//import wg from './admin/wg';
import wgbank from './admin/wgbank';

import user from './_authUser';

import expl from './exploitation/exploitation';

import transp from './transport/transport_filters_left_menu';
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
import transport_cars_status from './transport/transport_cars_status';
import history from './transport/_currentHIstory';

const admin_bodyReducer = combineReducers({
    admin_body
});
const service_typesReducer = combineReducers({
    service_types
});
const companyReducer = combineReducers({
    company
});
const companytowgAdminReducer = combineReducers({
    companytowgAdmin
});
const usertowgAdminReducer = combineReducers({
    usertowgAdmin
});
const usersReducer = combineReducers({
    users
});
// const wgReducer = combineReducers({
//     wg
// });
const wgbankReducer = combineReducers({
    wgbank
});
// --------------------------------------
const userReducer = combineReducers({
    user
});
// -------------------------------------- 
const left_menuReducer = combineReducers({
    left_menu
});
const transpReducer = combineReducers({
    transp
});
const explReducer = combineReducers({
    expl
});
const carDriversReducer = combineReducers({
    carDrivers
});
const carsReducer = combineReducers({
    cars
});
const transpStatusReducer = combineReducers({
    transpStatus
});
const transpUserToWgReducer = combineReducers({
    transpUserToWg
});
const transpExecutorReducer = combineReducers({
    transpExecutor
});
const currentOrderReducer = combineReducers({
    currentOrder
});
const closureStatusesReducer = combineReducers({
    closureStatuses
});
const directotiesReducer = combineReducers({
    directoties
});
const companyToUserReducer = combineReducers({
    companyToUser
});
const carDriversAllReducer = combineReducers({
    carDriversAll
});
const transport_drivers_statusReducer = combineReducers({
    transport_drivers_status
});
const transport_cars_statusReducer = combineReducers({
    transport_cars_status
});
const historyReducer = combineReducers({
    history
});
export default combineReducers({
    admin_body,
    service_types,
    companytowgAdmin,
    usertowgAdmin,
    company,
    users,
    //wg,
    wgbank,
    // --------
    user,
    // --------
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
    left_menu,
    history
});
