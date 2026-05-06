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
    <section className="min-h-80 rounded-lg border border-slate-200 bg-slate-100/70 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600">
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
