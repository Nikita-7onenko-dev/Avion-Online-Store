  
  export type ProductType = {
    _id?: string;
    id: string;
    name: string;
    productType: string[];
    category: string[];
    designer: string;
    price: number;
    dateAdded: string;
    popularityScore: number;
    description: string;
    features?: string[];
    height: number;
    width: number;
    depth: number; 
    image: string;
    aspectRatio: string;
  } & Record<string, unknown>