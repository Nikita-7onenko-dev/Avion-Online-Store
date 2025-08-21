import styles from './filtersAndSortingList.module.scss';

import ProductsFiltersLayout from '../ProductsFiltersLayout/ProductsFiltersLayout';
import ProductsSorting from '../ProductsSorting/ProductsSorting';
import { ShowFilterOptionsType } from '@/types/ShowFilterOptionsType';

type Props = {
  showOptions: ShowFilterOptionsType;
  setShowOptions: React.Dispatch<React.SetStateAction<ShowFilterOptionsType>>;
  resetFilters: React.MouseEventHandler<HTMLButtonElement>;
}

export default function FiltersAndSortingList({
  showOptions, 
  setShowOptions, 
  resetFilters
}: Props): React.JSX.Element {

  return (
      <div className={`${styles.filtersAndSortingList} ${(showOptions.filters || showOptions.sorting) ? styles.active : '' }`}>
        <button onClick={resetFilters} className='globalLink' style={{height: "30px"}}>Reset Filters</button>
        <ProductsSorting showOptions={showOptions} setShowOptions={setShowOptions} />
        <ProductsFiltersLayout showOptions={showOptions} setShowOptions={setShowOptions} />
      </div>

  )
}