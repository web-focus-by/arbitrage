import { useEffect, useState } from 'react';

const useWindow = () => {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(() => ({ width: window.innerWidth, height: window.innerHeight }));
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return { windowSize };
};

export default useWindow;
