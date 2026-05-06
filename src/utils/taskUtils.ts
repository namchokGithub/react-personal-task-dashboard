import type { Task } from "../types/task";

export function getTotalTasks(tasks: Task[]): number {
  return tasks.length;
}

export function getCompletedTasks(tasks: Task[]): number {
  return tasks.filter((task) => task.status === "done").length;
}

export function getPendingTasks(tasks: Task[]): number {
  return tasks.filter((task) => task.status !== "done").length;
}

export function getUpcomingDueTasks(tasks: Task[]): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  return tasks.filter((task) => {
    if (!task.dueDate || task.status === "done") {
      return false;
    }

    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    return dueDate >= today && dueDate <= nextWeek;
  }).length;
}
