import React, { useEffect } from 'react';

const Header = () => {
  const handleFixedHeader = ()=>{
    console.log("Fixed Header")
  }
  useEffect(() => {
    window.addEventListener("scroll", handleFixedHeader);
    return () => {
      window.removeEventListener("scroll", handleFixedHeader);
    };
  },[])
  return (
    <div className='h-[1500px]'>
      <div className='w-full p-5 bg-black'></div>
    </div>
  );
};

export default Header;