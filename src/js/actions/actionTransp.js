import axios from 'axios';
import { apiPrefix } from './../../../etc/config.json';

// Фильтры
export const transpMyWG = () => dispatch => {
  axios({
    method: 'get', url: `${apiPrefix}/transp`, params: {
      action: 'myWG',
    },
    onDownloadProgress: function (progressEvent) {
      dispatch({ type: "LOADER", data: 'none' });
    },
  }).then((response) => {
    dispatch({ type: "LOADER", data: '' });
    dispatch({
      type: "transpMyWG",
      data: response.data
    });
  }).catch(function (error) {
    alert("Нет ответа от сервера");
    dispatch({
      type: "ERROR_CONNECT",
    });
  });

  axios({
    method: 'get',
    url: `${apiPrefix}/transp`,
    params: {
      action: 'AUTH',
    }
  }).then((response) => {
    dispatch({
      type: "AUTH",
      data: response.data
    });
  });


};
// --------------------------------------------
export const transpToMe = () => dispatch => {
  axios({
    method: 'get',
    url: `${apiPrefix}/transp`,
    params: {
      action: 'toMe',
    }
  }).then((response) => {
    dispatch({
      type: "transpToMe",
      data: response.data
    });
  }).catch(function (error) {
    alert("Нет ответа от сервера");
    dispatch({
      type: "ERROR_CONNECT",
    });
  });
};
// --------------------------------------------
export const transpNew = () => dispatch => {
  axios({
    method: 'get',
    url: `${apiPrefix}/transp`,
    params: {
      action: 'newOrder',
    }
  }).then((response) => {
    dispatch({
      type: "transpNew",
      data: response.data
    });
  }).catch(function (error) {
    alert("Нет ответа от сервера");
    dispatch({
      type: "ERROR_CONNECT",
    });
  });
};
// --------------------------------------------
export const transpCarAppoint = () => dispatch => {
  axios({
    method: 'get',
    url: `${apiPrefix}/transp`,
    params: {
      action: 'carAppoint',
    }
  }).then((response) => {
    dispatch({
      type: "carAppoint",
      data: response.data
    });
  }).catch(function (error) {
    alert("Нет ответа от сервера");
    dispatch({
      type: "ERROR_CONNECT",
    });
  });
};
// --------------------------------------------
export const transpDoneTrip = () => dispatch => {
  axios({
    method: 'get',
    url: `${apiPrefix}/transp`,
    params: {
      action: 'doneTrip',
    }
  }).then((response) => {
    dispatch({
      type: "transpDoneTrip",
      data: response.data
    });
  }).catch(function (error) {
    alert("Нет ответа от сервера");
    dispatch({
      type: "ERROR_CONNECT",
    });
  });
};
// --------------------------------------------
export const cancelClient = () => dispatch => {
  axios({
    method: 'get',
    url: `${apiPrefix}/transp`,
    params: {
      action: 'cancelClient',
    }
  }).then((response) => {
    dispatch({
      type: "cancelClient",
      data: response.data
    });
  }).catch(function (error) {
    alert("Нет ответа от сервера");
    dispatch({
      type: "ERROR_CONNECT",
    });
  });
};
// --------------------------------------------
// export const transpDataSend = () => dispatch => {
//   axios.get(`${apiPrefix}/transp/dataSend`).then((response) => {
//     dispatch({
//       type: "transpDataSend",
//       data: response.data
//     });
//   }).catch(function (error) {
//     alert("Нет ответа от сервера");
//     dispatch({
//       type: "ERROR_CONNECT",
//     });
//   });
// };

