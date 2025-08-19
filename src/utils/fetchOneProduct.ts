import { ProductType } from "@/types/ProductType";


export default async function fetchOneProduct(id: string): Promise<ProductType> {
    
    const url = process.env.API_URL + 'products/' || "https://avion-online-store-server.onrender.com/api/products/"

    const response = await fetch(url + id);
    const productData: ProductType = await response.json();
    return productData;
}