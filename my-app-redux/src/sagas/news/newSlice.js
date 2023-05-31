import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hits: [],
  isLoading: true,
  errorMessage: '',
  query: '',
};

const newSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews: (state, action) => ({
      ...state,
      hits: action.payload,
    }),
    //Redux action dispatched from component(getNews)
    getNews: () => {},
    setIsLoading: (state, action) => ({
      ...state,
      isLoading: action.payload,
    }),
    setQuery: (state, action) => ({
      ...state,
      query: action.payload,
    }),
    setErrorMessage: (state, action) => ({
      ...state,
      errorMessage: action.payload,
    }),
  },
});

export const { setNews, getNews, setIsLoading, setErrorMessage, setQuery } =
  newSlice.actions;

export default newSlice.reducer;
