//WORKER SAGA IN DOCUMENT OF SAGA
//-> Handler call a function to make the request(handleGetNews
import {call,put} from 'redux-saga/effects'
import { getNews, setIsLoading, setNews } from './newSlice'
import requestGetNews from './request'

export default function* handleGetNews(action){
  try {
    yield put(setIsLoading(true))
    //Call requestGetNews: Gọi function request api có thêm tham số thứ 2 là tham số truyền vào cho function request
    const response = yield call(requestGetNews, action.payload)
    const {hits} = response.data
    //Call requestGetNews
    yield put(setNews(hits))
    yield put(setIsLoading(false))
  } catch (e) {
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}