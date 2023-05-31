import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';

const initState = {
  hits: [],
  query: '',
  loading: 'true',
  error: '',
  url: `https://hn.algolia.com/api/v1/search?query=''`,
};
const hackerNewReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, hits: action.payload };
    case 'LOADING':
      return { ...state, loading: action.payload};
    case 'SET_URL':
      return { ...state, url: action.payload };
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      break;
  }
};
const HackerNewReducer = () => {
  const [state, dispatch] = useReducer(hackerNewReducer, initState);
  // const [hits, setHits] = useState([]);
  // const [query, setQuery] = useState('');
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');
  // const [url,setUrl] = useState(`https://hn.algolia.com/api/v1/search?query=${query}`);
  useEffect(() => {
    dispatch({type: 'LOADING', payload: true});
    // setLoading(true);
    async function fetchData() {
      try {
        const data = await axios.get(state.url);
        // setHits(data.data?.hits || []);
        dispatch({ type: 'SET_DATA', payload: data.data?.hits || [] });
        // setLoading(false);
        dispatch({type: 'LOADING', payload: false});
      } catch (error) {
        // setLoading(false);
        dispatch({type: 'LOADING', payload: false});
        dispatch({ type: 'SET_ERROR', payload: `Error happened: ${error.message}`})
        // setError(`Error happened: ${error.message}`);
      }
    }
    fetchData();
  }, [state.url]);
  return (
    <div className="w-2/4 p-5 mx-auto mt-5 mb-5 shadow-xl">
      <div className="flex gap-x-5">
        <input
          type="text"
          className="block w-full p-3 transition-all border rounded-md "
          placeholder="What will you search for?"
          defaultValue={state.query}
          onChange={e => {
            // setQuery(e.target.value);
            dispatch({type: 'SET_QUERY', payload: e.target.value})
          }}
        />
        <button onClick={()=>dispatch({type:'SET_URL',payload:`https://hn.algolia.com/api/v1/search?query=${state.query}`})} className="p-3 font-semibold text-white bg-blue-500 rounded-md w-36">
          Search
        </button>
      </div>
      {state.loading && (
        <div className="mx-auto my-10 w-[30px] h-[30px] rounded-[50%] border-#f3f3f3-500 border-[5px] border-r-[5px] border-t-red-700 animate-spin"></div>
      )}
      {!state.loading && state.error && <h1>{state.error}</h1>}
      {!state.loading && state.hits.length > 0 && (
        <div className="flex flex-wrap gap-5 mt-5">
          {state.hits.map((item, index) => {
            return (
              <h3
                className="p-3 bg-gray-100 rounded-full hover:bg-red-900 hover:text-white hover:cursor-pointer"
                key={index}>
                {item.title}
              </h3>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HackerNewReducer;
