import { ApiError } from "@/exceptions/ApiError";
import { ProductType } from "@/types/ProductType";
import { ProductsDataResponseType } from "@/types/ResponseDataType";

function handleResponseError(status: number): never {
  if(status >= 500) {
    throw new ApiError('server', 'Internal server error. Please try again later')
  } else {
    throw new ApiError('unknown', 'Unknown error');
  }
}

class ProductsService {

  _baseURL = `${process.env.API_URL || "https://avion-online-store-server.onrender.com/api/"}products/`
  
  async getAllProducts(params?: string): Promise<ProductsDataResponseType> {

    let url = this._baseURL

    if(params) {
      url = this._baseURL + `?${params}`
    }

    try {
      const response = await fetch(url);

      if(!response.ok) {
        handleResponseError(response.status)
      }

      const productData: ProductsDataResponseType = await response.json();
      return productData;

    } catch(err) {
      if(err instanceof ApiError) throw err;
      throw new ApiError('network', 'No connection to the server. Please check your internet connection')
    }
  }

  async getOneProduct(id: string): Promise<ProductType> {

    try {
      const response = await fetch(this._baseURL + id /* + 'ss' */);

     if(!response.ok) {
        handleResponseError(response.status)
      }

      const productData: ProductType = await response.json();
      return productData;

    } catch(err) {
      if(err instanceof ApiError)throw err;
      throw new ApiError('network', 'No connection to the server. Please check your internet connection');
    }
  } 
}

export const productsService = new ProductsService()