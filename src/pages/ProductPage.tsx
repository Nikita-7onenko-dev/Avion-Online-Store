
import { products } from "@/data/products";
import ProductBlock from "@/Components/ProductBlock/ProductBlock";

import { useParams } from "react-router-dom";
import ProductListing from "@/Components/ProductsListing/ProductsListing";
import Features from "@/Components/Features/Features";
import CtaBlock from "@/Components/CtaBlock/CtaBlock";


export default function ProductPage(): React.JSX.Element {

  const {id} = useParams();

  const productData = products.find(p => p.id === id);

  if(!productData) return <></>;

  return (
    <>
      <ProductBlock productData={productData} />
      <ProductListing productType={productData.productType[0]} excludeId={productData.id} title='You might also like' />
      <Features />
      <CtaBlock isWithImage />
    </>
  )
}