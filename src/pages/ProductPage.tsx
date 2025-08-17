import ProductBlock from "@/Components/ProductBlock/ProductBlock";

import { useParams } from "react-router-dom";
import ProductListing from "@/Components/ProductsListing/ProductsListing";
import Features from "@/Components/Features/Features";
import CtaBlock from "@/Components/CtaBlock/CtaBlock";
import fetchOneProduct from "@/utils/fetchOneProduct";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/ProductType";


export default function ProductPage(): React.JSX.Element {

  const [productData, setProductData] = useState<ProductType | null>(null)

  const {id} = useParams();
  useEffect(() => {

    async function fetchProduct() {
      if(id) {
        const data = await fetchOneProduct(id);
        setProductData(data)
      }
    }

    fetchProduct()

  })

  if(!productData) return <></>;

  return (
    <>
      <ProductBlock productData={productData} />
      <ProductListing productType={productData.productType[0]} excludeId={productData._id} title='You might also like' />
      <Features />
      <CtaBlock isWithImage />
    </>
  )
}