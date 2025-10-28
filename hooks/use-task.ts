import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { taskService } from "@/lib/services";
import type { UpdateTaskRequest, TaskParams } from "@/types";
import { ColumnFiltersState, PaginationState } from "@tanstack/react-table";

function mapColumnFiltersToTaskParams(
  columnFilters: { id: string; value: unknown }[],
  pagination: PaginationState
): Partial<TaskParams> {
  const params: Partial<TaskParams> = {};

  for (const filter of columnFilters) {
    switch (filter.id) {
      case "title":
        // Only add search param if not empty
        const searchValue = String(filter.value ?? "").trim();
        if (searchValue) {
          params.search = searchValue;
        }
        break;
      case "status":
        // Handle array of statuses or single status
        if (Array.isArray(filter.value) && filter.value.length > 0) {
          params.status = filter.value[0] as TaskParams["status"];
        } else if (filter.value) {
          params.status = filter.value as TaskParams["status"];
        }
        break;
      case "dueDateFrom":
        const dueDateFrom = String(filter.value ?? "").trim();
        if (dueDateFrom) {
          params.dueDateFrom = dueDateFrom;
        }
        break;
      case "dueDateTo":
        const dueDateTo = String(filter.value ?? "").trim();
        if (dueDateTo) {
          params.dueDateTo = dueDateTo;
        }
        break;
      default:
        break;
    }
  }

  // pagination defaults
  params.page = pagination.pageIndex + 1;
  params.limit = pagination.pageSize;

  return params;
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: taskService.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
  });
}

export function useTasks(
  filters: ColumnFiltersState,
  pagination: PaginationState
) {
  const params = mapColumnFiltersToTaskParams(filters, pagination);
  console.log({ params });

  return useQuery({
    queryKey: ["task", params],
    queryFn: () => {
      return taskService.getTasks(params);
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: taskService.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateTaskRequest }) =>
      taskService.updateTask(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
  });
}

export function useSummaryTask() {
  return useQuery({
    queryKey: ["summary"],
    queryFn: () => taskService.getTaskSummary(),
  });
}
