
import { FiltersOptionsType } from "@/types/FiltersOptionsType";
import { ProductType } from "@/types/ProductType";


export default function applyFilterOptions(filterOptions: FiltersOptionsType, products: ProductType[]) {
    let filteredProducts = products;

    if(filterOptions.search) {
      filteredProducts = filteredProducts.filter(product => product.name.includes(filterOptions.search) )      
    }    
    if(filterOptions.filters.productType.length > 0) { 
      filteredProducts = filteredProducts.filter(product => product.productType.some(type => filterOptions.filters.productType.includes(type) )  )
    }
    if(filterOptions.filters.category.length > 0) {
      filteredProducts = filteredProducts.filter(product => product.category.some(category => filterOptions.filters.category.includes(category)) )
    }
    if(filterOptions.filters.designers. length > 0){
      filteredProducts = filteredProducts.filter(product =>  filterOptions.filters.designers.includes(product.designer) )  
    }
    if(filterOptions.filters.priceFilters.length > 0) {
      let numbers = filterOptions.filters.priceFilters.flatMap(priceFilter => priceFilter.match( /(\d+(\.\d+)?)/g));
      numbers = numbers.sort((a, b) => Number(a) - Number(b));

      if( !numbers.includes('251') ) {
        filteredProducts = filteredProducts.filter(product => product.price > Number(numbers[0]) && product.price < Number(numbers[numbers.length - 1]) )
      } else {
        filteredProducts = filteredProducts.filter(product => product.price > Number(numbers[0]))
      }
    } 
    if(filterOptions.sorting) {
      if(filterOptions.sorting === 'Price: Low to High') {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price );
      } else if (filterOptions.sorting === 'Price: High to Low') {
        filteredProducts = filteredProducts.sort((a, b) => a.price < b.price ? 1 : -1);
      } else if (filterOptions.sorting === 'Newest') {
        filteredProducts = filteredProducts.sort((a, b) => {
          return new Date(a.dateAdded).getTime() > new Date(b.dateAdded).getTime() ? -1 : 1
        });
      } else if(filterOptions.sorting === 'Best sellers') {
        filteredProducts = filteredProducts.sort((a, b) => b.popularityScore - a.popularityScore);
      }
    }
    return filteredProducts;
}