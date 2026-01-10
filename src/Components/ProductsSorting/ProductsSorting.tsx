import styles from './productsSorting.module.scss';

import { ShowFilterOptionsType } from '@/types/ShowFilterOptionsType';
import { useAppDispatch, useAppSelector } from '@/hooks/ReduxHooks';
import { toggleSorting } from '@/store/slices/filtersOptionsSlice';
import { useMetaData } from '@/queries/useMetaData';

type Props = {
  showOptions: ShowFilterOptionsType;
  setShowOptions: React.Dispatch<React.SetStateAction<ShowFilterOptionsType>>
}

export default function ProductsSorting({showOptions, setShowOptions}: Props): React.JSX.Element {

  const filtersOptions = useAppSelector(state => state.filtersOptions);
  const dispatch = useAppDispatch();

  let sortingItems = null;
  const { data } = useMetaData();

  if(data) {
    const { sorting } = data;
    
    sortingItems = sorting.map(sorting => (
      <label key={sorting} className={filtersOptions.sorting === sorting ? styles.activeLabel : ''}>
        <input type="radio" name="sorting" checked={filtersOptions.sorting === sorting } value={sorting} onChange={onChange}/>{sorting}
      </label>
    ))
  }

  function toggleFieldset() {
    if(document.body.offsetWidth < 500) return;

    setShowOptions( prev => ({
      ...prev,
      sortingFieldset: !prev.sortingFieldset,
    }))
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    dispatch(toggleSorting(value))
  }

  return (
    <div className={`${styles.sorting} ${showOptions.sorting ? '' : styles.hidden}`}>
        <fieldset className={showOptions.sortingFieldset ? '' : styles.hiddenFieldset}>
        <legend className={filtersOptions.sorting ? styles.activeLegend : ''} onClick={toggleFieldset}>Sorting</legend>
        {sortingItems}
      </fieldset>
    </div>   
  )
}