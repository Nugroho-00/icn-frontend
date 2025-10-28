import { useMutation, useQueryClient } from "@tanstack/react-query";
import { aiService } from "@/lib/services";

export function useSendSuggestionContext() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: aiService.sendContext,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ai"] }),
  });
}