// --------------------------------------------
// Для грида
export const drivers = () => dispatch => {
  axios({
    method: 'get',
    url: `${apiPrefix}/transp`,
    params: {
      action: 'carDrivers',
    }
  }).then((response) => {
    dispatch({
      type: "carDrivers",
      data: response.data
    });
  })
};
// --------------------------------------------
export const cars = () => dispatch => {
  axios({
    method: 'get',
    url: `${apiPrefix}/transp`,
    params: {
      action: 'cars',
    }
  }).then((response) => {
    dispatch({
      type: "cars",
      data: response.data
    });
  });
};
// --------------------------------------------
export const carsStatus = () => dispatch => {
  axios({
    method: 'get',
    url: `${apiPrefix}/transp`,
    params: {
      action: 'cars-status',
    }
  }).then((response) => {
    dispatch({
      type: "transport_cars_status",
      data: response.data
    });
  });
};
// --------------------------------------------
export const transpStatus = () => dispatch => {
  axios({
    method: 'get',
    url: `${apiPrefix}/transp`,
    params: {
      action: 'transport_statuses',
    }
  }).then((response) => {
    dispatch({
      type: "transport_statuses",
      data: response.data
    });
  });
};
// --------------------------------------------
export const transpDriversStatus = () => dispatch => {
  axios({
    method: 'get',
    url: `${apiPrefix}/transp`,
    params: {
      action: 'transport-drivers-status',
    }
  }).then((response) => {
    dispatch({
      type: "transport-drivers-status",
      data: response.data
    });
  });
};
// --------------------------------------------
export const transpUserToWg = () => dispatch => {
  axios({
    method: 'get',
    url: `${apiPrefix}/transp`,
    params: {
      action: 'userstowg',
    }
  }).then((response) => {
    dispatch({
      type: "transpUserToWg",
      data: response.data
    });
  });
};
// --------------------------------------------
export const companyToUser = () => dispatch => {
  axios({
    method: 'get',
    url: `${apiPrefix}/transp`,
    params: {
      action: 'companyToUser',
    }
  }).then((response) => {
    dispatch({
      type: "companyToUser",
      data: response.data
    });
  });
};
// --------------------------------------------
export const closureStatuses = () => dispatch => {
  axios({
    method: 'get',
    url: `${apiPrefix}/transp`,
    params: {
      action: 'closureStatuses',
    }
  }).then((response) => {
    dispatch({
      type: "closureStatuses",
      data: response.data
    });
  });
};
// --------------------------------------------
export const carDriversAll = () => dispatch => {
  axios({
    method: 'get',
    url: `${apiPrefix}/transp`,
    params: {
      action: 'carDriversAll',
    }
  }).then((response) => {
    console.log(response.data);
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
  axios({
    method: 'get',
    url: `${apiPrefix}/transp`,
    params: {
      action: 'transpExecutor',
      data: row.wg_name
    }
  }).then((response) => {
    dispatch({
      type: "listExecutors",
      data: response.data
    });
  });
  // axios({
  //   method: 'get',
  //   url: `${apiPrefix}/transp`,
  //   params: {
  //     action: 'transpExecutor',
  //     executor: row.wg_name
  //   }
  // }).then((response) => {
  //   dispatch({
  //     type: "transpExecutor",
  //     data: response.data
  //   });
  // });
};
// -----------------------------------------------------------
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
  axios({ method: 'get', url: `${apiPrefix}/transp`, params: { action: 'transpExecutor', data: wg } }).then((response) => {
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
export const assignCar = (user) => dispatch => {
  dispatch({
    type: "assignCar",
    data: user
  });
};

export const doneTripStatus = (status) => dispatch => {
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
export const setStatusCarDirect = (status) => dispatch => {
  dispatch({
    type: "SET_STATUS_CAR",
    data: status
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
export const saveOrder = (orderData) => dispatch => {
  axios({
    method: 'post',
    url: `${apiPrefix}/transp`,
    data: {
      action: 'saveOrder',
      data: orderData
    }
  }).then((response) => {
  }).catch(function (error) {
    alert("Нет ответа от сервера");
    dispatch({
      type: "ERROR_CONNECT",
    });
  });
};
export const saveToDBDriverDirect = (driver) => dispatch => {
  axios({
    method: 'post',
    url: `${apiPrefix}/transp`,
    data: {
      action: 'saveDriver',
      data: driver
    }
  }).then((response) => {
  }).catch(function (error) {
    alert("Нет ответа от сервера");
    dispatch({
      type: "ERROR_CONNECT",
    });
  });
};
export const saveToDBCarDirect = (car) => dispatch => {
  axios({
    method: 'post',
    url: `${apiPrefix}/transp`,
    data: {
      action: 'saveCar',
      data: car
    }
  }).then((response) => {
  }).catch(function (error) {
    alert("Нет ответа от сервера");
    dispatch({
      type: "ERROR_CONNECT",
    });
  });
};
// -----------------------
export const deleteDrivers = (drivers) => dispatch => {
  axios({
    method: 'post',
    url: `${apiPrefix}/transp`,
    data: {
      action: 'deleteDrivers',
      data: drivers
    }
  }).then((response) => {
  }).catch(function (error) {
    alert("Нет ответа от сервера");
    dispatch({
      type: "ERROR_CONNECT",
    });
  });

};
export const deleteCars = (cars) => dispatch => {
  axios.post(`${apiPrefix}/transp/deleteCars`, cars).then((response) => {
    if (response.data !== true) {
      dispatch({
        type: "CAR_ALERT",
        data: response.data.data
      });
    }
  });
};
