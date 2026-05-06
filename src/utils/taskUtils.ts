import type { Task, TaskFilters, TaskSort } from "../types/task";

export function getTotalTasks(tasks: Task[]): number {
  return tasks.filter((task) => task.status !== "backlog").length;
}

export function getCompletedTasks(tasks: Task[]): number {
  return tasks.filter((task) => task.status === "done").length;
}

export function getPendingTasks(tasks: Task[]): number {
  return tasks.filter((task) => task.status !== "done" && task.status !== "backlog").length;
}

export function getUpcomingDueTasks(tasks: Task[]): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  return tasks.filter((task) => {
    if (!task.dueDate || task.status === "done" || task.status === "backlog") {
      return false;
    }

    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    return dueDate >= today && dueDate <= nextWeek;
  }).length;
}

function getDueDateTime(task: Task): number {
  if (!task.dueDate) {
    return Number.POSITIVE_INFINITY;
  }

  return new Date(task.dueDate).getTime();
}

export function filterAndSortTasks(tasks: Task[], filters: TaskFilters, sort: TaskSort): Task[] {
  const normalizedSearch = filters.search.trim().toLowerCase();

  const filteredTasks = tasks.filter((task) => {
    if (task.status === "backlog") {
      return false;
    }

    const matchesSearch =
      normalizedSearch.length === 0 || task.title.toLowerCase().includes(normalizedSearch);
    const matchesStatus = filters.status === "all" || task.status === filters.status;
    const matchesPriority = filters.priority === "all" || task.priority === filters.priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return [...filteredTasks].sort((firstTask, secondTask) => {
    const firstDueDate = getDueDateTime(firstTask);
    const secondDueDate = getDueDateTime(secondTask);
    const directionMultiplier = sort.direction === "asc" ? 1 : -1;

    return (firstDueDate - secondDueDate) * directionMultiplier;
  });
}
