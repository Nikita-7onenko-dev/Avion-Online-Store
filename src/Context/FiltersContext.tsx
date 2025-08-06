import { createContext, useContext } from "react";


export type FilterContextType = {
  productType: string[];
  designers: string[];
  categories: string[];
  priceFilters: string[];
  sorting: string[];
} 

export const FiltersContext = createContext<FilterContextType | null>(null);


export default function useFilters() {  
  const contextData = useContext(FiltersContext);
  if(!contextData) {
    throw new Error('useFilters must be used inside FiltersContext.Provider')
  }
  return contextData;
}