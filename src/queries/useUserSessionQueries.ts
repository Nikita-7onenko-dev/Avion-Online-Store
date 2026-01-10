import { userSessionService } from "@/api/UserSessionService";
import { LoginUserType, RegisterUserType, UserDataType } from "@/types/UserSessionTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const queryKey = ['userSession', 'refresh'] as const;

export const useRefreshUserConfig = {
    queryKey: queryKey,
    queryFn: () => userSessionService.fetchRefreshUserData(),
    staleTime: Infinity,
  } 

export function useRefreshUser() {

  return useQuery<UserDataType | null>(useRefreshUserConfig);
}

export function usePostUser() {
  const queryClient = useQueryClient();

  return useMutation<UserDataType | null, Error, RegisterUserType | LoginUserType>({
    mutationFn: (formData) => userSessionService.postUser(formData),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data)
    },
    onError: (err) => {
      console.log('Login/register error: ', err.message);
    }
  })
}

export function useLogoutUser() {
  const queryClient = useQueryClient();

  return useMutation<null | void, Error>({
    mutationFn: () => userSessionService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(queryKey, null);
      queryClient.removeQueries({queryKey: ['userSession'], exact: false});
    },
    onError: (err) => {
      console.log('Logout error: ', err.message);
    }
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation<UserDataType | null, Error, Partial<UserDataType>> ({
    mutationFn: (formData) => userSessionService.updateUser(formData),
    onSuccess: (data) => queryClient.setQueryData(queryKey, data),
    onError: (err) => {
      console.log('Update user data error: ', err.message);
    }
  })
}