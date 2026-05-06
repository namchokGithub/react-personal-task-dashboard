import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import type { ActiveTaskStatus, Task, TaskPriority, TaskStatus } from "../../types/task";

export interface TaskCardProps {
  onArchive: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (taskId: string, status: ActiveTaskStatus) => void;
  task: Task;
}

const priorityLabel: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const statusLabel: Record<TaskStatus, string> = {
  todo: "Todo",
  in_progress: "In Progress",
  done: "Done",
  backlog: "Backlog",
};

const priorityVariant: Record<TaskPriority, "neutral" | "warning" | "danger"> = {
  low: "neutral",
  medium: "warning",
  high: "danger",
};

const statusVariant: Record<TaskStatus, "neutral" | "info" | "success"> = {
  todo: "neutral",
  in_progress: "info",
  done: "success",
  backlog: "neutral",
};

export function TaskCard({ onArchive, onEdit, onStatusChange, task }: TaskCardProps) {
  return (
    <Card className="p-4">
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-950 dark:text-slate-50">
            {task.title}
          </h3>
          {task.description ? (
            <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
              {task.description}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant={priorityVariant[task.priority]}>{priorityLabel[task.priority]}</Badge>
          <Badge variant={statusVariant[task.status]}>{statusLabel[task.status]}</Badge>
        </div>

        {task.dueDate ? (
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Due {task.dueDate}
          </p>
        ) : null}

        <label className="block space-y-1.5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Move status
          </span>
          <select
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-slate-500 dark:focus:ring-slate-800"
            onChange={(event) => onStatusChange(task.id, event.target.value as ActiveTaskStatus)}
            value={task.status}
          >
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </label>

        <div className="grid gap-2 border-t border-slate-100 pt-3 dark:border-slate-800 sm:grid-cols-2">
          <Button className="min-h-9 px-3" onClick={() => onEdit(task)} variant="ghost">
            Edit
          </Button>
          <Button
            className="min-h-9 px-3"
            onClick={() => onArchive(task.id)}
            variant="ghost"
          >
            Backlog
          </Button>
        </div>
      </div>
    </Card>
  );
}
