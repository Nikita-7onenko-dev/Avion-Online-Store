import styles from './productsFiltersLayout.module.scss';

import FilterFieldset from '../FilterFieldset/FilterFieldset';
import { useNavigate } from 'react-router-dom';
import {ShowFilterOptionsType} from '@/types/ShowFilterOptionsType'
import { useAppDispatch } from '@/hooks/ReduxHooks';
import { toggleFilters } from '@/store/slices/filtersOptionsSlice';


type Props = {
  showOptions: ShowFilterOptionsType;
  setShowOptions: React.Dispatch<React.SetStateAction<ShowFilterOptionsType>>
}


export default function ProductsFiltersLayout({showOptions, setShowOptions}: Props): React.JSX.Element {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    dispatch(toggleFilters({name: name, value: value}))
    navigate('/allProducts');
  }

  return (
    <div className={`${styles.filtersWrapper} ${showOptions.filters ? '' : styles.hidden}`}>
        <FilterFieldset 
          filter='productTypes'
          title='Product Type'
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          onChange={onChange}
        />
        <FilterFieldset 
          filter='priceFilters'
          title='Price Filters'
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          onChange={onChange}
        />
        <FilterFieldset 
          filter='designers'
          title='Designers'
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          onChange={onChange}
        />
    </div>
  )
}