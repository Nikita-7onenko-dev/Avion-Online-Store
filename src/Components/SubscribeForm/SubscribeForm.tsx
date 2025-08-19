import styles from './subscribeForm.module.scss'
import { useRef, useEffect, useState } from 'react';


export default function SubscribeForm(): React.JSX.Element {

  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [gap, setGap] = useState(false)

  useEffect(() => {
    if(!buttonRef.current) return;
    
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      setGap(width > 200)
    })

    observer.observe(buttonRef?.current);

    return () => observer.disconnect();
  }, [])
  
  return (
    <form style={gap ? {gap: '30px'} : {}} className={styles.subscribeForm}>
      <input 

        type="email"
        name="email"
        placeholder="your@email.com"
      />
      <button ref={buttonRef} type='button' className='globalButton'>Sign up</button>
    </form>
  )
}