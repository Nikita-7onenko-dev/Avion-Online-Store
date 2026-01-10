
import { useAppSelector } from "@/hooks/ReduxHooks";

export default function getAllProductsTitle(): string {

  const filterOptions = useAppSelector(state => state.filtersOptions)

  const singleFiltersTitle = [
    filterOptions.filters.productTypes.length === 1 ? filterOptions.filters.productTypes[0] : null,
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