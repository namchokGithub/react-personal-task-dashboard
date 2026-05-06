import { useState } from "react";
import { EmptyState } from "../components/ui/EmptyState";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { useTasks } from "../hooks/useTasks";
import type { Task, TaskPriority } from "../types/task";

const priorityLabel: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export function BacklogPage() {
  const { deleteTask, error, isLoading, restoreTask, tasks } = useTasks();
  const [taskToDelete, setTaskToDelete] = useState<Task | undefined>();
  const backlogTasks = tasks.filter((task) => task.status === "backlog");

  async function confirmDeleteTask() {
    if (!taskToDelete) {
      return;
    }

    await deleteTask(taskToDelete.id);
    setTaskToDelete(undefined);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-50">Backlog</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Tasks moved out of the active board stay here until you restore or delete them.
        </p>
      </div>

      {error ? (
        <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-300">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-6 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          Loading backlog from Firestore...
        </div>
      ) : null}

      <div className="space-y-3">
        {backlogTasks.length > 0 ? (
          backlogTasks.map((task) => (
            <Card className="p-4" key={task.id}>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                    {task.title}
                  </h3>
                  {task.description ? (
                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {task.description}
                    </p>
                  ) : null}
                  <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                    Priority: {priorityLabel[task.priority]}
                    {task.dueDate ? ` · Due ${task.dueDate}` : ""}
                  </p>
                </div>

                <div className="grid gap-2 sm:grid-cols-2 md:flex md:flex-row">
                  <Button onClick={() => restoreTask(task.id)} variant="secondary">
                    Restore
                  </Button>
                  <Button
                    className="text-rose-600 hover:text-rose-700"
                    onClick={() => setTaskToDelete(task)}
                    variant="ghost"
                  >
                    Delete permanently
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <EmptyState title="No backlog tasks" description="Archived tasks will appear here." />
        )}
      </div>

      <ConfirmDialog
        confirmLabel="Delete permanently"
        description={
          taskToDelete
            ? `This will permanently delete "${taskToDelete.title}" from Firestore. This action cannot be undone.`
            : ""
        }
        isDanger
        isOpen={Boolean(taskToDelete)}
        onCancel={() => setTaskToDelete(undefined)}
        onConfirm={confirmDeleteTask}
        title="Delete this task permanently?"
      />
    </div>
  );
}
