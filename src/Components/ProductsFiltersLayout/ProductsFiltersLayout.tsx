import styles from './productsFiltersLayout.module.scss';

import {FiltersOptionsType} from '@/types/FiltersOptionsType';
import {ShowFilterOptionsType} from '@/types/ShowFilterOptionsType'

import FilterFieldset from '../FilterFieldset/FilterFieldset';

type Props = {
  filterOptions: FiltersOptionsType;
  showOptions: ShowFilterOptionsType;
  setShowOptions: React.Dispatch<React.SetStateAction<ShowFilterOptionsType>>
  setFilterOption: React.Dispatch<React.SetStateAction<FiltersOptionsType>>;
}


export default function ProductsFiltersLayout({
  filterOptions, 
  showOptions, 
  setShowOptions, 
  setFilterOption
}: Props): React.JSX.Element {


  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value, checked} = e.target;

    setFilterOption(prev => {
      const prevFilter = prev.filters[name as keyof FiltersOptionsType['filters']] || [];
      const updated = checked ? [...prevFilter, value] : prevFilter.filter((v: string) => v !== value)

      return {...prev,
              filters: {
                ...prev.filters,
                [name]: updated
              }     
      }
    })
  }


  return (
    <div className={`${styles.filtersWrapper} ${showOptions.filters ? '' : styles.hidden}`}>
        <FilterFieldset 
          filter='productType'
          title='Product Type'
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          filterOptions={filterOptions}
          onChange={onChange}
        />
        <FilterFieldset 
          filter='priceFilters'
          title='Price Filters'
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          filterOptions={filterOptions}
          onChange={onChange}
        />
        <FilterFieldset 
          filter='designers'
          title='Designers'
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          filterOptions={filterOptions}
          onChange={onChange}
        />
    </div>
  )
}