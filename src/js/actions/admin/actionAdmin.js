import axios from 'axios';
import { apiPrefix } from './../../../../etc/config.json';
axios.defaults.withCredentials = true;
export const currentMenu = (value) => dispatch => {
  switch (value) {
    case 'users':
      axios({ method: 'get', url: `${apiPrefix}/admin`, params: { action: 'users', } }).then((response) => {
        dispatch({
          type: "USERS_ADMIN",
          data: response.data
        });
      }).catch(function (error) {
        alert("Нет ответа от сервера.USERS_ADMIN");
      });
      axios({ method: 'get', url: `${apiPrefix}/admin`, params: { action: 'company', } }).then((response) => {
        dispatch({
          type: "COMPANY_ADMIN",
          data: response.data
        });
      }).catch(function (error) {
        alert("Нет ответа от сервера.COMPANY_ADMIN");
      });
      break;
    // -----------------------------------
    case 'company':
      axios({ method: 'get', url: `${apiPrefix}/admin`, params: { action: 'company', } }).then((response) => {
        dispatch({
          type: "COMPANY_ADMIN",
          data: response.data
        });
      }).catch(function (error) {
        alert("Нет ответа от сервера.COMPANY_ADMIN ");
      });
      axios({ method: 'get', url: `${apiPrefix}/admin`, params: { action: 'st', } }).then((response) => {
        dispatch({
          type: "ST_ADMIN",
          data: response.data
        });
      }).catch(function (error) {
        alert("Нет ответа от сервера");
      });
      break;
    // -----------------------------------
    case 'st':
      axios({ method: 'get', url: `${apiPrefix}/admin`, params: { action: 'st', } }).then((response) => {
        dispatch({
          type: "ST_ADMIN",
          data: response.data
        });
      }).catch(function (error) {
        alert("Нет ответа от сервера");
      });
      break;
    // -----------------------------------
    case 'wg':
      axios({
        method: 'get',
        url: `${apiPrefix}/admin`,
        params: {
          action: 'wg',
        }
      }).then((response) => {
        dispatch({
          type: "WG_ADMIN",
          data: response.data
        });
      }).catch(function (error) {
        alert("Нет ответа от сервера");
      });
      break;
    // -----------------------------------
    case 'wgbank':
      axios({
        method: 'get',
        url: `${apiPrefix}/admin`,
        params: {
          action: 'wgbank',
        }
      }).then((response) => {
        dispatch({
          type: "WGBANK_ADMIN",
          data: response.data
        });
      }).catch(function (error) {
        alert("Нет ответа от сервера");
      });
      break;
    // -----------------------------------
    case 'conformity':
      axios({method: 'get',url: `${apiPrefix}/admin`,params: {action: 'companytowg',}}).then((response) => {
        dispatch({
          type: "CONF_COMPANY_TOWG_ADMIN",
          data: response.data
        });
      }).catch(function (error) {
        alert("Нет ответа от сервера");
      });
      axios({method: 'get',url: `${apiPrefix}/admin`,params: {action: 'usertowg',}}).then((response) => {
        dispatch({
          type: "CONF_USER_TOWG_ADMIN",
          data: response.data
        });
      }).catch(function (error) {
        alert("Нет ответа от сервера");
      });
      axios({method: 'get',url: `${apiPrefix}/admin`,params: {action: 'wgbank',}}).then((response) => {
        dispatch({
          type: "WGBANK_ADMIN",
          data: response.data
        });
      }).catch(function (error) {
        alert("Нет ответа от сервера");
      });
      axios({method: 'get',url: `${apiPrefix}/admin`,params: {action: 'wg',}}).then((response) => {
        dispatch({
          type: "WG_ADMIN",
          data: response.data
        });
      }).catch(function (error) {
        alert("Нет ответа от сервера");
      });
      break;
  }
  dispatch({
    type: "CURRENT_MENU",
    data: value
  });
};
// --------------------------------------------
export const saveUser = (user) => dispatch => {
  axios({
    method: 'post',
    url: `${apiPrefix}/admin`,
    data: {
      action: 'saveUser',
      data: user
    }
  }).then((response) => {
    // 
  }).catch(function (error) {
    alert("Нет ответа от сервера");
  });
};
// --------------------------------------------
export const deleteUsers = (users) => dispatch => {
  axios({
    method: 'post',
    url: `${apiPrefix}/admin`,
    data: {
      action: 'deleteUsers',
      data: users
    }
  }).then((response) => {
    dispatch({ type: 'UNCHECK_USER_ADMIN' });
  }).catch(function (error) {
    alert("Нет ответа от сервера");
  });
};
// --------------------------------------------
export const saveST = (st) => dispatch => {
  axios({
    method: 'post',
    url: `${apiPrefix}/admin`,
    data: {
      action: 'saveST',
      data: st
    }
  }).then((response) => {
    // 
  }).catch(function (error) {
    alert("Нет ответа от сервера");
  });
};
// --------------------------------------------
export const deleteST = (st) => dispatch => {
  axios({
    method: 'post',
    url: `${apiPrefix}/admin`,
    data: {
      action: 'deleteST',
      data: st
    }
  }).then((response) => {
    // 
  }).catch(function (error) {
    alert("Нет ответа от сервера");
  });
};
// --------------------------------------------
export const saveWG = (wg) => dispatch => {
  axios({
    method: 'post',
    url: `${apiPrefix}/admin`,
    data: {
      action: 'saveWG',
      data: wg
    }
  }).then((response) => {
    // 
  }).catch(function (error) {
    alert("Нет ответа от сервера");
  });
};
// --------------------------------------------
export const deleteWG = (wg) => dispatch => {
  axios({
    method: 'post',
    url: `${apiPrefix}/admin`,
    data: {
      action: 'deleteWG',
      data: wg
    }
  }).then((response) => {
    // 
  }).catch(function (error) {
    alert("Нет ответа от сервера");
  });
};
// --------------------------------------------
export const saveWGbank = (wg) => dispatch => {
  axios({
    method: 'post',
    url: `${apiPrefix}/admin`,
    data: {
      action: 'saveWGbank',
      data: wg
    }
  }).then((response) => {
    // 
  }).catch(function (error) {
    alert("Нет ответа от сервера");
  });
};
// --------------------------------------------
export const deleteWGbank = (wg) => dispatch => {
  axios({
    method: 'post',
    url: `${apiPrefix}/admin`,
    data: {
      action: 'deleteWGbank',
      data: wg
    }
  }).then((response) => {
    // 
  }).catch(function (error) {
    alert("Нет ответа от сервера");
  });
};
// --------------------------------------------
export const saveCompany = (company) => dispatch => {
  axios({
    method: 'post',
    url: `${apiPrefix}/admin`,
    data: {
      action: 'saveCompany',
      data: company
    }
  }).then((response) => {
    // 
  }).catch(function (error) {
    alert("Нет ответа от сервера");
  });
};
// --------------------------------------------
export const deleteCompany = (company) => dispatch => {
  axios({
    method: 'post',
    url: `${apiPrefix}/admin`,
    data: {
      action: 'deleteCompany',
      data: company
    }
  }).then((response) => {
    // 
  }).catch(function (error) {
    alert("Нет ответа от сервера");
  });
};
// --------------------------------------------
export const saveCompanyToWG = (company) => dispatch => {
  axios({
    method: 'post',
    url: `${apiPrefix}/admin`,
    data: {
      action: 'saveCompanyToWG',
      data: company
    }
  }).then((response) => {
    // 
  }).catch(function (error) {
    alert("Нет ответа от сервера");
  });
};
// --------------------------------------------
export const deleteCompanyToWG = (company) => dispatch => {
  axios({
    method: 'post',
    url: `${apiPrefix}/admin`,
    data: {
      action: 'deleteCompanyToWG',
      data: company
    }
  }).then((response) => {
    // 
  }).catch(function (error) {
    alert("Нет ответа от сервера");
  });
};
// --------------------------------------------
export const saveUserToWG = (user) => dispatch => {
  axios({
    method: 'post',
    url: `${apiPrefix}/admin`,
    data: {
      action: 'saveUserToWG',
      data: user
    }
  }).then((response) => {
    // 
  }).catch(function (error) {
    alert("Нет ответа от сервера");
  });
};
// --------------------------------------------
export const deleteUserToWG = (users) => dispatch => {
  console.log(users);
  axios({
    method: 'post',
    url: `${apiPrefix}/admin`,
    data: {
      action: 'deleteUserToWG',
      data: users
    }
  }).then((response) => {
    // 
  }).catch(function (error) {
    alert("Нет ответа от сервера");
  });
};