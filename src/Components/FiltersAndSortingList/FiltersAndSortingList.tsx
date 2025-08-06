import styles from './filtersAndSortingList.module.scss';

import ProductsFiltersLayout from '../ProductsFiltersLayout/ProductsFiltersLayout';
import ProductsSorting from '../ProductsSorting/ProductsSorting';

import { FiltersOptionsType } from '@/types/FiltersOptionsType';
import { ShowFilterOptionsType } from '@/types/ShowFilterOptionsType';

type Props = {
  filterOptions: FiltersOptionsType;
  showOptions: ShowFilterOptionsType;
  setShowOptions: React.Dispatch<React.SetStateAction<ShowFilterOptionsType>>;
  setFilterOption: React.Dispatch<React.SetStateAction<FiltersOptionsType>>;
  resetFilters: React.MouseEventHandler<HTMLButtonElement>;
}

export default function FiltersAndSortingList({
  filterOptions,
  showOptions, 
  setShowOptions, 
  setFilterOption,
  resetFilters
}: Props): React.JSX.Element {


  return (
      <div className={`${styles.filtersAndSortingList} ${(showOptions.filters || showOptions.sorting) ? styles.active : '' }`}>
        <button onClick={resetFilters} className='globalButton' style={{height: "30px"}}>Reset</button>
        <ProductsSorting filterOptions={filterOptions} showOptions={showOptions} setShowOptions={setShowOptions} setFilterOption={setFilterOption} />
        <ProductsFiltersLayout filterOptions={filterOptions} showOptions={showOptions} setShowOptions={setShowOptions} setFilterOption={setFilterOption} />
      </div>

  )
}