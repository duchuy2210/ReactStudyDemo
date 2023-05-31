import React, { useEffect } from 'react';
import HackerNews from './components/HackerNews';

//redux saga architecture
const App = () => {
  // const dispatch = useDispatch()
  // useEffect(()=>{
  //   dispatch(getNews());
  // },[dispatch])
  return (
    <div>
      <HackerNews></HackerNews>
    </div>
  );
};

export default App;