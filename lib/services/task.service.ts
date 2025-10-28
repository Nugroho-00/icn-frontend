import { me } from "@/lib/axios/me";
import { API_PATH } from "@/config";
import type {
  TaskRequest,
  UpdateTaskRequest,
  TaskListResponse,
  TaskSummary,
  TaskParams,
} from "@/types";

/**
 * Task Service
 * Handles all task-related API calls
 */
export const taskService = {
  /**
   * Create a new task
   */
  createTask: async (body: TaskRequest) =>
    await me.post(API_PATH.ME.TASK.BASE, body).then((r) => r.data),

  /**
   * Get list of tasks with optional filters
   */
  getTasks: async (params?: Partial<TaskParams> | undefined) =>
    await me
      .get(API_PATH.ME.TASK.BASE, { params })
      .then((r): TaskListResponse => r.data.data),

  /**
   * Get task summary by status
   */
  getTaskSummary: async () =>
    await me
      .get(API_PATH.ME.TASK.STATUS_SUMMARY)
      .then((r): TaskSummary => r.data.data),

  /**
   * Delete a task by ID
   */
  deleteTask: async (id: string) =>
    await me.delete(`${API_PATH.ME.TASK.BASE}/${id}`).then((r) => r.data),

  /**
   * Update a task by ID
   */
  updateTask: async (id: string, body: UpdateTaskRequest) =>
    await me.patch(`${API_PATH.ME.TASK.BASE}/${id}`, body).then((r) => r.data),
};
