import styles from "./historyPage.module.scss"

import { LoadingDots } from "@/Components/LoadingDots/LoadingDots";
import ProductsGrid from "@/Components/ProductsGrid/ProductsGrid";
import { ProductsGridBanner } from "@/Components/ProductsGridBanner/ProductsGridBanner";
import { useRecentlyViewedProducts } from "@/queries/useProducts";

type ScreenState = 'loading' | 'list' | 'error' | 'empty'

export function HistoryPage() {

  const { data, isFetching, isError, error } = useRecentlyViewedProducts();
  
  function getScreenState(): ScreenState {
    if(!data && isFetching) return "loading"
    if(isError) return "error"
    if(!data?.length || !data) return "empty"
    else return "list"
  }

  const screenState = getScreenState();
  
  return (
    <>
      <ProductsGridBanner title="Recently Viewed" />

      <div className={styles.layoutBlock}> 
        {screenState === "loading" && <LoadingDots />}
        {screenState === "error" && <span>{error?.message}</span>}
        {screenState === "empty" && <span>There is no history yet</span>}
        {screenState === "list" && <ProductsGrid data={data} isLoadingMore={false}/>}
      </div>
    </>

  )
} 