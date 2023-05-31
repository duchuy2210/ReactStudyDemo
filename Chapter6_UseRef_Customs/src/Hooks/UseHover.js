import { useEffect, useRef, useState } from 'react';

export default function UseHover() {
  const [hover, setHover] = useState(false);
  const nodeRef = useRef(null);
  useEffect(() => {
    function handleMouseOver() {
      setHover(true);
    }
    function handleMouseOut() {
      setHover(false);
    }
    const dom = nodeRef.current;
    if (nodeRef.current) {
      dom.addEventListener('mouseover', handleMouseOver);
      dom.addEventListener('mouseout', handleMouseOut);
    }

    return () => {
      dom.removeEventListener('mouseover', handleMouseOver);
      dom.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);
  return {
    hover,
    nodeRef,
  };
}
