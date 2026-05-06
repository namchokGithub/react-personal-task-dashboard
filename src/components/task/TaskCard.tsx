import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import type { Task, TaskPriority, TaskStatus } from "../../types/task";

export interface TaskCardProps {
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
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
};

export function TaskCard({ onDelete, onEdit, onStatusChange, task }: TaskCardProps) {
  return (
    <Card className="p-4">
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-950">{task.title}</h3>
          {task.description ? (
            <p className="mt-1 text-sm leading-6 text-slate-500">{task.description}</p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant={priorityVariant[task.priority]}>{priorityLabel[task.priority]}</Badge>
          <Badge variant={statusVariant[task.status]}>{statusLabel[task.status]}</Badge>
        </div>

        {task.dueDate ? (
          <p className="text-xs font-medium text-slate-500">Due {task.dueDate}</p>
        ) : null}

        <label className="block space-y-1.5">
          <span className="text-xs font-medium text-slate-500">Move status</span>
          <select
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            onChange={(event) => onStatusChange(task.id, event.target.value as TaskStatus)}
            value={task.status}
          >
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </label>

        <div className="flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-3">
          <Button className="min-h-9 px-3" onClick={() => onEdit(task)} variant="ghost">
            Edit
          </Button>
          <Button
            className="min-h-9 px-3 text-rose-600 hover:text-rose-700"
            onClick={() => onDelete(task.id)}
            variant="ghost"
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}
