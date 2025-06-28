import { createPortal } from 'react-dom';
import { ReactNode, useEffect, useState } from 'react';

const Portal = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return createPortal(children, document.body);
};

export default Portal;
