import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import requestGetNews from '../sagas/news/request';
import { handleFetchNew } from './handler';

const setLoading = createAction('setLoading');

const initialState = {
  hits: [],
  isLoading: true,
  errorMessage: '',
  query: '',
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setIsLoading: (state, action) => ({
      ...state,
      isLoading: action.payload,
    }),
    setQuery: (state, action) => ({
      ...state,
      query: action.payload,
    }),
  },
  extraReducers: builder => {
    //KHI GỌI THUNK HANDLE FETCH NEW THÀNH CÔNG THÌ HANDLE NHỮNG VIỆC GỌI BÊN TRONG
    builder
      .addCase(handleFetchNew.fulfilled, (state, action) => {
        state.hits = action.payload;
        state.isLoading = false;
      })
      .addCase(handleFetchNew.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(handleFetchNew.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(setLoading,(state, action) => {
        state.isLoading = action.payload;
      });
  },
});
export const {setIsLoading, setQuery} =
  newsSlice.actions;
export default newsSlice.reducer;
//KHI DÙNG THUNK THÌ CÓ THỂ SỮA TRỰC TIẾP TỪ STATE KH CẦN PHẢI ...STATE NHƯ REDUX SAGA