import styles from './AllProductsGrid.module.scss';

import { ProductType } from "@/types/ProductType";
import {FiltersOptionsType} from '@/types/FiltersOptionsType';
import { products } from '@/data/products';

import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import  ClipLoader from 'react-spinners/ClipLoader';
import applyFilterOptions from '@/utils/applyFilterOptions';

type Props = {
  filterOptions: FiltersOptionsType;
}

const pageSize = 5;

export default function AllProductsGrid({filterOptions}: Props): React.JSX.Element {

  const [items, setItems] = useState<ProductType[]>([]);

  let iRef = useRef<number>(0);

  let filteredProducts = applyFilterOptions(filterOptions, products);

  const productsChunk: ProductType[] = [];

  function loadMore() {
    const isReload = iRef.current === 0;

    for(let k = 0; k < pageSize && iRef.current < filteredProducts.length; k++){
      productsChunk.push(filteredProducts[iRef.current]);
      iRef.current++;
    }

    if(isReload) {
      setItems( () => [...productsChunk])
    } else {
      setItems( prev => [...prev, ...productsChunk])  
    }
  }
  
  useEffect(() => {
    iRef.current = 0;
    loadMore();

  },[filterOptions]);

  const [imgSet, setImgSet] = useState(new Set())

  return (
      <div className={styles.productGridBlock}>
        <ul className={styles.productGrid}>
            {items.map(product => {
              return (
                <li key={product.id} className={product.aspectRatio === '8/5' ? styles.wideElement : '' }>
                  <Link to={`/${product.id}`} className={styles.productCard}>
                    <div className={product.aspectRatio === '4/5' ? styles.imgFrameSmall : styles.imgFrameWide}>
                      <img 
                        src={product.image} 
                        alt="" 
                        loading='lazy'
                        onLoad={() => {                          
                          setImgSet(prev => new Set(prev).add(product.id))
                        }}
                        style={imgSet.has(product.id) ? {visibility: 'visible'} : {visibility: 'hidden'} } 
                      />
                      <ClipLoader 
                        color={'#2a254b'}
                        size={40}
                        cssOverride={imgSet.has(product.id) ? {display: 'none'} : {display: 'inline-block', position: 'absolute'} } 
                      />
                    </div>
                    <p>{product.name}</p>
                    <p>{product.price}$</p>
                  </Link>
                </li>  
              )
            })}
        </ul>
        <button
        className='globalButton'
          onClick={loadMore}
        >
          Load more
        </button>
      </div>
  )
}