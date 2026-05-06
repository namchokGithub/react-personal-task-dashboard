import { TaskColumn } from "./TaskColumn";
import type { Task, TaskStatus } from "../../types/task";

export interface KanbanBoardProps {
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  tasks: Task[];
}

const columns: Array<{ title: string; status: TaskStatus }> = [
  { title: "Todo", status: "todo" },
  { title: "In Progress", status: "in_progress" },
  { title: "Done", status: "done" },
];

export function KanbanBoard({
  onDeleteTask,
  onEditTask,
  onStatusChange,
  tasks,
}: KanbanBoardProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {columns.map((column) => (
        <TaskColumn
          key={column.status}
          onDeleteTask={onDeleteTask}
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
