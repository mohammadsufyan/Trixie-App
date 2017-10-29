import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from './action_types';
import * as API from '../API/api';

export const initialiseUser = (userDetails) => {
  return {
    type: 'initUser',
    payload: userDetails
  };
};

export const setLoginStatus = (statusFlag) => {
  return {
    type: 'loginStatus',
    payload: statusFlag,
  };
};

export const checkNewUser = (statusFlag) => {
  return {
    type: 'newUser',
    payload: statusFlag,
  };
};

export const getToken = (accessToken) => {
  return {
    type: 'accessToken',
    payload: accessToken,
  };
};



export function getData() {
  return {
    type: FETCHING_DATA,
  }
}

export function getDataSuccess(data) {
  return {
    type: FETCHING_DATA_SUCCESS,
    data,
  }
}

export function getDataFailure() {
  return {
    type: FETCHING_DATA_FAILURE,
  }
}

export function fetchData() {
  return (dispatch, getState) => {
    dispatch(getData())
    API.getAPI()
      .then((data) => {
        dispatch(getDataSuccess(data))
      })
      .catch((err) => console.log('===>> action err:', err))
  }
}