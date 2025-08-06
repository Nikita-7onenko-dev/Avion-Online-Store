import useFilters from '@/Context/FiltersContext';
import styles from './productsSorting.module.scss';

import { FiltersOptionsType } from '@/types/FiltersOptionsType'; 
import { ShowFilterOptionsType } from '@/types/ShowFilterOptionsType';
import { ChangeEvent } from 'react';

type Props = {
  filterOptions: FiltersOptionsType;
  showOptions: ShowFilterOptionsType;
  setShowOptions: React.Dispatch<React.SetStateAction<ShowFilterOptionsType>>
  setFilterOption: React.Dispatch<React.SetStateAction<FiltersOptionsType>>
}

export default function ProductsSorting({filterOptions, showOptions, setShowOptions, setFilterOption}: Props): React.JSX.Element {

  const sorting = useFilters().sorting;

    function toggleFieldset() {
      if(document.body.offsetWidth < 500) return;
        setShowOptions( prev => ({
          ...prev,
          sortingFieldset: !prev.sortingFieldset,
        }))
  }

    function onChange(e: ChangeEvent<HTMLInputElement>) {
      const {name, value} = e.target;
  
      setFilterOption(prev => {
        return {...prev,
          [name]: value
        }
      })
    }

  const sortingItems = sorting.map(sorting => (
    <label key={sorting} className={filterOptions.sorting === sorting ? styles.activeLabel : ''}>
      <input type="radio" name="sorting" checked={filterOptions.sorting === sorting } value={sorting} onChange={onChange}/>{sorting}
    </label>
  ))

  return (
    <div className={`${styles.sorting} ${showOptions.sorting ? '' : styles.hidden}`}>
        <fieldset className={showOptions.sortingFieldset ? '' : styles.hiddenFieldset}>
        <legend className={filterOptions.sorting ? styles.activeLegend : ''} onClick={toggleFieldset}>Sorting</legend>
        {sortingItems}
      </fieldset>
    </div>   
  )
}