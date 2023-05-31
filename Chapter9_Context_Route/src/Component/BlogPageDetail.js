import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BlogPageDetail = () => {
  const slug = useParams()
  const navigate = useNavigate()
  return (
    <div>
      Blog Detail Page
      <button onClick={()=>navigate('/')} className='p-5 bg-blue-500 rounded-lg text-white'>To HomePage</button>
    </div>
  );
};

export default BlogPageDetail;