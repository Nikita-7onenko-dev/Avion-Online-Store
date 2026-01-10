import ProductListingEmblaCarousel from "../ProductListingEmblaCarousel/ProductListingEmblaCarousel";
import {EmblaOptionsType} from 'embla-carousel';

import MainProductCard from "../MainProductCard/MainProductCard";
import { FiltersOptionsType } from "@/types/FiltersOptionsType";
import { useProductsListing } from "@/queries/useProducts";

type Filters = {
  productType: string;
  category: string;
  designer: string;
  sorting: "Price: Low to High" | "Price: High to Low" | "New arrivals" | "Best sellers";
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

  const filtersOptions: FiltersOptionsType = {
    filters:{
      productTypes: productType ? [productType] : [],
      category: category ? [category] : [],
      designers: designer ? [designer] : [],
      priceFilters: []
    },
      sorting: sorting || '',
      search: '',
  }

  const params = new URLSearchParams({
    filters: JSON.stringify(filtersOptions.filters),
    sorting: filtersOptions.sorting,
    limit: "8"
  }).toString();

  const { isFetching, isError, data } = useProductsListing(params, excludeId);

  const options: EmblaOptionsType = {dragFree: true}


  if(isFetching) {
    return (
      <ProductListingEmblaCarousel 
        options={options} 
        slides={[...Array(8).keys()].map(index => <MainProductCard key={index} 
        variation="listingElement" />)} 
        title={title} 
        filtersOptions={filtersOptions} 
      />
    )
  }

  if(isError) {
    return <div>Ошибка загрузки товаров 😢</div>;
  }

  if(data?.products.length) {
    return (
      <ProductListingEmblaCarousel 
        options={options} 
        slides={data.products.map(product => <MainProductCard key={product._id}
        product={product} 
        variation="listingElement" /> ) } 
        title={title} 
        filtersOptions={filtersOptions} 
      />
    )
  } 

  return <div>Товары не найдены</div>;;
}