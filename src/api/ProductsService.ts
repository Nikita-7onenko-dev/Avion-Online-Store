import { ProductType } from "@/types/ProductType";
import { ProductsDataResponseType } from "@/types/ResponseDataType";

class ProductsService {

  _baseURL = process.env.API_URL 
    ? process.env.API_URL + 'products/' 
    : "https://avion-online-store-server.onrender.com/api/products/"

  async getAllProducts(params?: string): Promise<ProductsDataResponseType> {

    let url = this._baseURL

    if(params) {
      url = this._baseURL + `?${params}`
    }

    try {
      const response = await fetch(url);
      const productData: ProductsDataResponseType = await response.json();
      console.log(productData);
      return productData;
    } catch(err) {
      console.log(err)
      throw err
    }
  }

  async getOneProduct(id: string): Promise<ProductType> {

    try {
      const response = await fetch(this._baseURL + id);
      const productData: ProductType = await response.json();
      console.log(productData);
      return productData;

    } catch(err) {
      console.log(err);
      throw err
    }
  } 
}



export const productsService = new ProductsService()