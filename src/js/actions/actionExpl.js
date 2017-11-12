import axios from 'axios';
import { apiPrefix } from './../../../etc/config.json';

export const explMyWG = () => dispatch => {
  axios({
    method: 'get',
    url: `${apiPrefix}/expl`,
    params: {
      action: 'myWG',
    }
  }).then((response) => {
    dispatch({
      type: "explMyWG",
      data: response.data
    });
  });
};
export const explToMe = () => dispatch => {
  axios({
    method: 'get',
    url: `${apiPrefix}/expl`,
    params: {
      action: 'toMe',
    }
  }).then((response) => {
    dispatch({
      type: "explToMe",
      data: response.data
    });
  });
};
export const explDoneMe = () => dispatch => {
  axios({
    method: 'get',
    url:`${apiPrefix}/expl`,
    params: {
      action: 'doneMe',
    }
  }).then((response) => {
    dispatch({
      type: "explDoneMe",
      data: response.data
    });
  });
};
export const explCancelClient = () => dispatch => {
  axios({
    method: 'get',
    url:`${apiPrefix}/expl`,
    params: {
      action: 'cancelClient',
    }
  }).then((response) => {
    dispatch({
      type: "explCancelClient",
      data: response.data
    });
  });
};