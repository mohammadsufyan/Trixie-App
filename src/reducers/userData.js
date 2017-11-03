import { FETCHING_USER_DATA, FETCHING_USER_DATA_SUCCESS, FETCHING_USER_DATA_FAILURE } from '../actions/action_types'
const initialState = {
  user: {},
  isFetching: false,
  error: false
}

export default function userData (state = initialState, action) {
  switch (action.type) {
    case FETCHING_USER_DATA:
      return {
        ...state,
        isFetching: true,
        error: false,
      }
    case FETCHING_USER_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.data
      }
    case FETCHING_USER_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}