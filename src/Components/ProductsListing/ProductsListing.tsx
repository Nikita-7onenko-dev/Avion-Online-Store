import ProductListingEmblaCarousel from "../ProductListingEmblaCarousel/ProductListingEmblaCarousel";
import {EmblaOptionsType} from 'embla-carousel';

import MainProductCard from "../MainProductCard/MainProductCard";

import fetchAllProducts from "@/utils/fetchAllProducts";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/ProductType";
import { FiltersOptionsType } from "@/types/FiltersOptionsType";

type Filters = {
  productType: string;
  category: string;
  designer: string;
  sorting: "Price: Low to High" | "Price: High to Low" | "Newest" | "Best sellers";
}

type RestProps = {
  title: string;
  excludeId?: string;
}

type AtLeastOne<T> = Partial<T> & { [K in keyof T]: Pick<T, K> }[keyof T]

type AtLeastOneProp = AtLeastOne<Filters>


export default function ProductListing
  ({
    productType,
    category,
    designer,
    sorting,
    excludeId,
    title 
  }: AtLeastOneProp & RestProps): React.JSX.Element {

  const [products, setProducts] = useState<ProductType[] | null>(null);

  const filterOptions: FiltersOptionsType = {
    filters:{
      productType: productType ? [productType] : [],
      category: category ? [category] : [],
      designers: designer ? [designer] : [],
      priceFilters: []
    },
      sorting: sorting || '',
      search: '',
  }

  const params = new URLSearchParams({
    filters: JSON.stringify(filterOptions.filters),
    sorting: filterOptions.sorting,
    limit: "8"
  }).toString();

  useEffect( () => {
    const fetchData = async() => {
      let data = (await fetchAllProducts(params)).products;
      if(excludeId) {
        data = data.filter(prod => prod._id !== excludeId);
      }
      setProducts(data);
    }
    
    fetchData();

  }, [excludeId])

  const productCards = products ? 
   ( products.map(product => <MainProductCard key={product._id} product={product} variation="listingElement" /> ) ) :
   ( [...Array(8).keys()].map(index => <MainProductCard key={index} variation="listingElement" />) )

  const options: EmblaOptionsType = {dragFree: true}

  return (
    <ProductListingEmblaCarousel options={options} slides={productCards} title={title} filterOptions={filterOptions} />
  )
}