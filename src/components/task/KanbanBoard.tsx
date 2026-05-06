import { TaskColumn } from "./TaskColumn";
import type { Task, TaskStatus } from "../../types/task";

interface KanbanBoardProps {
  tasks: Task[];
}

const columns: Array<{ title: string; status: TaskStatus }> = [
  { title: "Todo", status: "todo" },
  { title: "In Progress", status: "in_progress" },
  { title: "Done", status: "done" },
];

export function KanbanBoard({ tasks }: KanbanBoardProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {columns.map((column) => (
        <TaskColumn
          key={column.status}
          status={column.status}
          tasks={tasks}
          title={column.title}
        />
      ))}
    </div>
  );
}
