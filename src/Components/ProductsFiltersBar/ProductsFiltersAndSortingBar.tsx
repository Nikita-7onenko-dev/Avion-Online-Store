import FiltersAndSortingList from '../FiltersAndSortingList/FiltersAndSortingList';
import FiltersControls from '../FiltersControls/FiltersControls';

import { ShowFilterOptionsType } from '@/types/ShowFilterOptionsType';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/ReduxHooks';
import { resetFiltersAction } from '@/store/slices/filtersOptionsSlice';

export default function ProductFiltersBar(): React.JSX.Element {

  const [ShowOptions, setShowOptions] = useState<ShowFilterOptionsType>({
    filters: false,
    sorting: false,
    sortingFieldset: true,
    productTypes: true,
    priceFilters: true,
    designers: true
  });

  const dispatch = useAppDispatch();

  const navigate = useNavigate()

  function showFiltersClick() {
    setShowOptions(prev => ({
      ...prev,
      filters: !prev.filters,
      sorting: false,
    }))
  }

  function showSortingClick() {
    setShowOptions(prev => ({
      ...prev,
      filters: false,
      sorting: !prev.sorting
    }))
  }

  function resetFilters() {
    navigate('/allProducts')
    dispatch(resetFiltersAction())
  }

  return (
    <>
      <FiltersControls
        showFiltersClick={showFiltersClick}
        showSortingClick={showSortingClick}
        showOptions={ShowOptions}
        resetFilters={resetFilters}
      >
        <FiltersAndSortingList 
        showOptions={ShowOptions}
        setShowOptions={setShowOptions}
        resetFilters={resetFilters}
      />
      </FiltersControls>
    </>
  )
}