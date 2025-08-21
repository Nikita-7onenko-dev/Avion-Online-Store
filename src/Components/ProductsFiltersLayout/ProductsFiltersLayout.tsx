import styles from './productsFiltersLayout.module.scss';

import FilterFieldset from '../FilterFieldset/FilterFieldset';

import { useNavigate } from 'react-router-dom';
import { useProductsAndFilters } from '@/Context/FiltersAndProductsContextProvider';

import {FiltersOptionsType} from '@/types/FiltersOptionsType';
import {ShowFilterOptionsType} from '@/types/ShowFilterOptionsType'


type Props = {
  showOptions: ShowFilterOptionsType;
  setShowOptions: React.Dispatch<React.SetStateAction<ShowFilterOptionsType>>
}


export default function ProductsFiltersLayout({showOptions, setShowOptions}: Props): React.JSX.Element {

  const navigate = useNavigate();

  const {filtersOptions, setFiltersOptions} = useProductsAndFilters();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value, checked} = e.target;

    navigate('/allProducts');

    setFiltersOptions(prev => {
      const prevFilter = prev.filters[name as keyof FiltersOptionsType['filters']] || [];
      const updated = checked ? [...prevFilter, value] : prevFilter.filter((v: string) => v !== value)

      return {
        ...prev,
        filters: {
          ...prev.filters,
          category: [],
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
          filterOptions={filtersOptions}
          onChange={onChange}
        />
        <FilterFieldset 
          filter='priceFilters'
          title='Price Filters'
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          filterOptions={filtersOptions}
          onChange={onChange}
        />
        <FilterFieldset 
          filter='designers'
          title='Designers'
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          filterOptions={filtersOptions}
          onChange={onChange}
        />
    </div>
  )
}