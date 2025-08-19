import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import { FiltersOptionsType } from "@/types/FiltersOptionsType";

export type FilterContextType = {
  productType: string[];
  designers: string[];
  categories: string[];
  priceFilters: string[];
  sorting: string[];
};

type FiltersContextObj = {
  filterContext: FilterContextType,
  filtersOptions: FiltersOptionsType,
  setFiltersOptions: Dispatch<SetStateAction<FiltersOptionsType>>
};

// Получаем все существующие в базе данных поля: все типы продуктов, все категории, все дизайнеры
async function fetchAllFiltersOptionsFields(): Promise<{allProductTypes :string[], allCategories: string[], allDesigners: string[]}> {

  const url = process.env.API_URL + 'filtersOptions' || 'https://avion-online-store-server.onrender.com/api/filtersOptions';

  const response = await fetch(url);
  const filtersOptionsFields = await response.json();

  return filtersOptionsFields;
}
const {allProductTypes, allCategories, allDesigners} = await fetchAllFiltersOptionsFields()


// Раздаем значение контекста отсюда
const FiltersContext = createContext<FiltersContextObj | undefined>(undefined);

export function useFilters(): FiltersContextObj {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters must be used inside FiltersProvider");
  }
  return context;
}


// Компонент провайдер
export function FiltersProvider({ children }: { children: ReactNode }) {

  const filterContextValue: FilterContextType = {
    productType: allProductTypes,
    designers: allDesigners,
    categories: allCategories,
    priceFilters: ['0 - 100', '101 - 250', '251+'],
    sorting: ['Price: Low to High', 'Price: High to Low', 'Newest', 'Best sellers'],
  };

  const initialOptions: FiltersOptionsType = {
    filters: { productType: [], category: [], designers: [], priceFilters: [] },
    sorting: '',
    search: ''
  };

  const [filtersOptions, setFiltersOptions] = useState<FiltersOptionsType>(initialOptions);

  return (
    <FiltersContext.Provider value={{filterContext: filterContextValue, filtersOptions, setFiltersOptions}}>
      {children}
    </FiltersContext.Provider>
  );
}
