import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import { FiltersOptionsType } from "@/types/FiltersOptionsType";
import { ProductType } from "@/types/ProductType";
import fetchAllProducts from "@/utils/fetchAllProducts";
import getAllProductsTitle from "@/utils/getAllProductsTitle";

export type FilterContextType = {
  productType: string[];
  designers: string[];
  categories: string[];
  priceFilters: string[];
  sorting: string[];
};

type FiltersContextObj = {
  filterContext: FilterContextType;
  filtersOptions: FiltersOptionsType;
  setFiltersOptions: Dispatch<SetStateAction<FiltersOptionsType>>;

  products: ProductType[];
  hasMore: boolean;
  alreadyLoaded: number;
  isLoading: boolean;
  loadMore: () => void;
  title: string;

};

// Получаем все существующие в базе данных поля: все типы продуктов, все категории, все дизайнеры
async function fetchAllFiltersOptionsFields(): Promise<{allProductTypes :string[], allCategories: string[], allDesigners: string[]}> {

  const url = process.env.API_URL + 'filtersOptions' || 'https://avion-online-store-server.onrender.com/api/filtersOptions';

  const response = await fetch(url);
  const filtersOptionsFields = await response.json();

  return filtersOptionsFields;
}
const {allProductTypes, allCategories, allDesigners} = await fetchAllFiltersOptionsFields();



// Создаем контекст
const ProductsAndFiltersContext = createContext<FiltersContextObj | undefined>(undefined);

// Раздаем значение контекста отсюда
export function useProductsAndFilters(): FiltersContextObj {
  const context = useContext(ProductsAndFiltersContext);
  if (!context) {
    throw new Error("useFilters must be used inside productsAndFiltersProvider");
  }
  return context;
}


// Компонент провайдер
export  function ProductsAndFiltersProvider({ children }: { children: ReactNode }) {
  
  // Фильтры и сортировки
  const filterContext: FilterContextType = {
    productType: allProductTypes,
    designers: allDesigners,
    categories: allCategories,
    priceFilters: ['0 - 100', '101 - 250', '251+'],
    sorting: ['Price: Low to High', 'Price: High to Low', 'New arrivals', 'Best sellers'],
  };

  const initialOptions: FiltersOptionsType = {
    filters: { productType: [], category: [], designers: [], priceFilters: [] },
    sorting: '',
    search: ''
  };

  const [filtersOptions, setFiltersOptions] = useState<FiltersOptionsType>(initialOptions);



  // Товары и запросы к серверу
  const [products, setProducts] = useState<ProductType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [alreadyLoaded, setAlreadyLoaded] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Формируем заголовок для страницы с продуктами
  let title = getAllProductsTitle(filtersOptions);

  let ignore = false;
  const pageSize = 5;

  // Запрос списка товаров у сервера
  async function fetchProducts(searchParams: URLSearchParams) {
    setIsLoading(true);
    const data = await fetchAllProducts(searchParams.toString());

    if(!ignore) {
      setIsLoading(false)
      setProducts( prev => [...prev, ...data.products]);
      setHasMore(data.hasMore);
    }
  }

  // Загрузить еще
  function loadMore() {
    setAlreadyLoaded( (prev) => prev + pageSize );
  }

  // Слушаем filterOptions
  useEffect(() => {
    setProducts([]);
    setAlreadyLoaded(0);  
    
  },[filtersOptions])

  // Слушаем сколько уже загружено и FilterOptions 
  useEffect(() => {
    let searchParams = new URLSearchParams({
      search: filtersOptions.search,
      sorting: filtersOptions.sorting,
      filters: JSON.stringify(filtersOptions.filters),
      alreadyLoaded: alreadyLoaded.toString(),
      limit: pageSize.toString()
    });

    if(!ignore) {
      fetchProducts(searchParams);
    }

    return () => {
      ignore = true;
    }
  }, [alreadyLoaded, filtersOptions])


  return (
    <ProductsAndFiltersContext.Provider value={{
      filterContext,
      filtersOptions, 
      setFiltersOptions,
      products,
      hasMore,
      alreadyLoaded,
      isLoading,
      loadMore,
      title
    }}>
      {children}
    </ProductsAndFiltersContext.Provider>
  );
}
