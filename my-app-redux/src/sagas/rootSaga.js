import { all, fork } from 'redux-saga/effects';
import newsSaga from './news/saga';

//WATCHES SAGA
export default function* rootSaga() {
  //dùng fork vì các saga kh cần phải đợi chạy liên tiếp
  yield all([fork(newsSaga)]);
}

/*
  blocking: call, put -> Khi chạy 1 luồng nếu chạy tới blocking function thì phải đợi function đó chạy xong rồi mới đc chạy
  non-blocking: fork -> ngược lại blocking function
  all: nhận vào 1 mảng tất cả các saga
*/