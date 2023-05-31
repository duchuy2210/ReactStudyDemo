import { takeEvery, takeLatest } from "redux-saga/effects";
import handleGetNews from "./handler";
import { getNews } from "./newSlice";

// Watches Saga to catch the action
export default function* newsSaga() {
  //takeLatest: Nếu call api 10 lần thì sẽ lấy cái cuối cùng cho dù 9 cái đầu chạy chưa xong
  //takeEvery: Lấy hết cả 10
  yield takeLatest(getNews.type, handleGetNews)
}