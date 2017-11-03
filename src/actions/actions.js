import { 
  FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE,
  FETCHING_USER_DATA, FETCHING_USER_DATA_SUCCESS, FETCHING_USER_DATA_FAILURE,



} from './action_types';
import * as API from '../API/api';

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

export function fetchingUserData() {
  return {
    type: FETCHING_USER_DATA,
  }
}

export function fetchingUserDataSuccess(data) {
  return {
    type: FETCHING_USER_DATA_SUCCESS,
    data,
  }
}

export function fetchingUserDataFailure(error) {
  return {
    type: FETCHING_USER_DATA_FAILURE,
    error
  }
}

export function fetchData() {
  return (dispatch, getState) => {
    dispatch(getData())
    API.getAPI('https://itunes.apple.com/us/rss/topfreeapplications/limit=2/json')
      .then((data) => {
        dispatch(getDataSuccess(data))
      })
      .catch((err) => console.log('===>> action err:', err))
  }
}

export function getUser(facebook_id) {
  return (dispatch, getState) => {
    dispatch(fetchingUserData());
    API.getAPI(`/api/trixie/users/${facebook_id}`)
      .then((data) => {
        dispatch(fetchingUserDataSuccess(data))
      })
      .catch((err) => dispatch(fetchingUserDataFailure(err)))
  }
}

export function createNewUser(user) {
  return (dispatch, getState) => {
    API.postAPI('/api/trixie/users', user)
      .then((data) => {
        dispatch(getDataSuccess(data))
      })
      .catch((err) => console.log('===>> action err:', err))
  }
}

export function updateUser(user) {
  return (dispatch, getState) => {
    API.putAPI(`/api/trixie/users/${user.fbID}`, user)
      .then((data) => {
        dispatch(getDataSuccess(data))
      })
      .catch((err) => console.log('===>> action err:', err))
  }
}

export function getMatchedUser(user) {
  return (dispatch, getState) => {
    API.getAPI(`/api/trixie/users/${user.fbID}/matches`)
      .then((data) => {
        dispatch(getDataSuccess(data))
      })
      .catch((err) => console.log('===>> action err:', err))
  }
}

export function likeUser(user, likedUserID) {
  const likedUser = {
    userId: likedUserID
  }
  return (dispatch, getState) => {
    API.postAPI(`/api/trixie/users/${user.fbID}/likes`, likedUser)
      .then((data) => {
        dispatch(getDataSuccess(data))
      })
      .catch((err) => console.log('===>> action err:', err))
  }
}

export function dislikeUser(user, likedUserID) {
  const likedUser = {
    userId: likedUserID
  }
  return (dispatch, getState) => {
    API.postAPI(`/api/trixie/users/${user.fbID}/dislikes`, likedUser)
      .then((data) => {
        dispatch(getDataSuccess(data))
      })
      .catch((err) => console.log('===>> action err:', err))
  }
}

export function freeToMeet(user) {
  return (dispatch, getState) => {
    API.postAPI(`/api/trixie/users/${user.fbID}/ftm`, { enabled: true })
      .then((data) => {
        dispatch(getDataSuccess(data))
      })
      .catch((err) => console.log('===>> action err:', err))
  }
}

export function getPinsFromPintrest(pintrest_token) {
  return (dispatch, getState) => {
    API.getAPI(`/api/trixie/pins?token=${pintrest_token}`)
      .then((data) => {
        dispatch(getDataSuccess(data))
      })
      .catch((err) => console.log('===>> action err:', err))
  }
}
