export type TaskStatus = "todo" | "in_progress" | "done";

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormValues {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

export type TaskFilterStatus = TaskStatus | "all";
export type TaskFilterPriority = TaskPriority | "all";
export type TaskSortBy = "createdAt" | "dueDate" | "priority";
export type TaskSortDirection = "asc" | "desc";

export interface TaskFilters {
  search: string;
  status: TaskFilterStatus;
  priority: TaskFilterPriority;
}

export interface TaskSort {
  sortBy: TaskSortBy;
  direction: TaskSortDirection;
}

export type CreateTaskInput = TaskFormValues;
export type UpdateTaskInput = TaskFormValues;
