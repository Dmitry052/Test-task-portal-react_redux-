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
      axios({ method: 'get', url: `${apiPrefix}/admin`, params: { action: 'wg', } }).then((response) => {
        dispatch({
          type: "WG_ADMIN",
          data: response.data
        });
      }).catch(function (error) {
        alert("Нет ответа от сервера");
      });
      axios({ method: 'get', url: `${apiPrefix}/admin`, params: { action: 'companytowg', } }).then((response) => {
        dispatch({
          type: "CONF_COMPANY_TOWG_ADMIN",
          data: response.data
        });
      }).catch(function (error) {
        alert("Нет ответа от сервера");
      });
      axios({ method: 'get', url: `${apiPrefix}/admin`, params: { action: 'wgbank', } }).then((response) => {
        dispatch({
          type: "WGBANK_ADMIN",
          data: response.data
        });
      }).catch(function (error) {
        alert("Нет ответа от сервера.WGBANK_ADMIN");
      });
      break;
    // -----------------------------------
    case 'wgbank':
      axios({ method: 'get', url: `${apiPrefix}/admin`, params: { action: 'wgbank', } }).then((response) => {
        dispatch({
          type: "WGBANK_ADMIN",
          data: response.data
        });
      }).catch(function (error) {
        alert("Нет ответа от сервера");
      });
      break;
    // -----------------------------------
    case 'usertowg':

      axios({ method: 'get', url: `${apiPrefix}/admin`, params: { action: 'users', } }).then((response) => {
        dispatch({
          type: "USERS_ADMIN",
          data: response.data
        });
      }).catch(function (error) {
        alert("Нет ответа от сервера.USERS_ADMIN");
      });
      axios({ method: 'get', url: `${apiPrefix}/admin`, params: { action: 'usertowg', } }).then((response) => {
        dispatch({
          type: "CONF_USER_TOWG_ADMIN",
          data: response.data
        });
      }).catch(function (error) {
        alert("Нет ответа от сервера");
      });
      axios({ method: 'get', url: `${apiPrefix}/admin`, params: { action: 'wg', } }).then((response) => {
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
// Вытаскиваем группы в которых состоит user
export const usergroups = (user_id) => dispatch => {
  axios({
    method: 'get',
    url: `${apiPrefix}/admin`,
    params: {
      action: 'usergroups',
      data: user_id
    }
  }).then((response) => {
    console.log('ответ', response.data);
    dispatch({ type: 'SET_USER_GROUPS_USER_ADMIN', data: response.data })
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
// Сохраняем рабочую группу и связку Компания - РГ
export const saveWG = (wg) => dispatch => {
  axios({ method: 'post', url: `${apiPrefix}/admin`, data: { action: 'saveWG', data: wg.wg_name } }).then((response) => {
    // 
  }).catch(function (error) {
    alert("Нет ответа от сервера");
  });
  axios({ method: 'get', url: `${apiPrefix}/admin`, params: { action: 'getIDwg', data: wg.wg_name.name } }).then((response) => {
    // console.log(wg.wg_name.type, response.data[0].id, wg.wg_name.company_id);
    axios({
      method: 'post', url: `${apiPrefix}/admin`,
      data: {
        action: 'saveCompanyToWG',
        data: {
          type: wg.wg_name.type,
          wg_id: response.data[0].id,
          company_id: wg.wg_name.company_id
        }
      }
    }).then((response) => {
      // console.log("good write");
    }).catch(function (error) { alert("Нет ответа от сервера"); });
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
// Сохраняем рабочую группу и связку Компания - РГ NEW
export const saveCompanyToWG = (company) => dispatch => {
  if (company.type === 'INSERT') {
    axios({ method: 'post', url: `${apiPrefix}/admin`, data: { action: 'saveWG', data: company } }).then((response) => {
    }).catch(function (error) { alert("Нет ответа от сервера.saveWG"); });
    axios({
      method: 'get', url: `${apiPrefix}/admin`,
      params: {
        action: 'getIDwg',
        data: company.wg_name
      }
    }).then((response) => {
      axios({
        method: 'post', url: `${apiPrefix}/admin`,
        data: {
          action: 'saveCompanyToWG',
          data: {
            type: company.type,
            wg_id: response.data[0].id,
            bank_wg_id: company.bank_wg_id,
            company_id: company.company_id
          }
        }
      }).then((response) => {
      }).catch((error) => { alert("Нет ответа от сервера"); });
    }).catch((error) => { alert("Нет ответа от сервера 1"); });
  }
  else {
    axios({
      method: 'post', url: `${apiPrefix}/admin`,
      data: {
        action: 'saveCompanyToWG',
        data: {
          type: company.type,
          id: company.id,
          wg_id: company.wg_id,
          bank_wg_id: company.bank_wg_id,
          company_id: company.company_id
        }
      }
    }).then((response) => { }).catch((error) => { alert("Нет ответа от сервера"); });
  }
  // console.log(company);
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
// --------------------------------------------
export const wgincomapny = (company) => dispatch => {
  axios({ method: 'get', url: `${apiPrefix}/admin`, params: { action: 'wgincomapny', data: company } }).then((response) => {
    dispatch({ type: 'SET_LIST_WG_USER_TO_WG_ADMIN', data: response.data });
    dispatch({ type: 'SET_COMP_LIST_TO_WG_ADMIN', data: response.data });
  }).catch(function (error) {
    alert("Нет ответа от сервера");
  });
};
// --------------------------------------------
export const userinwg = (wg) => dispatch => {
  axios({
    method: 'get',
    url: `${apiPrefix}/admin`,
    params: {
      action: 'userinwg',
      data: wg
    }
  }).then((response) => {
    dispatch({ type: 'SET_LIST_USERS_USER_TO_WG_ADMIN', data: response.data })
  }).catch(function (error) {
    alert("Нет ответа от сервера");
  });
};
// --------------------------------------------
export const stName = (company) => dispatch => {
  axios({
    method: 'get',
    url: `${apiPrefix}/admin`,
    params: {
      action: 'service_type_name',
      data: company
    }
  }).then((response) => {
    dispatch({ type: 'SET_ST_NAME_USER_TO_WG_ADMIN', data: response.data })
  }).catch(function (error) {
    alert("Нет ответа от сервера");
  });
}; 
