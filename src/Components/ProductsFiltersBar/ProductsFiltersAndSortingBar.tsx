import FiltersAndSortingList from '../FiltersAndSortingList/FiltersAndSortingList';
import FiltersControls from '../FiltersControls/FiltersControls';

import { FiltersOptionsType } from '@/types/FiltersOptionsType';
import { ShowFilterOptionsType } from '@/types/ShowFilterOptionsType';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  setFilterOption: React.Dispatch<React.SetStateAction<FiltersOptionsType>>;
  filterOptions: FiltersOptionsType;
}

export default function ProductFiltersBar({setFilterOption, filterOptions}: Props): React.JSX.Element {

  const [ShowOptions, setShowOptions] = useState<ShowFilterOptionsType>({
    filters: false,
    sorting: false,
    sortingFieldset: true,
    productType: true,
    priceFilters: true,
    designers: true
  });

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
    setFilterOption({
      filters: {
        productType: [],
        category: [],
        designers: [],
        priceFilters: [],
      },
      sorting: '',
      search: ''
    })
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
        filterOptions={filterOptions}
        setFilterOption={setFilterOption}
        showOptions={ShowOptions}
        setShowOptions={setShowOptions}
        resetFilters={resetFilters}
      />
      </FiltersControls>
    </>
  )
}