import { useEffect, useState } from "react";
import { onAuthStateChanged, signInAnonymously, type Unsubscribe } from "firebase/auth";
import { firebaseAuth, hasFirebaseConfig } from "../lib/firebase";
import { deleteTaskDocument, saveTask, subscribeToTasks } from "../services/taskService";
import type { ActiveTaskStatus, CreateTaskInput, Task, TaskStatus, UpdateTaskInput } from "../types/task";

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
  const [tasks, setTasksState] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(hasFirebaseConfig);
  const [error, setError] = useState<string | undefined>(
    hasFirebaseConfig ? undefined : "Firebase config is missing. Add values to .env.",
  );

  useEffect(() => {
    if (!hasFirebaseConfig || !firebaseAuth) {
      setIsLoading(false);
      return;
    }

    const auth = firebaseAuth;
    let unsubscribeTasks: Unsubscribe | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        void signInAnonymously(auth).catch((authError: unknown) => {
          setError(authError instanceof Error ? authError.message : "Unable to sign in.");
          setIsLoading(false);
        });
        return;
      }

      unsubscribeTasks?.();
      unsubscribeTasks = subscribeToTasks({
        onError: (firestoreError) => {
          setError(firestoreError.message);
          setIsLoading(false);
        },
        onNext: (nextTasks) => {
          setTasksState(nextTasks);
          setIsLoading(false);
        },
      });
    });

    return () => {
      unsubscribeTasks?.();
      unsubscribeAuth();
    };
  }, []);

  async function persistTask(nextTask: Task): Promise<void> {
    if (!hasFirebaseConfig) {
      setError("Firebase config is missing. Add values to .env.");
      return;
    }

    await saveTask(nextTask);
  }

  async function addTask(values: CreateTaskInput): Promise<void> {
    try {
      setError(undefined);
      await persistTask(createTaskFromValues(values));
    } catch (taskError) {
      setError(taskError instanceof Error ? taskError.message : "Unable to add task.");
    }
  }

  async function updateTask(taskId: string, values: UpdateTaskInput): Promise<void> {
    const taskToUpdate = tasks.find((task) => task.id === taskId);

    if (!taskToUpdate) {
      return;
    }

    const nextTask: Task = {
      ...taskToUpdate,
      title: values.title.trim(),
      description: values.description.trim() || undefined,
      status: values.status,
      priority: values.priority,
      dueDate: values.dueDate || undefined,
      updatedAt: new Date().toISOString(),
    };

    if (!hasFirebaseConfig) {
      setError("Firebase config is missing. Add values to .env.");
      return;
    }

    try {
      setError(undefined);
      await saveTask(nextTask);
    } catch (taskError) {
      setError(taskError instanceof Error ? taskError.message : "Unable to update task.");
    }
  }

  async function changeTaskStatus(taskId: string, status: TaskStatus): Promise<void> {
    const taskToUpdate = tasks.find((task) => task.id === taskId);

    if (!taskToUpdate) {
      return;
    }

    const nextTask: Task = {
      ...taskToUpdate,
      status,
      updatedAt: new Date().toISOString(),
    };

    if (!hasFirebaseConfig) {
      setError("Firebase config is missing. Add values to .env.");
      return;
    }

    try {
      setError(undefined);
      await saveTask(nextTask);
    } catch (taskError) {
      setError(taskError instanceof Error ? taskError.message : "Unable to change task status.");
    }
  }

  async function archiveTask(taskId: string): Promise<void> {
    await changeTaskStatus(taskId, "backlog");
  }

  async function archiveAllTasks(): Promise<void> {
    if (!hasFirebaseConfig) {
      setError("Firebase config is missing. Add values to .env.");
      return;
    }

    try {
      setError(undefined);
      await Promise.all(
        tasks
          .filter((task) => task.status !== "backlog")
          .map((task) =>
            saveTask({
              ...task,
              status: "backlog",
              updatedAt: new Date().toISOString(),
            }),
          ),
      );
    } catch (taskError) {
      setError(taskError instanceof Error ? taskError.message : "Unable to move tasks to backlog.");
    }
  }

  async function restoreTask(taskId: string, status: ActiveTaskStatus = "todo"): Promise<void> {
    await changeTaskStatus(taskId, status);
  }

  async function deleteTask(taskId: string): Promise<void> {
    if (!hasFirebaseConfig) {
      setError("Firebase config is missing. Add values to .env.");
      return;
    }

    try {
      setError(undefined);
      await deleteTaskDocument(taskId);
    } catch (taskError) {
      setError(taskError instanceof Error ? taskError.message : "Unable to delete task.");
    }
  }

  return {
    error,
    isLoading,
    tasks,
    addTask,
    archiveAllTasks,
    archiveTask,
    changeTaskStatus,
    deleteTask,
    restoreTask,
    updateTask,
  };
}
