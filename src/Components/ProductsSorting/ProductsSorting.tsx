import styles from './productsSorting.module.scss';

import { ShowFilterOptionsType } from '@/types/ShowFilterOptionsType';
import { useFilters } from '@/Context/FiltersContextProvider';

type Props = {
  showOptions: ShowFilterOptionsType;
  setShowOptions: React.Dispatch<React.SetStateAction<ShowFilterOptionsType>>
}

export default function ProductsSorting({showOptions, setShowOptions}: Props): React.JSX.Element {

  const {sorting} = useFilters().filterContext;

  const {filtersOptions, setFiltersOptions} = useFilters();

    function toggleFieldset() {
      if(document.body.offsetWidth < 500) return;

        setShowOptions( prev => ({
          ...prev,
          sortingFieldset: !prev.sortingFieldset,
        }))
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
      const {name, value} = e.target;
      setFiltersOptions(prev => {
        return {...prev,
          [name]: value
        }
      })
    }

  const sortingItems = sorting.map(sorting => (
    <label key={sorting} className={filtersOptions.sorting === sorting ? styles.activeLabel : ''}>
      <input type="radio" name="sorting" checked={filtersOptions.sorting === sorting } value={sorting} onChange={onChange}/>{sorting}
    </label>
  ))

  return (
    <div className={`${styles.sorting} ${showOptions.sorting ? '' : styles.hidden}`}>
        <fieldset className={showOptions.sortingFieldset ? '' : styles.hiddenFieldset}>
        <legend className={filtersOptions.sorting ? styles.activeLegend : ''} onClick={toggleFieldset}>Sorting</legend>
        {sortingItems}
      </fieldset>
    </div>   
  )
}