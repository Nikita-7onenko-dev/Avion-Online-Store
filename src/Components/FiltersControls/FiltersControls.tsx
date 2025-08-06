import styles from './filtersControls.module.scss';

import { ShowFilterOptionsType } from '@/types/ShowFilterOptionsType';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  showFiltersClick: React.MouseEventHandler<HTMLButtonElement>;
  showSortingClick: React.MouseEventHandler<HTMLButtonElement>;
  showOptions : ShowFilterOptionsType;
  resetFilters: React.MouseEventHandler<HTMLButtonElement>;
}

export default function FiltersControls({
  children, 
  showFiltersClick, 
  showSortingClick, 
  showOptions,
  resetFilters
}: Props): React.JSX.Element {


  return (
    <>
      <div className={styles.filtersControls}>
        <button
          onClick={showFiltersClick}
        >
          Filters
          <svg className={`${showOptions.filters && styles.svgRotate}`}  width="17" height="16" viewBox="0 0 17 16" fill="none">
            <rect width="16" height="16" transform="scale(1.5)"/>
            <path d="M12.5 6L8.5 11L4.5 6H12.5Z" fill="#2A254B" />
          </svg>
        </button>
        <button
          onClick={showSortingClick}
        >
          Sorting
          <svg className={`${showOptions.sorting && styles.svgRotate}`}  width="17" height="16" viewBox="0 0 17 16" fill="none">
            <rect width="16" height="16" transform="scale(1.5)"/>
            <path d="M12.5 6L8.5 11L4.5 6H12.5Z" fill="#2A254B" />
          </svg>
        </button>
      </div>
        {children}
        <button className={styles.resetButton} onClick={resetFilters}>Reset Filters</button>
    </>
  )
}