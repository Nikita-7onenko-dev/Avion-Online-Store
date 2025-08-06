import { products } from "@/data/products";

import styles from './productsListing.module.scss'

import { Link } from "react-router-dom";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import ProductListingEmblaCarousel from "../ProductListingEmblaCarousel/ProductListingEmblaCarousel";
import {EmblaOptionsType} from 'embla-carousel'

type Filters = {
  productType: string;
  category: string;
  designer: string;
  cheapest: boolean;
  newest: boolean;
  popular: boolean;
  excludeId: string;
}

type RestProps = {
  title: string;
}

type AtLeastOne<T> = Partial<T> & { [K in keyof T]: Pick<T, K> }[keyof T]

type AtLeastOneProp = AtLeastOne<Filters>


export default function ProductListing
  ({
    productType,
    category,
    designer,
    cheapest,
    newest,
    popular, 
    excludeId,
    title 
  }: AtLeastOneProp & RestProps): React.JSX.Element {

  let result = products;
  let searchParams = ''

  if(productType) {
      searchParams+= `productType=${productType}`;
      result = result.filter(product => {
      return product.productType.includes(productType);
    })
  }

  if(category) {
    searchParams+=`category=${category}`;
    result = result.filter(product => {
      return product.category.includes(category);
    })
  }

  if(designer) {
    searchParams+=`designer=${designer}`
    result = result.filter(product => {
      return product.designer.includes(designer);
    })
  }

  if(excludeId) {
    result = result.filter(product => product.id !== excludeId)
  }
  
  if(cheapest) {
    result = result.sort((a, b) => a.price - b.price );
  }

  if(newest) {
    result = result.sort((a, b) => {
      return new Date(a.dateAdded).getTime() > new Date(b.dateAdded).getTime() ? -1 : 1
    });
  }

  if(popular) {
    result = result.sort((a, b) => b.popularityScore - a.popularityScore);
  }

  if(result.length > 8) {
    result = result.slice(0, 8)
  }

  const productCards = result.map(product => {
    const [isLoad, setIsLoad] = useState(false);  
    return (
      <li key={product.id} className={`${product.aspectRatio === '4/5' ? styles.imgFrameSmall : styles.imgFrameWide} embla__slide`}>
        <Link className={`${styles.productCard}`} to={`/${product.id}`} >
          <div className={`${product.aspectRatio === '4/5' ? styles.imgFrameSmall : styles.imgFrameWide} ${styles.imgFrame}`}>
            <img 
              src={product.image} 
              alt="" 
              loading="lazy"
              onLoad={() => setIsLoad(true)}
              style={isLoad ? {visibility: 'visible'} : {visibility: 'hidden'} } 
            />
            <ClipLoader 
              color={'#2a254b'}
              size={40}
              cssOverride={isLoad ? {display: 'none'} : {display: 'inline-block', position: 'absolute'} } 
            />
          </div>
          <p>{product.name}</p>
          <p>{product.price}$</p>
        </Link>
      </li>  
    )
  })

  const options: EmblaOptionsType = {dragFree: true}

  return (
    // <div className={styles.productsListingContainer}>
    //   <h3>{title}</h3>
    //   <ul>{productCards}</ul>
    //   <Link 
    //     className={`${styles.link} globalLink`}
    //      to={{
    //       pathname: '/allProducts',
    //       search: searchParams
    //      }}
    //   > 
    //     View collection
    //   </Link>
    // </div>
    <ProductListingEmblaCarousel options={options} slides={productCards} title={title} searchParams={searchParams} />
  )
}