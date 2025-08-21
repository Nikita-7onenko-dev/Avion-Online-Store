import styles from './productBlock.module.scss';

import { ProductType } from '@/types/ProductType';

import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import AddToCartBar from '../AddToCartBar/AddToCartBar';
import ProductDimensionsTable from '../ProductDimensionsTable/ProductDimensionsTable';
import ProductTitle from '../ProductTitle/ProductTitle';
import ProductDescription from '../ProductDescription/ProductDescription';

type Props = {
  productData: ProductType | null;
}

export default function ProductBlock({productData}: Props): React.JSX.Element {

  const productImageRef = useRef<HTMLDivElement>(null);
  const pathname = useLocation();
  
  const [isLoad, setIsLoad] = useState(false);  
  
  useEffect(() => {
    productImageRef.current?.scrollIntoView({
      behavior: 'instant',
      block: 'start',
    })
  }, [pathname])

  const isWideImage = productData?.aspectRatio === '8/5';

  const data = {
    name: productData?.name || '',
    description: productData?.description || '',
    price: productData?.price ? productData?.price + ' $' : '' ,
    features: productData?.features || null,
    designer: productData?.designer || '',
    width: productData?.width || null,
    height: productData?.height || null,
    depth: productData?.depth || null,
  }
   
  return (
    <div className={`${styles.productBlock} ${isWideImage ? styles.productBlockWide : ''}`}>
      <div 
        className={`${styles.productBlockImageWrapper} ${isWideImage ? styles.wideImageWrapper : styles.smallImageWrapper}`}
        ref={productImageRef}
      >
        { productData && <img 
            src={productData.image} 
            alt={data.name}
            loading='lazy' 
            onLoad={() => setIsLoad(true)}
            style={isLoad ? {visibility: 'visible'} : {visibility: 'hidden'} }   
          />
        }
        <ClipLoader 
          color={'#2a254b'}
          size={80}
          cssOverride={isLoad ? {display: 'none'} : {display: 'inline-block', position: 'absolute'} } 
        />
      </div>
      <div 
        className={`${styles.productDescriptionBlock} ${isWideImage ?
          styles.productDescriptionSmall : styles.productDescriptionWide}`}
      >
        <ProductTitle name={data.name} price={data.price}/>
        <ProductDescription description={data.description} features={data.features} designer={data.designer} />
        <ProductDimensionsTable
          height={data.height}
          width={data.width}
          depth={data.depth}  
        />
        {productData && <AddToCartBar product={productData} />}
      </div>
    </div>
  )
}