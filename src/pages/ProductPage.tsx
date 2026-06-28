import ProductBlock from "@/Components/ProductBlock/ProductBlock";

import { useParams } from "react-router-dom";
import ProductListing from "@/Components/ProductsListing/ProductsListing";
import Features from "@/Components/Features/Features";
import CtaBlock from "@/Components/CtaBlock/CtaBlock";
import { useOneProduct } from "@/queries/useProducts";
import { saveHistory } from "@/services/storage/recentlyViewedStorage";


export default function ProductPage(): React.JSX.Element | null {

  const {id} = useParams();

  if(!id) return null;

  const {data, isError, error} = useOneProduct(id);

  saveHistory(id);

  return (
    <>
      <ProductBlock productData={data} isError={isError} error={error} />
      <ProductListing productType={data?.productType[0] || ''} excludeId={data?._id} title='You might also like' />
      <Features />
      <CtaBlock isWithImage />
    </>
  )
}