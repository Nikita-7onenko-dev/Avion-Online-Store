import { Link } from 'react-router-dom';
import styles from './productDescription.module.scss'

type Props = {
  description: string;
  features?: string[];
  designer: string;
}

export default function ProductDescription({description, features, designer}: Props): React.JSX.Element {

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
        <Link to={{
          pathname: '/allProducts',
          search: `designer=${designer}`
        }}>
          {designer}
        </Link>
      </p>
      <ul>{features && featuresList}</ul>
    </div>
  )
}