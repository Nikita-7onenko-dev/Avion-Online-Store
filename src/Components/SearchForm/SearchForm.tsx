import { useNavigate } from 'react-router-dom';
import styles from './searchForm.module.scss'

import { useEffect, useRef, useState } from "react"

export default function SearchForm(): React.JSX.Element {

  const [isShowInput, setIsShowInput] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  function onSearchButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    if(isShowInput && query) {
      navigate(`/allProducts?search=${query}`);
    } else if(!isShowInput) {
      setIsShowInput(true);
    }
  }

  function onTransitionEnd() {
    if(isShowInput) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if(isShowInput && query) {
      navigate(`/allProducts?search=${query}`)
    }
  }

  function blurHandler(e: React.FocusEvent<HTMLInputElement>) {
    setIsShowInput(false);
  }

  function clearQueryButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setQuery('');
  }


  return (
    <form className={`${styles.searchForm} ${isShowInput ? styles.active : ''}`}
      onSubmit={submitHandler}
      onTransitionEnd={onTransitionEnd}
    >
      <button type="button" onMouseDown={onSearchButtonClick}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect width="16" height="16" fill="white"/>
          <path fill="#2A254B" d="M14.5001 13.7929L10.7241 10.0169C11.6314 8.92758 12.0839 7.53038 11.9873 6.11596C11.8908 4.70153 11.2526 3.37879 10.2057 2.42288C9.15867 1.46698 7.78347 0.951515 6.36612 0.983723C4.94877 1.01593 3.5984 1.59333 2.59593 2.59581C1.59345 3.59828 1.01605 4.94865 0.983845 6.366C0.951637 7.78335 1.4671 9.15855 2.423 10.2055C3.37891 11.2525 4.70165 11.8907 6.11608 11.9872C7.5305 12.0838 8.9277 11.6313 10.017 10.7239L13.7931 14.5L14.5001 13.7929ZM2.00012 6.5C2.00012 5.60998 2.26404 4.73995 2.75851 3.99993C3.25297 3.25991 3.95578 2.68313 4.77804 2.34254C5.60031 2.00194 6.50511 1.91283 7.37802 2.08646C8.25094 2.2601 9.05276 2.68868 9.6821 3.31802C10.3114 3.94735 10.74 4.74918 10.9137 5.62209C11.0873 6.495 10.9982 7.3998 10.6576 8.22207C10.317 9.04434 9.7402 9.74714 9.00018 10.2416C8.26016 10.7361 7.39013 11 6.50012 11C5.30705 10.9987 4.16323 10.5241 3.3196 9.68052C2.47597 8.83689 2.00144 7.69306 2.00012 6.5Z" />
        </svg>
      </button>
      <input 
        type="search" 
        onBlur={blurHandler}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        ref={inputRef} 
        value={query}
      />
        {
          query && isShowInput && (
            <button 
              className={styles.clearButton}
              type='button' 
              onMouseDown={clearQueryButtonClick}
            >
              <svg fill="#2A254B" width="16px" height="16px" viewBox="0 0 56.00 56.00" stroke="#2A254B">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.33599999999999997"></g><g id="SVGRepo_iconCarrier"><path d="M 10.0234 43.0234 C 9.2266 43.8203 9.2031 45.1797 10.0234 45.9766 C 10.8438 46.7734 12.1797 46.7734 13.0000 45.9766 L 28.0000 30.9766 L 43.0000 45.9766 C 43.7969 46.7734 45.1563 46.7969 45.9766 45.9766 C 46.7734 45.1562 46.7734 43.8203 45.9766 43.0234 L 30.9531 28.0000 L 45.9766 13.0000 C 46.7734 12.2031 46.7969 10.8437 45.9766 10.0469 C 45.1328 9.2266 43.7969 9.2266 43.0000 10.0469 L 28.0000 25.0469 L 13.0000 10.0469 C 12.1797 9.2266 10.8203 9.2031 10.0234 10.0469 C 9.2266 10.8672 9.2266 12.2031 10.0234 13.0000 L 25.0234 28.0000 Z"></path></g>
              </svg>
            </button>
          )
        }
    </form>
  )
}