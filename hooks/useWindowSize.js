import { useState, useEffect } from 'react';

export default function useWindowSize(initial = null) {
  const [width, setWidth] = useState(initial);

  useEffect(() => {
    // if (!width) {
    //   setWidth(window.innerWidth);
    // }

    const updateWidth = () => setWidth(window.innerWidth);
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return { width };
}
