import { ApiResponse, MetaPagination } from "./api";

export type TaskStatus = "todo" | "in_progress" | "done";

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

export type TaskParams = {
  search: string;
  status: TaskStatus;
  dueDateFrom: string;
  dueDateTo: string;
  limit: number;
  page: number;
};
