import { combineReducers } from '@reduxjs/toolkit';
import newsSlice from '../redux-thunk/newsSlice';
// import newSlice from './news/newSlice';


const reducer = combineReducers({
  news: newsSlice,
});

export default reducer;