import { combineReducers } from 'redux'
import appData from './dataReducer'
import userData from './userData'

const rootReducer = combineReducers({
    appData,
    userData
})

export default rootReducer