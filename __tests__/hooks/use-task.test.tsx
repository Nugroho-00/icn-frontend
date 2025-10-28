import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  useCreateTask,
  useTasks,
  useDeleteTask,
  useUpdateTask,
  useSummaryTask,
} from "@/hooks/use-task";
import { taskService } from "@/lib/services";
import type { TaskRequest, UpdateTaskRequest } from "@/types";

// Mock the task service
jest.mock("@/lib/services", () => ({
  taskService: {
    createTask: jest.fn(),
    getTasks: jest.fn(),
    deleteTask: jest.fn(),
    updateTask: jest.fn(),
    getTaskSummary: jest.fn(),
  },
}));

const mockedTaskService = taskService as jest.Mocked<typeof taskService>;

// Helper to create a wrapper with QueryClient
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  Wrapper.displayName = "TestQueryClientWrapper";

  return Wrapper;
};

describe("Task Hooks", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("useCreateTask", () => {
    it("should create task successfully", async () => {
      const mockTask: TaskRequest = {
        title: "New Task",
        description: "Description",
        status: "todo",
        due_date: "2025-12-31",
      };

      const mockResponse = { id: "1", ...mockTask };
      mockedTaskService.createTask.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useCreateTask(), {
        wrapper: createWrapper(),
      });

      result.current.mutate(mockTask);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockedTaskService.createTask).toHaveBeenCalled();
      expect(result.current.data).toEqual(mockResponse);
    });

    it("should handle create task error", async () => {
      const mockTask: TaskRequest = {
        title: "New Task",
        description: "Description",
        status: "todo",
        due_date: "2025-12-31",
      };

      const mockError = new Error("Create failed");
      mockedTaskService.createTask.mockRejectedValue(mockError);

      const { result } = renderHook(() => useCreateTask(), {
        wrapper: createWrapper(),
      });

      result.current.mutate(mockTask);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });

  describe("useTasks", () => {
    it("should fetch tasks successfully", async () => {
      const mockResponse = {
        success: true,
        statusCode: 200,
        message: "Success",
        data: [
          {
            id: "1",
            user_id: "1",
            title: "Test Task",
            description: "Test",
            status: "todo" as const,
            due_date: "2025-12-31",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            task_id: "1",
          },
        ],
        timestamp: new Date().toISOString(),
        path: "/api/task",
        meta: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      } as const;

      mockedTaskService.getTasks.mockResolvedValue(mockResponse as never);

      const { result } = renderHook(
        () => useTasks([], { pageIndex: 0, pageSize: 10 }),
        {
          wrapper: createWrapper(),
        }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockedTaskService.getTasks).toHaveBeenCalled();
      expect(result.current.data).toEqual(mockResponse);
    });

    it("should apply filters correctly", async () => {
      const mockResponse = {
        success: true,
        statusCode: 200,
        message: "Success",
        data: [],
        timestamp: new Date().toISOString(),
        path: "/api/task",
        meta: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      } as const;

      mockedTaskService.getTasks.mockResolvedValue(mockResponse as never);

      const filters = [
        { id: "title", value: "search term" },
        { id: "status", value: "in_progress" },
      ];

      const { result } = renderHook(
        () => useTasks(filters, { pageIndex: 0, pageSize: 10 }),
        {
          wrapper: createWrapper(),
        }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockedTaskService.getTasks).toHaveBeenCalledWith(
        expect.objectContaining({
          search: "search term",
          status: "in_progress",
          page: 1,
          limit: 10,
        })
      );
    });
  });

  describe("useDeleteTask", () => {
    it("should delete task successfully", async () => {
      const taskId = "123";
      const mockResponse = { success: true };
      mockedTaskService.deleteTask.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useDeleteTask(), {
        wrapper: createWrapper(),
      });

      result.current.mutate(taskId);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockedTaskService.deleteTask).toHaveBeenCalled();
      expect(mockedTaskService.deleteTask.mock.calls[0][0]).toBe(taskId);
    });

    it("should handle delete task error", async () => {
      const taskId = "123";
      const mockError = new Error("Delete failed");
      mockedTaskService.deleteTask.mockRejectedValue(mockError);

      const { result } = renderHook(() => useDeleteTask(), {
        wrapper: createWrapper(),
      });

      result.current.mutate(taskId);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });

  describe("useUpdateTask", () => {
    it("should update task successfully", async () => {
      const taskId = "123";
      const updateData: UpdateTaskRequest = {
        title: "Updated Title",
        status: "done",
      };

      const mockResponse = { id: taskId, ...updateData };
      mockedTaskService.updateTask.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useUpdateTask(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({ id: taskId, body: updateData });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockedTaskService.updateTask).toHaveBeenCalledWith(
        taskId,
        updateData
      );
    });

    it("should handle update task error", async () => {
      const taskId = "123";
      const updateData: UpdateTaskRequest = {
        title: "Updated Title",
      };

      const mockError = new Error("Update failed");
      mockedTaskService.updateTask.mockRejectedValue(mockError);

      const { result } = renderHook(() => useUpdateTask(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({ id: taskId, body: updateData });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });

  describe("useSummaryTask", () => {
    it("should fetch task summary successfully", async () => {
      const mockSummary = {
        todo: {
          data: [],
          meta: {
            page: 1,
            limit: 10,
            total: 5,
            totalPages: 1,
            hasNextPage: false,
            hasPreviousPage: false,
          },
        },
        in_progress: {
          data: [],
          meta: {
            page: 1,
            limit: 10,
            total: 3,
            totalPages: 1,
            hasNextPage: false,
            hasPreviousPage: false,
          },
        },
        done: {
          data: [],
          meta: {
            page: 1,
            limit: 10,
            total: 10,
            totalPages: 1,
            hasNextPage: false,
            hasPreviousPage: false,
          },
        },
        total: 18,
      };

      mockedTaskService.getTaskSummary.mockResolvedValue(mockSummary);

      const { result } = renderHook(() => useSummaryTask(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockedTaskService.getTaskSummary).toHaveBeenCalled();
      expect(result.current.data).toEqual(mockSummary);
    });

    it("should handle fetch summary error", async () => {
      const mockError = new Error("Fetch failed");
      mockedTaskService.getTaskSummary.mockRejectedValue(mockError);

      const { result } = renderHook(() => useSummaryTask(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });
});
