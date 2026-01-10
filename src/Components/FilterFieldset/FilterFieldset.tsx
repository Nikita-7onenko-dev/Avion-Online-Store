import styles from './filterFieldset.module.scss'
import { ShowFilterOptionsType } from '@/types/ShowFilterOptionsType';
import { useAppSelector } from '@/hooks/ReduxHooks';
import { useMetaData } from '@/queries/useMetaData';

type Props = {
  filter: 'productTypes' | 'priceFilters' | 'designers';
  title: string;
  showOptions: ShowFilterOptionsType;
  setShowOptions: React.Dispatch<React.SetStateAction<ShowFilterOptionsType>>
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function FilterFieldset({
  filter, 
  title, 
  showOptions, 
  setShowOptions, 
  onChange
}: Props): React.JSX.Element{

  const filtersOptions = useAppSelector(state => state.filtersOptions);
  const { data } = useMetaData();
  let filterItems = null;

  if(data) {
    const filterNames = data[filter]

    filterItems = filterNames.map(filterName => (
      <label key={filterName} className={filtersOptions.filters[filter].includes(filterName) ? styles.activeLabel : ''}>
        <input type="checkbox" checked={filtersOptions.filters[filter].includes(filterName)} value={filterName} name={filter} onChange={onChange}/>
        {filterName}
      </label>
    ))
  }

  function toggleFieldset() {
    if(document.body.offsetWidth < 500) return;
    setShowOptions( prev => ({
      ...prev,
      [filter]: !prev[filter],
    }))
  }
  
  return (
     <fieldset className={`${showOptions[filter] ? '' : styles.hiddenFieldset} ${styles.filterFieldset}`}>
        <legend
          className={filtersOptions.filters[filter].length > 0 ? styles.activeLegend : ''}
          onClick={() =>toggleFieldset()}
        >
          {title}
        </legend>
          {filterItems}
      </fieldset>
  )
}