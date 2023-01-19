import { combineReducers } from 'redux';
import productReducer from './productReducer';
import userReducer from './userReducer';

const MainReducer = combineReducers({
    userReducer : userReducer,
    productReducer : productReducer
})

export default MainReducer
