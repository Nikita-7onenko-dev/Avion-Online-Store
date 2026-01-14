import { ApiError, ApiErrorType, handleResponseError } from "@/exceptions/ApiError";
import { useAppDispatch } from "@/hooks/ReduxHooks";
import { showToastThunk } from "@/store/slices/toastSlice";

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
      if(err instanceof ApiError) throw err;
      throw new ApiError('network', 'No connection to the server. Please check your internet connection');
    }
}