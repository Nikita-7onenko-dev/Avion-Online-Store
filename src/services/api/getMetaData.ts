import { errorCather, handleResponseError } from "@/exceptions/ApiError";

type MetaResponseType = {
  allProductTypes: string[];
  allCategories: string[];
  allDesigners: string[];
}

export async function getMetaData(): Promise<MetaResponseType> {

  const url = `${process.env.API_URL || 'https://avion-online-store-server.onrender.com/api/'}filtersOptions/`;

  try {
      const response = await fetch(url);

      if(!response.ok) {
        handleResponseError(response.status)
      }

      const filtersOptionsFields: MetaResponseType = await response.json();

      return filtersOptionsFields;

    } catch(err) {
      errorCather(err)
    }
}