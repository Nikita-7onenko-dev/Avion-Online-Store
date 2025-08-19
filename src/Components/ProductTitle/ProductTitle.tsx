import styles from './productTitle.module.scss'

type Props = {
  name: string;
  price: string;
}

export default function ProductTitle({name, price}: Props): React.JSX.Element {


  return (
    <div className={styles.productTitle}>
      <h2>{name}</h2>
      <span>{price}</span>
    </div>
  )
}