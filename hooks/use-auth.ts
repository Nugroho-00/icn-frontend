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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["auth"] }),
  });
}

export function useSignUp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.signUp,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}
