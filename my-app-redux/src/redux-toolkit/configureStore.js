import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import globalSlice from './globalSlice';
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

const reducer = combineReducers({
  counter: counterSlice,
  global: globalSlice,
});

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

//MIDDLEWARE REDUX --> Logger
//KHI ĐI LÀM NÊN SỬ DỤNG MIDDLEWARE PHỔ BIẾN HƠN TỰ CUSTOMS LOGGER --> Redux logger
const loggerMiddleware = store => next => action => {
  console.log(action);

  //CÓ THỂ GHI ĐÈ LẠI PAYLOAD KHI THỰC HIỆN ACTION
  // action.payload = 20;
  // delete action.payload;

  //KHI THỰC HIỆN XONG CHẠY QUA ACTION KHÁC, next có thể giúp chạy qua 1 cái yield khác trong generator function
  next(action);
};

// Đưa các phần tử vào store lưu trử như reducer, middleware
export const store = configureStore({
  reducer,
  middleware:(gDM) => gDM().concat(logger,sagaMiddleware),
});
// sagaMiddleware.run(mySaga)
//JAVASCRIPT OBSERVER PATTERN -> KHI GỌI DISPATCH() THÌ SẼ CHẠY VÀO ĐÂY RỒI MỚI THỰC HIỆN ACTION
// store.subscribe(() => {
//   console.log(`current state: ${store.getState().counter.count}`);
// });
