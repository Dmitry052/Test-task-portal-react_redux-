import axios from 'axios';
import { apiPrefix } from './../../../etc/config.json';

export const explMyWG = () => dispatch => {
    axios.get(`${apiPrefix}/expl/myWG`).then((response) => {
      dispatch({
        type: "explMyWG",
        data: response.data
      });
    });
  };

  export const explToMe = () => dispatch => {
    axios.get(`${apiPrefix}/expl/toMe`).then((response) => {
      dispatch({
        type: "explToMe",
        data: response.data
      });
    });
  };

  export const explDoneMe = () => dispatch => {
    axios.get(`${apiPrefix}/expl/doneMe`).then((response) => {
      dispatch({
        type: "explDoneMe",
        data: response.data
      });
    });
  };

  export const explCancelClient = () => dispatch => {
    axios.get(`${apiPrefix}/expl/cancelClient`).then((response) => {
      dispatch({
        type: "explCancelClient",
        data: response.data
      });
    });
  };