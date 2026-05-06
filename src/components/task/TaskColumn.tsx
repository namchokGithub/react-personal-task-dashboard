import { EmptyState } from "../ui/EmptyState";
import { TaskCard } from "./TaskCard";
import type { ActiveTaskStatus, Task } from "../../types/task";

export interface TaskColumnProps {
  onArchiveTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
  onStatusChange: (taskId: string, status: ActiveTaskStatus) => void;
  title: string;
  status: ActiveTaskStatus;
  tasks: Task[];
}

export function TaskColumn({
  onArchiveTask,
  onEditTask,
  onStatusChange,
  title,
  status,
  tasks,
}: TaskColumnProps) {
  const columnTasks = tasks.filter((task) => task.status === status);

  return (
    <section className="min-h-80 min-w-[18rem] rounded-lg border border-slate-200 bg-slate-100/70 p-4 transition duration-200 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-slate-700 sm:min-w-[20rem] lg:min-w-0">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-950 dark:text-slate-50">{title}</h2>
        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600 shadow-sm transition-colors dark:bg-slate-800 dark:text-slate-300">
          {columnTasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {columnTasks.length > 0 ? (
          columnTasks.map((task) => (
            <TaskCard
              key={task.id}
              onArchive={onArchiveTask}
              onEdit={onEditTask}
              onStatusChange={onStatusChange}
              task={task}
            />
          ))
        ) : (
          <EmptyState title="No tasks yet" description="New tasks will appear here." />
        )}
      </div>
    </section>
  );
}
