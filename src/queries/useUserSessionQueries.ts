import { userSessionService } from "@/api/UserSessionService";
import { ApiError } from "@/exceptions/ApiError";
import { useAppDispatch } from "@/hooks/ReduxHooks";
import { showToastThunk } from "@/store/slices/toastSlice";
import { LoginUserType, RegisterUserType, UserDataType } from "@/types/UserSessionTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const queryKey = ['userSession', 'refresh'] as const;

export const useRefreshUserConfig = {
  queryKey: queryKey,
  queryFn: () => userSessionService.fetchRefreshUserData(),
  staleTime: Infinity,
  retry: (failureCount: number, error: Error) => {
    if(error instanceof ApiError && error.message.includes('Unauthorized')) return false;
    return failureCount < 3;
  }
} 

export function useRefreshUser() {

  return useQuery<UserDataType | null>(useRefreshUserConfig);
}

export function usePostUser() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  

  return useMutation<UserDataType | null, Error, RegisterUserType | LoginUserType>({
    mutationFn: (formData) => userSessionService.postUser(formData),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data)
    },
    onError: (err) => {
      dispatch(showToastThunk({
        type: 'error',
        message: err.message
      }));
      console.log('Login/register error: ', err.message);
    }
  })
}

export function useLogoutUser() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();


  return useMutation<null | void, Error>({
    mutationFn: () => userSessionService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(queryKey, null);
      queryClient.removeQueries({queryKey: ['userSession'], exact: false});
    },
    onError: (err) => {
      dispatch(showToastThunk({
        type: 'error',
        message: `Logout error: ${err.message}`
      }))
    }
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation<UserDataType | null, Error, Partial<UserDataType>> ({
    mutationFn: (formData) => userSessionService.updateUser(formData),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data);
      dispatch(showToastThunk({
        type: 'success',
        message: 'Data has been updated successfully'
      }))
    },
    onError: (err) => {
      dispatch(showToastThunk({
        type: 'error',
        message: err.message
      }))
    }
  })
}