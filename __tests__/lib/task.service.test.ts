import { taskService } from "@/lib/services/task.service";
import { me } from "@/lib/axios/me";
import { API_PATH } from "@/config";
import type { TaskRequest, UpdateTaskRequest, TaskParams } from "@/types";

// Mock axios instance
jest.mock("@/lib/axios/me");

const mockedMe = me as jest.Mocked<typeof me>;

describe("Task Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createTask", () => {
    it("should create a task successfully", async () => {
      const mockTask: TaskRequest = {
        title: "Test Task",
        description: "Test Description",
        status: "todo",
        due_date: "2025-12-31",
      };

      const mockResponse = {
        data: { id: "1", ...mockTask },
      };

      mockedMe.post.mockResolvedValue(mockResponse);

      const result = await taskService.createTask(mockTask);

      expect(mockedMe.post).toHaveBeenCalledWith(
        API_PATH.ME.TASK.BASE,
        mockTask
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle errors when creating a task", async () => {
      const mockTask: TaskRequest = {
        title: "Test Task",
        description: "Test Description",
        status: "todo",
        due_date: "2025-12-31",
      };

      const mockError = new Error("Network Error");
      mockedMe.post.mockRejectedValue(mockError);

      await expect(taskService.createTask(mockTask)).rejects.toThrow(
        "Network Error"
      );
    });
  });

  describe("getTasks", () => {
    it("should get tasks without params", async () => {
      const mockResponse = {
        data: {
          data: {
            items: [],
            total: 0,
            page: 1,
            limit: 10,
          },
        },
      };

      mockedMe.get.mockResolvedValue(mockResponse);

      const result = await taskService.getTasks();

      expect(mockedMe.get).toHaveBeenCalledWith(API_PATH.ME.TASK.BASE, {
        params: undefined,
      });
      expect(result).toEqual(mockResponse.data.data);
    });

    it("should get tasks with filter params", async () => {
      const params: Partial<TaskParams> = {
        status: "in_progress",
        search: "test",
        page: 1,
        limit: 10,
      };

      const mockResponse = {
        data: {
          data: {
            items: [{ id: "1", title: "Test Task" }],
            total: 1,
            page: 1,
            limit: 10,
          },
        },
      };

      mockedMe.get.mockResolvedValue(mockResponse);

      const result = await taskService.getTasks(params);

      expect(mockedMe.get).toHaveBeenCalledWith(API_PATH.ME.TASK.BASE, {
        params,
      });
      expect(result).toEqual(mockResponse.data.data);
    });
  });

  describe("getTaskSummary", () => {
    it("should get task summary successfully", async () => {
      const mockSummary = {
        todo: { data: [], meta: { page: 1, limit: 10, total: 5 } },
        in_progress: { data: [], meta: { page: 1, limit: 10, total: 3 } },
        done: { data: [], meta: { page: 1, limit: 10, total: 10 } },
        total: 18,
      };

      const mockResponse = {
        data: {
          data: mockSummary,
        },
      };

      mockedMe.get.mockResolvedValue(mockResponse);

      const result = await taskService.getTaskSummary();

      expect(mockedMe.get).toHaveBeenCalledWith(
        API_PATH.ME.TASK.STATUS_SUMMARY
      );
      expect(result).toEqual(mockSummary);
    });
  });

  describe("deleteTask", () => {
    it("should delete a task successfully", async () => {
      const taskId = "123";
      const mockResponse = {
        data: { success: true },
      };

      mockedMe.delete.mockResolvedValue(mockResponse);

      const result = await taskService.deleteTask(taskId);

      expect(mockedMe.delete).toHaveBeenCalledWith(
        `${API_PATH.ME.TASK.BASE}/${taskId}`
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle errors when deleting a task", async () => {
      const taskId = "123";
      const mockError = new Error("Delete failed");
      mockedMe.delete.mockRejectedValue(mockError);

      await expect(taskService.deleteTask(taskId)).rejects.toThrow(
        "Delete failed"
      );
    });
  });

  describe("updateTask", () => {
    it("should update a task successfully", async () => {
      const taskId = "123";
      const updateData: UpdateTaskRequest = {
        title: "Updated Task",
        status: "done",
      };

      const mockResponse = {
        data: { id: taskId, ...updateData },
      };

      mockedMe.patch.mockResolvedValue(mockResponse);

      const result = await taskService.updateTask(taskId, updateData);

      expect(mockedMe.patch).toHaveBeenCalledWith(
        `${API_PATH.ME.TASK.BASE}/${taskId}`,
        updateData
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle errors when updating a task", async () => {
      const taskId = "123";
      const updateData: UpdateTaskRequest = {
        title: "Updated Task",
      };

      const mockError = new Error("Update failed");
      mockedMe.patch.mockRejectedValue(mockError);

      await expect(taskService.updateTask(taskId, updateData)).rejects.toThrow(
        "Update failed"
      );
    });
  });
});
