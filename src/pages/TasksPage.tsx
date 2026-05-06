import { KanbanBoard } from "../components/task/KanbanBoard";
import { Button } from "../components/ui/Button";
import { useTasks } from "../hooks/useTasks";

export function TasksPage() {
  const { tasks, resetTasks } = useTasks();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">Tasks</h2>
          <p className="mt-1 text-sm text-slate-500">
            A Kanban-ready structure prepared for future task actions.
          </p>
        </div>

        <Button onClick={resetTasks} variant="secondary">
          Reset mock tasks
        </Button>
      </div>

      <KanbanBoard tasks={tasks} />
    </div>
  );
}
