import { me } from "@/lib/axios/me";
import { ApiResponse } from "@/lib/api/type";
import { MetaPagination } from "@/lib/api/type";
import { API_PATH } from "@/constant";
import { TaskParams } from "@/types";

export type TaskResponse = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: TaskStatus;
  due_date: string;
  created_at: string;
  updated_at: string;
  task_id: string;
};
export type TaskRequest = {
  title: string;
  description: string;
  status: TaskStatus;
  due_date: string;
};
export type TaskStatus = "todo" | "in_progress" | "done";

export type UpdateTaskRequest = Partial<TaskRequest>;

export interface TaskGroup {
  data: TaskResponse[];
  meta: MetaPagination;
}

export interface TaskListResponse extends ApiResponse<TaskResponse[]> {
  meta: MetaPagination;
}

export interface TaskSummary {
  todo: TaskGroup;
  in_progress: TaskGroup;
  done: TaskGroup;
  total: number;
}

export const task = {
  createTask: async (body: TaskRequest) =>
    await me.post(API_PATH.ME.TASK.BASE, body).then((r) => r.data),
  getTasks: async (params?: Partial<TaskParams> | undefined) =>
    await me
      .get(API_PATH.ME.TASK.BASE, { params })
      .then((r): TaskListResponse => r.data.data),
  getTaskSummary: async () =>
    await me
      .get(API_PATH.ME.TASK.BASE + "/status-summary")
      .then((r): TaskSummary => r.data.data),
  deleteTask: async (id: string) =>
    await me.delete(`${API_PATH.ME.TASK.BASE}/${id}`).then((r) => r.data),
  updateTask: async (id: string, body: UpdateTaskRequest) =>
    await me.patch(`${API_PATH.ME.TASK.BASE}/${id}`, body).then((r) => r.data),
};
