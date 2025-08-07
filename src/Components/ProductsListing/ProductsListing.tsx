import { products } from "@/data/products";

import ProductListingEmblaCarousel from "../ProductListingEmblaCarousel/ProductListingEmblaCarousel";
import {EmblaOptionsType} from 'embla-carousel'

import ProductListingCard from "../ProductListingCard/ProductListingCard";

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

  const productCards = result.map(product => <ProductListingCard key={product.id} product={product} /> )

  const options: EmblaOptionsType = {dragFree: true}

  return (
    <ProductListingEmblaCarousel options={options} slides={productCards} title={title} searchParams={searchParams} />
  )
}