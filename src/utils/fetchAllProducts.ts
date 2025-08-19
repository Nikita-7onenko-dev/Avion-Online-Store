import { ProductType } from "@/types/ProductType";

type ResponseData = {
  products: ProductType[];
  hasMore: boolean
}



export default async function fetchAllProducts(params?: string): Promise<ResponseData> {

  let url = process.env.API_URL + 'products/' || "https://avion-online-store-server.onrender.com/api/products/"

  if(params) {
    url = url + `?${params}`
  }

  const response = await fetch(url);
  const products = await response.json();
  console.log(products)
  return products;
}