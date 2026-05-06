import { useEffect, useState } from "react";
import { mockTasks } from "../data/mockTasks";
import type { CreateTaskInput, Task, TaskStatus, UpdateTaskInput } from "../types/task";
import { getStorageItem, setStorageItem } from "../utils/storage";

const TASKS_STORAGE_KEY = "personal-task-dashboard:tasks";

function createTaskId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `task-${Date.now()}`;
}

function createTaskFromValues(values: CreateTaskInput): Task {
  const now = new Date().toISOString();

  return {
    id: createTaskId(),
    title: values.title.trim(),
    description: values.description.trim() || undefined,
    status: values.status,
    priority: values.priority,
    dueDate: values.dueDate || undefined,
    createdAt: now,
    updatedAt: now,
  };
}

export function useTasks() {
  const [tasks, setTasksState] = useState<Task[]>(() =>
    getStorageItem<Task[]>(TASKS_STORAGE_KEY, mockTasks),
  );

  useEffect(() => {
    setStorageItem(TASKS_STORAGE_KEY, tasks);
  }, [tasks]);

  function getTasks(): Task[] {
    return tasks;
  }

  function setTasks(nextTasks: Task[]): void {
    setTasksState(nextTasks);
  }

  function addTask(values: CreateTaskInput): void {
    setTasksState((currentTasks) => [createTaskFromValues(values), ...currentTasks]);
  }

  function updateTask(taskId: string, values: UpdateTaskInput): void {
    setTasksState((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              title: values.title.trim(),
              description: values.description.trim() || undefined,
              status: values.status,
              priority: values.priority,
              dueDate: values.dueDate || undefined,
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    );
  }

  function deleteTask(taskId: string): void {
    setTasksState((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  }

  function changeTaskStatus(taskId: string, status: TaskStatus): void {
    setTasksState((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, status, updatedAt: new Date().toISOString() } : task,
      ),
    );
  }

  function resetTasks(): void {
    setTasksState(mockTasks);
  }

  return {
    tasks,
    getTasks,
    setTasks,
    addTask,
    updateTask,
    deleteTask,
    changeTaskStatus,
    resetTasks,
  };
}
