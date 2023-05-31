import React, { useEffect, useState } from 'react';
import axios from 'axios';
import lodash from 'lodash';

const HackerNew = () => {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [url,setUrl] = useState(`https://hn.algolia.com/api/v1/search?query=${query}`);
  // const handleSearch = lodash.debounce(e => {
  //   setQuery(e.target.value);
  // }, 500);
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const data = await axios.get(url);
        setHits(data.data?.hits || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(`Error happened: ${error.message}`);
      }
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  return (
    <div className="w-2/4 p-5 mx-auto mt-5 mb-5 shadow-xl">
      <div className="flex gap-x-5">
        <input
          type="text"
          className="block w-full p-3 transition-all border rounded-md "
          placeholder="What will you search for?"
          defaultValue={query}
          // onChange={handleSearch}
          onChange={e => {
            setQuery(e.target.value);
          }}
        />
        <button onClick={()=>setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)} className="p-3 font-semibold text-white bg-blue-500 rounded-md w-36">
          Search
        </button>
      </div>
      {loading && (
        <div className="mx-auto my-10 w-[30px] h-[30px] rounded-[50%] border-#f3f3f3-500 border-[5px] border-r-[5px] border-t-red-700 animate-spin"></div>
      )}
      {!loading && error && <h1>{error}</h1>}
      {!loading && hits.length > 0 && (
        <div className="flex flex-wrap gap-5 mt-5">
          {hits.map((item, index) => {
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

export default HackerNew;
