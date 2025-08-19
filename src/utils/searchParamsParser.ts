
import { FiltersOptionsType } from "@/types/FiltersOptionsType";

function ensureArray(value: string | string[] | null | undefined ) {
  if(!value) return [];
  return Array.isArray(value) ? value : [value]
}

export default function searchParamsParser(searchParams: URLSearchParams): [FiltersOptionsType, string] {

    let filters = searchParams.get('filters');
    let productType = null;
    let category = null;
    let designers = null;
    let priceFilters = null;
    
    if(filters) {
      let filtersObj = JSON.parse(filters);
      productType = filtersObj.productType;
      category = filtersObj.category;
      designers = filtersObj.designer;
    }

    productType = productType || searchParams.get('productType');
    designers =  designers || searchParams.get('designers');
    category = category || searchParams.get('category');
    priceFilters = priceFilters || searchParams.get('priceFilters');
    const sorting = searchParams.get('sorting');
    const search = searchParams.get('search');
    

    const productTypeArr = ensureArray(productType);
    const categoryArr = ensureArray(category);
    const designerArr = ensureArray(designers);
    const priceFiltersArr = ensureArray(priceFilters);
  

    const initialOptions: FiltersOptionsType = {
      filters: {
        productType: productTypeArr,
        category: categoryArr,
        designers: designerArr,
        priceFilters: priceFiltersArr,
      },
      sorting: sorting || '',
      search: search || ''
    }

    const singleFiltersTitle = [
      productTypeArr.length === 1 ? productTypeArr[0] : null,
      categoryArr.length === 1 ? categoryArr[0] : null,
      designerArr.length === 1 ? designerArr[0] : null,
      priceFiltersArr.length === 1 ? priceFiltersArr[0] : null
    ].filter(Boolean);
  
    let title: string = '';
    if(search) title = `Searching for: ${search}`;
    else if(singleFiltersTitle.length === 1 && singleFiltersTitle[0]) title = singleFiltersTitle[0]
    else if(sorting) title = sorting;

    else title = "All Products";

    return [initialOptions, title];
}