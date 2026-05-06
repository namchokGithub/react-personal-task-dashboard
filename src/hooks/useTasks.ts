import { useEffect, useState } from "react";
import { mockTasks } from "../data/mockTasks";
import type { Task } from "../types/task";
import { getStorageItem, setStorageItem } from "../utils/storage";

const TASKS_STORAGE_KEY = "personal-task-dashboard:tasks";

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

  function resetTasks(): void {
    setTasksState(mockTasks);
  }

  return {
    tasks,
    getTasks,
    setTasks,
    resetTasks,
  };
}
