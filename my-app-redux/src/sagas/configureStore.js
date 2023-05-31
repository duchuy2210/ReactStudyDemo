import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './rootSaga';

// create the saga middleware
// const sagaMiddleware = createSagaMiddleware();

// Đưa các phần tử vào store lưu trử như reducer, middleware
export const store = configureStore({
  reducer: reducer,
  //SỬ DỤNG SAGA
  // middleware: gDM => gDM().concat(logger, sagaMiddleware),

  //SỬ DỤNG THUNK
  middleware: gDM => gDM().concat(logger),
});
// sagaMiddleware.run(rootSaga);
