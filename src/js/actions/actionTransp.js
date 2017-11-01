import axios from 'axios';
import { apiPrefix } from './../../../etc/config.json';

// Фильтры
export const transpMyWG = () => dispatch => {
  axios.post(`${apiPrefix}/transp/myWG`).then((response) => {
    dispatch({
      type: "transpMyWG",
      data: response.data
    });
  });
};
export const transpToMe = () => dispatch => {
  axios.get(`${apiPrefix}/transp/toMe`).then((response) => {
    dispatch({
      type: "transpToMe",
      data: response.data
    });
  });
};

export const transpDoneTrip = () => dispatch => {
  axios.get(`${apiPrefix}/transp/doneTrip`).then((response) => {
    dispatch({
      type: "transpDoneTrip",
      data: response.data
    });
  });
};

export const transpDataSend = () => dispatch => {
  axios.get(`${apiPrefix}/transp/dataSend`).then((response) => {
    dispatch({
      type: "transpDataSend",
      data: response.data
    });
  });
};

export const cancelClient = () => dispatch => {
  axios.get(`${apiPrefix}/transp/cancelClient`).then((response) => {
    dispatch({
      type: "cancelClient",
      data: response.data
    });
  });
};
// Для грида
export const drivers = () => dispatch => {
  axios.get(`${apiPrefix}/transp/carDrivers`).then((response) => {
    dispatch({
      type: "carDrivers",
      data: response.data
    });
  });
};

export const cars = () => dispatch => {
  axios.get(`${apiPrefix}/transp/cars`).then((response) => {
    dispatch({
      type: "cars",
      data: response.data
    });
  });
};

export const transpStatus = () => dispatch => {
  axios.get(`${apiPrefix}/transp/transport_statuses`).then((response) => {
    dispatch({
      type: "transport_statuses",
      data: response.data
    });
  });
};

export const transpUserToWg = () => dispatch => {
  axios.get(`${apiPrefix}/transp/userstowg`).then((response) => {
    dispatch({
      type: "transpUserToWg",
      data: response.data
    });
  });
};
export const companyToUser = () => dispatch => {
  axios.get(`${apiPrefix}/transp/companyToUser`).then((response) => {
    dispatch({
      type: "companyToUser",
      data: response.data
    });
  });
};

export const closureStatuses = () => dispatch => {
  axios.get(`${apiPrefix}/transp/closureStatuses`).then((response) => {
    dispatch({
      type: "closureStatuses",
      data: response.data
    });
  });
};

export const carDriversAll = () => dispatch => {
  axios.get(`${apiPrefix}/transp/carDriversAll`).then((response) => {
    dispatch({
      type: "carDriversAll",
      data: response.data
    });
  });
};
// -----------------------------------------------------------
export const clickCurrentOrder = (row, drivers, statuses, wg, cars, listExecutors, closure_code, index) => dispatch => {
  dispatch({
    type: "currentOrder",
    data: [row, drivers, statuses, wg, cars, closure_code, index]
  });
  axios.get(`${apiPrefix}/transp/transpExecutor?executor=${row.wg_name}`).then((response) => {
    dispatch({
      type: "listExecutors",
      data: response.data
    });
  });
  axios.get(`${apiPrefix}/transp/transpExecutor?executor=${row.wg_name}`).then((response) => {
    dispatch({
      type: "transpExecutor",
      data: response.data
    });
  });
};
export const setDriver = (driver, drivers, cars) => dispatch => {
  dispatch({
    type: "setDriver",
    data: [driver, drivers, cars]
  });
};
export const setStatus = (status) => dispatch => {
  dispatch({
    type: "setStatus",
    data: status
  });
};
export const setWG = (wg, name) => dispatch => {
  dispatch({
    type: "setWG",
    data: wg
  });
  axios.get(`${apiPrefix}/transp/transpExecutor?executor=${wg}`).then((response) => {
    dispatch({
      type: "listExecutors",
      data: response.data
    });
  });
};
export const setExecutor = (executor) => dispatch => {
  dispatch({
    type: "setExecutor",
    data: executor
  });
};
export const setClosureCode = (code) => dispatch => {
  dispatch({
    type: "closureCode",
    data: code
  });
};
// ***********************************************
export const setTimeTrip = (time) => dispatch => {
  dispatch({
    type: "setTimeTrip",
    data: time
  });
};
export const setDistance = (distance) => dispatch => {
  dispatch({
    type: "setDistance",
    data: distance
  });
};
export const setIdletime = (idletime) => dispatch => {
  dispatch({
    type: "setIdletime",
    data: idletime
  });
};
export const setPrice = (price) => dispatch => {
  dispatch({
    type: "setPrice",
    data: price
  });
};
export const setSolution = (text) => dispatch => {
  dispatch({
    type: "setSolution",
    data: text
  });
};
// ***********************************************
export const saveOrder = (orderData) => dispatch => {
  axios.post(`${apiPrefix}/transp/saveOrder`, orderData).then((response) => {
    // console.log('saved successfully');
  });
};

