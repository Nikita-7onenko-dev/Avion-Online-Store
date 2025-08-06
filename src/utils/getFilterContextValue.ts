import { products } from "@/data/products";


export default function getFiltersContextValue() {

  const allProductTypes = Array.from( new Set( products.flatMap( product => product.productType) ) );
  const designers = Array.from(new Set(products.map(product => product.designer)));
  const categories = Array.from(new Set( products.flatMap(product => product.category) ));

  const filterContextValue = {
    productType: allProductTypes,
    designers: designers,
    categories: categories,
    priceFilters: ['0 - 100', '101 - 250', '251+'],
    sorting: ['Price: Low to High', 'Price: High to Low', 'Newest', 'Best sellers'],
  }

  return filterContextValue;

}

