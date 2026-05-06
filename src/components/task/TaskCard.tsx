import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import type { Task, TaskPriority, TaskStatus } from "../../types/task";

interface TaskCardProps {
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

export function TaskCard({ task }: TaskCardProps) {
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
      </div>
    </Card>
  );
}
