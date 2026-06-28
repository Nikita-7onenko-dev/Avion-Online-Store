import styles from "./ProductGridBanner.module.scss"

type Props = {
  title: string
}

const BASE = process.env.PUBLIC_URL;

export function ProductsGridBanner({title}: Props) {

  return (
    <div 
      className={styles.productsGridBanner}
      style={{backgroundImage: `url('${BASE}/img/allProductsBanner.webp')`}}  
    >
      <h2>{title}</h2>
    </div>
  )
}