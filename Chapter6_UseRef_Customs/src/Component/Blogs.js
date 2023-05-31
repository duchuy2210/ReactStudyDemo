import React, { useEffect, useRef } from 'react';
import UseHover from '../Hooks/UseHover';
import UseLinkNewTab from '../Hooks/UseLinkNewTab';

const Blogs = () => {
  // const {contentRef} = UseLinkNewTab();
  const contentRef = useRef(null);
  useEffect(() => {
    if (contentRef.current) {
      const links = contentRef.current.querySelectorAll('a');
      links.length > 0 &&
        links.forEach(link => link.setAttribute('target', '_blank'));
    }
  }, []);
  const { hover, nodeRef } = UseHover();
  return (
    <div>
      <div className='abc' ref={contentRef}>
        <p className="mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non itaque a
          consequatur quaerat illum, voluptatibus alias doloribus vel quod,
          suscipit eius error sapiente voluptatem sunt dicta eaque nesciunt
          repellendus sequi
          <a
            className={`underline ${hover ? 'text-red-500' : ''}`}
            href="https://www.google.com.vn/?hl=vi"
            ref={nodeRef}>
            google.com
          </a>
          ?
        </p>
        <p className="mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non itaque a
          consequatur quaerat illum, voluptatibus alias doloribus vel quod,
          suscipit eius error sapiente voluptatem sunt dicta eaque nesciunt
          repellendus sequi
          <a className="underline" href="https://www.google.com.vn/?hl=vi">
            google.com
          </a>
          ?
        </p>
      </div>
    </div>
  );
};

export default Blogs;
