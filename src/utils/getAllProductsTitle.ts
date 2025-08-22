
import { FiltersOptionsType } from "@/types/FiltersOptionsType";

// function ensureArray(value: string | string[] | null | undefined ) {
//   if(!value) return [];
//   return Array.isArray(value) ? value : [value]
// }

export default function getAllProductsTitle(filterOptions: FiltersOptionsType): string {

  const singleFiltersTitle = [
    filterOptions.filters.productType.length === 1 ? filterOptions.filters.productType[0] : null,
    filterOptions.filters.category.length === 1 ? filterOptions.filters.category[0] : null,
    filterOptions.filters.designers.length === 1 ? filterOptions.filters.designers[0] : null,
  ].filter(Boolean);

  let title: string = '';
  if(filterOptions.search) title = `Searching for: ${filterOptions.search}`;
  else if(singleFiltersTitle.length === 1 && singleFiltersTitle[0]) title = singleFiltersTitle[0]
  else if(filterOptions.sorting) title = filterOptions.sorting;

  else title = "All Products";

  return title;
}