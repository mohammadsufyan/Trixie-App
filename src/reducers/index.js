// For each function we create a seperate reducer,
// each handling a seperate state.
// All the reducers are imported here, and exported as combineReducers
import { combineReducers } from 'redux';
import appData from './dataReducer'
import InitialiseUserReducer from './InitialiseUserReducer';
import SetLoginStatus from './SetLoginStatus';
import CheckNewUser from './CheckNewUser';
import GetToken from './GetToken';

combineReducers({
  userDetails: InitialiseUserReducer,
  loginStatus: SetLoginStatus,
  newUser: CheckNewUser,
  accessToken: GetToken,
  appData,
});

export default rootReducer