export const assignCar = () => dispatch => {
  dispatch({
    type: "assignCar",
    // data: executor
  });
};

export const doneTrip = (status) => dispatch => {
  dispatch({
    type: "doneTrip",
    data: status
  });
};
// **************Справочники***************
export const showDirect = () => dispatch => {
  dispatch({
    type: "SHOW_DIRECT",
  });

};
export const showCarsDirect = () => dispatch => {
  dispatch({
    type: "SHOW_CARS",
  });
  dispatch({
    type: "clean_up",
  });
};
export const showDriversDirect = () => dispatch => {
  dispatch({
    type: "SHOW_DRIVERS",
  });
  dispatch({
    type: "clean_up",
  });
};
export const showAddDriver = (company) => dispatch => {
  dispatch({
    type: "SHOW_ADD_DRIVERS",
    data: company
  });
};
export const showAddCar = () => dispatch => {
  dispatch({
    type: "SHOW_ADD_CARS",
  });
};
export const showEditDriver = (row, company) => dispatch => {
  dispatch({
    type: "SHOW_EDIT_DRIVERS",
    data: [row, company]
  });
};
export const showEditCar = (row, company) => dispatch => {
  dispatch({
    type: "SHOW_EDIT_CARS",
    data: [row, company]
  });
};
export const setBrandName = (brand) => dispatch => {
  dispatch({
    type: "SET_BRAND_NAME",
    data: brand
  });
};
export const setVehicleNumberCar = (num) => dispatch => {
  dispatch({
    type: "SET_VEHICLE_NUMBER",
    data: num
  });
};
export const setColorCar = (color) => dispatch => {
  dispatch({
    type: "SET_COLOR_CAR",
    data: color
  });
};
export const setCompanyCar = (company) => dispatch => {
  dispatch({
    type: "SET_COMPANY_CAR",
    data: company
  });
};
// -----------------------------------
export const setDriverName = (name) => dispatch => {
  dispatch({
    type: "SET_DRIVER_NAME_DIRECT",
    data: name
  });
};
export const setDriverPhone = (phone) => dispatch => {
  dispatch({
    type: "SET_DRIVER_PHONE_DIRECT",
    data: phone
  });
};
export const setStatusDriverDirect = (status) => dispatch => {
  dispatch({
    type: "SET_STATUS_DRIVER_DIRECT",
    data: status
  });
};
export const setCompanyDriverDirect = (driver) => dispatch => {
  dispatch({
    type: "SET_COMPANY_DRIVER_DIRECT",
    data: driver
  });
};
export const setVehicleNumber = (num) => dispatch => {
  dispatch({
    type: "SET_VEHICLE_NUMBER_DRIVER_DIRECT",
    data: num
  });
};
// -------------------------
export const selectDriver = (selected) => dispatch => {
  dispatch({
    type: "SELECT_DRIVER",
    data: selected
  });
};
export const selectCar = (selected) => dispatch => {
  dispatch({
    type: "SELECT_CAR",
    data: selected
  });
};
// -------------------------
export const saveToDBDriverDirect = (driver) => dispatch => {
  axios.post(`${apiPrefix}/transp/saveDriver`, driver).then((response) => {
    // console.log('saved successfully');
  });
};
export const saveToDBCarDirect = (car) => dispatch => {
  axios.post(`${apiPrefix}/transp/saveCar`, car).then((response) => {
    // console.log('saved successfully');
  });
};
// -----------------------
export const deleteDrivers = (drivers) => dispatch => {
  axios.post(`${apiPrefix}/transp/deleteDrivers`, drivers).then((response) => {
    // console.log('saved successfully');
  });
  dispatch({
    type: "DELETE_SELECT_DRIVER",
  });
};
export const deleteCars = (cars) => dispatch => {
  axios.post(`${apiPrefix}/transp/deleteCars`, cars).then((response) => {
    // console.log('saved successfully');
  });
  dispatch({
    type: "DELETE_SELECT_CAR",
  });
};
