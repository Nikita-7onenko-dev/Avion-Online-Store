import styles from './filterFieldset.module.scss'


import useFilters from '@/Context/FiltersContext';

import { ShowFilterOptionsType } from '@/types/ShowFilterOptionsType';
import { FiltersOptionsType } from '@/types/FiltersOptionsType';
import { SetStateAction } from 'react';

type Props = {
  filter: 'productType' | 'priceFilters' | 'designers';
  title: string;
  showOptions: ShowFilterOptionsType;
  setShowOptions: React.Dispatch<SetStateAction<ShowFilterOptionsType>>
  filterOptions: FiltersOptionsType;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function FilterFieldset({
  filter, 
  title, 
  showOptions, 
  setShowOptions, 
  filterOptions, 
  onChange
}: Props): React.JSX.Element{


  function toggleFieldset() {
    if(document.body.offsetWidth < 500) return;
    setShowOptions( prev => ({
      ...prev,
      [filter]: !prev[filter],
    }))
  }


  const filterNames = useFilters()[filter];

  const filterItems = filterNames.map(filterName => (
    <label key={filterName} className={filterOptions.filters[filter].includes(filterName) ? styles.activeLabel : ''}>
      <input type="checkbox" checked={filterOptions.filters[filter].includes(filterName)} value={filterName} name={filter} onChange={onChange}/>
      {filterName}
    </label>
  ))

  
  return (
     <fieldset className={`${showOptions[filter] ? '' : styles.hiddenFieldset} ${styles.filterFieldset}`}>
        <legend
          className={filterOptions.filters[filter].length > 0 ? styles.activeLegend : ''}
          onClick={() =>toggleFieldset()}
        >
          {title}
        </legend>
          {filterItems}
      </fieldset>
  )
}