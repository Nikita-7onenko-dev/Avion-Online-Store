import { useEffect, useState } from "react";

export function LoadingDots() {

  const [dots, setDots] = useState<string>('');

  useEffect(() => {
    const intervalId = setInterval(
      () => setDots(prev => prev.length >=3 ? '' : prev + '.'),
      500
    );

    return () => clearInterval(intervalId);
  }, []);

  return (
    <span style={{fontSize: '20px'}}>Loading{dots}</span>
  )
}