import { productsService } from "@/api/ProductsService";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ProductsDataResponseType } from "@/types/ResponseDataType";
import { ProductType } from "@/types/ProductType";
import { FiltersOptionsType } from "@/types/FiltersOptionsType";

export function useProductsListing(params: string, excludeId?: string) {

  return useQuery({
    queryKey: ['products', params, excludeId],
    queryFn: async () => {
      const res = await productsService.getAllProducts(params);
      if(!res) {
        throw new Error('Fetch error')
      }
      if(excludeId) {
        res.products = res.products.filter(prod => prod._id !== excludeId);
      }
      return res
    }
  })
}

export function useOneProduct(id: string) {

  return useQuery({
    queryKey: ['products', id],
    queryFn: () => productsService.getOneProduct(id)
  })
}

export function useProductsIncrementalLoading(queryKey: string[], filtersOptions: FiltersOptionsType, limit: number) {

  return useInfiniteQuery<
    ProductsDataResponseType,
    Error,
    ProductType[],
    (string | number )[],
    number  
  >({
    queryKey: queryKey,
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({
        filters: JSON.stringify(filtersOptions.filters),
        sorting: filtersOptions.sorting,
        search: filtersOptions.search,
        alreadyLoaded: String(pageParam),
        limit: String(limit)
      });
      const res = await productsService.getAllProducts(params.toString());
      if(!res) {
        throw new Error('Fetch error')
      }
      return res;
    },
    getNextPageParam: (lastPage, allPages) => {
      if(!lastPage.hasMore) return undefined;

      const loadedItems = allPages.reduce( 
        (sum, page) => sum + page.products.length,
        0 
      )
      return loadedItems;
    },
    select: data => {
      return data.pages.flatMap(page => page.products);
    }
  })
}