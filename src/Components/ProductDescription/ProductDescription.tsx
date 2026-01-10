import { Link } from 'react-router-dom';
import styles from './productDescription.module.scss'
import { useAppDispatch } from '@/hooks/ReduxHooks';
import { setFiltersOptions } from '@/store/slices/filtersOptionsSlice';

type Props = {
  description: string;
  features?: string[] | null;
  designer: string;
}

export default function ProductDescription({description, features, designer}: Props): React.JSX.Element {

  const dispatch = useAppDispatch();

  let featuresList;

  if(features) {
    featuresList = features.map(feature => (
      <li key={feature}>{feature}</li>
    ))
  }

  return (
    <div className={styles.productBlockDescription}>
      <h3>Product description:</h3>
      <p>{description}</p>
      <p>{"Designer: "}
        {designer && 
          <Link 
            to={{
              pathname: '/allProducts',
            }}
            onClick={() => {
              dispatch(setFiltersOptions({
                filters: { productTypes: [], category: [], designers: [designer], priceFilters: [] },
                sorting: '',
                search: ''
              }))
            }}
            state={{scrollToTop: true}}  
          >
          {designer}
        </Link>}
      </p>
      <ul>{features && featuresList}</ul>
    </div>
  )
}