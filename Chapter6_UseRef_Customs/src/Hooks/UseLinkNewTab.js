import { useEffect, useRef } from 'react';

export default function UseLinkNewTab() {
  const contentRef = useRef(null);
  useEffect(() => {
    const dom = contentRef.current;
    if (dom) {
      const links = contentRef.current.querySelectorAll("a");
      console.log(links)
      links.length > 0 &&
      links.forEach(link => link.setAttribute('target', '_blank'));
    }
  }, []);
  return {
    contentRef,
  };
}
