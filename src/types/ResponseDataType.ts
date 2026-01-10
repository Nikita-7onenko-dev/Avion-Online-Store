import { ProductType } from "./ProductType";

export type ProductsDataResponseType = {
  products: ProductType[];
  hasMore: boolean
}