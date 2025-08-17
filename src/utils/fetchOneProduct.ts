import { ProductType } from "@/types/ProductType";



export default async function fetchOneProduct(id: string): Promise<ProductType> {
    const response = await fetch(`https://avion-online-store-server.onrender.com/products/${id}`);
    const productData: ProductType = await response.json();
    return productData;
}