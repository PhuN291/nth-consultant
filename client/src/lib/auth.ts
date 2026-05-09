import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient, getQueryFn } from "./queryClient";

export interface AdminUser {
  id: string;
  username: string;
}

export const AUTH_QUERY_KEY = ["/api/auth/me"];

export function useCurrentAdmin() {
  return useQuery<AdminUser | null>({
    queryKey: AUTH_QUERY_KEY,
    queryFn: getQueryFn({ on401: "returnNull" }),
    staleTime: 60_000,
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: async (vars: { username: string; password: string }) => {
      const res = await apiRequest("POST", "/api/auth/login", vars);
      return (await res.json()) as AdminUser;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, user);
    },
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/auth/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
      queryClient.invalidateQueries();
    },
  });
}
