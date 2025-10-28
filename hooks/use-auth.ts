import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/lib/services";

export function useSignin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.signIn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["auth"] }),
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.signOut,
    onSuccess: () => {
      // Clear all queries from cache
      queryClient.clear();
      // Remove all cached data
      queryClient.removeQueries();
      // Specifically clear auth-related queries
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Sign out error:", error);
      // Even if API fails, clear local cache
      queryClient.clear();
    },
  });
}

export function useSignUp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.signUp,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}
