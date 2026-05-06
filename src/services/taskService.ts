import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  type FirestoreError,
  type Unsubscribe,
} from "firebase/firestore";
import { firestoreDb } from "../lib/firebase";
import type { Task } from "../types/task";

const TASKS_COLLECTION = "tasks";

interface SubscribeToTasksOptions {
  onError: (error: FirestoreError) => void;
  onNext: (tasks: Task[]) => void;
}

function getTasksCollection() {
  if (!firestoreDb) {
    return undefined;
  }

  return collection(firestoreDb, TASKS_COLLECTION);
}

function toFirestoreTask(task: Task): Omit<Task, "description" | "dueDate"> &
  Partial<Pick<Task, "description" | "dueDate">> {
  return {
    id: task.id,
    title: task.title,
    ...(task.description ? { description: task.description } : {}),
    status: task.status,
    priority: task.priority,
    ...(task.dueDate ? { dueDate: task.dueDate } : {}),
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
}

export function subscribeToTasks({ onError, onNext }: SubscribeToTasksOptions): Unsubscribe {
  const tasksCollection = getTasksCollection();

  if (!tasksCollection) {
    return () => undefined;
  }

  const tasksQuery = query(tasksCollection, orderBy("createdAt", "desc"));

  return onSnapshot(
    tasksQuery,
    (snapshot) => {
      const tasks = snapshot.docs.map((document) => ({
        ...(document.data() as Omit<Task, "id">),
        id: document.id,
      }));

      onNext(tasks);
    },
    onError,
  );
}

export async function saveTask(task: Task): Promise<void> {
  const tasksCollection = getTasksCollection();

  if (!tasksCollection) {
    return;
  }

  await setDoc(doc(tasksCollection, task.id), toFirestoreTask(task));
}

export async function deleteTaskDocument(taskId: string): Promise<void> {
  const tasksCollection = getTasksCollection();

  if (!tasksCollection) {
    return;
  }

  await deleteDoc(doc(tasksCollection, taskId));
}
