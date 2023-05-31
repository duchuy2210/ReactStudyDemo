import { createAsyncThunk } from "@reduxjs/toolkit";
import requestGetNews from "../sagas/news/request";

//HANDLE CREATE THUNK REDUX to FETCH DATA
export const handleFetchNew = createAsyncThunk(
  'news/handleFetchNew',
  async (query, thunkAPI) => {
    const response = await requestGetNews(query);
    return response.data.hits;
  }
);
