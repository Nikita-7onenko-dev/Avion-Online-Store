import styles from './AllProductsGrid.module.scss';

import { ProductType } from "@/types/ProductType";
import {FiltersOptionsType} from '@/types/FiltersOptionsType';
import { products } from '@/data/products';

import { Link } from 'react-router-dom';
import { useEffect, useState, useRef, useMemo } from "react";
import  ClipLoader from 'react-spinners/ClipLoader';
import applyFilterOptions from '@/utils/applyFilterOptions';

type Props = {
  filterOptions: FiltersOptionsType;
}

const pageSize = 5;
const base = process.env.PUBLIC_URL;

export default function AllProductsGrid({filterOptions}: Props): React.JSX.Element {

  const [items, setItems] = useState<ProductType[]>([]);

  const iRef = useRef<number>(0);

  const filteredProducts = useMemo(() => {
    return applyFilterOptions(filterOptions, products);
  }, [filterOptions]) 

  const hasMoreProducts = () => iRef.current < filteredProducts.length;

  function loadMore() {
    const productsChunk: ProductType[] = [];
    const isReload = iRef.current === 0;

    for(let k = 0; k < pageSize && hasMoreProducts(); k++){
      productsChunk.push(filteredProducts[iRef.current]);
      iRef.current++;
    }

    if(isReload) {
      setItems(productsChunk)
    } else {
      setItems( prev => [...prev, ...productsChunk])  
    }
  }
  
  useEffect(() => {
    iRef.current = 0;
    loadMore();

  },[filterOptions]);

  const [imgSet, setImgSet] = useState(new Set());

  return (
      <div className={styles.productGridBlock} style={hasMoreProducts() ? {} : {paddingBottom: '50px'}}>
        <ul className={styles.productGrid}>
            {items.map(product => {
              return (
                <li key={product.id} className={product.aspectRatio === '8/5' ? styles.wideElement : '' }>
                  <Link to={`/${product.id}`} className={styles.productCard}>
                    <div className={product.aspectRatio === '4/5' ? styles.imgFrameSmall : styles.imgFrameWide}>
                      <img 
                        src={`${base}${product.image}`} 
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
        {hasMoreProducts() && <button
          className='globalButton'
          onClick={loadMore}
        >
          Load more
        </button>}
      </div>
  )
}