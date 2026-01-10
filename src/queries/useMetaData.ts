import { getMetaData } from "@/api/getMetaData";
import { useQuery } from "@tanstack/react-query";

type MetaStateType = {
  productTypes: string[];
  designers: string[];
  categories: string[];
  priceFilters: ['0 - 100', '101 - 250', '251+'];
  sorting: ['Price: Low to High', 'Price: High to Low', 'New arrivals', 'Best sellers'];
};

export const metaDataQueryConfig = {
  queryKey: ['metaData'],
  queryFn: async (): Promise<MetaStateType> => {
    const res = await getMetaData();
    const {allProductTypes, allCategories, allDesigners} = res;

    return {
      productTypes: allProductTypes,
      designers: allDesigners,
      categories: allCategories,
      priceFilters: ['0 - 100', '101 - 250', '251+'],
      sorting: ['Price: Low to High', 'Price: High to Low', 'New arrivals', 'Best sellers'],
    }
  },
  staleTime: Infinity
}

export function useMetaData() {
  return useQuery(metaDataQueryConfig)
}