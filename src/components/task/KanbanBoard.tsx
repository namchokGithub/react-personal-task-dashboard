import { TaskColumn } from "./TaskColumn";
import type { ActiveTaskStatus, Task } from "../../types/task";

export interface KanbanBoardProps {
  onArchiveTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
  onStatusChange: (taskId: string, status: ActiveTaskStatus) => void;
  tasks: Task[];
}

const columns: Array<{ title: string; status: ActiveTaskStatus }> = [
  { title: "Todo", status: "todo" },
  { title: "In Progress", status: "in_progress" },
  { title: "Done", status: "done" },
];

export function KanbanBoard({
  onArchiveTask,
  onEditTask,
  onStatusChange,
  tasks,
}: KanbanBoardProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {columns.map((column) => (
        <TaskColumn
          key={column.status}
          onArchiveTask={onArchiveTask}
          onEditTask={onEditTask}
          onStatusChange={onStatusChange}
          status={column.status}
          tasks={tasks}
          title={column.title}
        />
      ))}
    </div>
  );
}
