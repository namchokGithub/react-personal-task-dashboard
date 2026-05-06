import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { TaskColumn } from "./TaskColumn";
import type { ActiveTaskStatus, Task } from "../../types/task";

export interface KanbanBoardProps {
  onArchiveTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
  onStatusChange: (
    taskId: string,
    status: ActiveTaskStatus,
  ) => void | Promise<void>;
  tasks: Task[];
}

const columns: Array<{ title: string; status: ActiveTaskStatus }> = [
  { title: "Todo", status: "todo" },
  { title: "In Progress", status: "in_progress" },
  { title: "Done", status: "done" },
];

function isActiveTaskStatus(value: string): value is ActiveTaskStatus {
  return value === "todo" || value === "in_progress" || value === "done";
}

export function KanbanBoard({
  onArchiveTask,
  onEditTask,
  onStatusChange,
  tasks,
}: KanbanBoardProps) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = String(active.id);
    const newStatus = String(over.id);

    if (!isActiveTaskStatus(newStatus)) return;

    void onStatusChange(taskId, newStatus);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
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
    </DndContext>
  );
}
