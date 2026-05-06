import { useState } from "react";
import { KanbanBoard } from "../components/task/KanbanBoard";
import { TaskFiltersPanel } from "../components/task/TaskFiltersPanel";
import { TaskForm } from "../components/task/TaskForm";
import { Button } from "../components/ui/Button";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { EmptyState } from "../components/ui/EmptyState";
import { useTasks } from "../hooks/useTasks";
import type { Task, TaskFilters, TaskSort, UpdateTaskInput } from "../types/task";
import { filterAndSortTasks } from "../utils/taskUtils";

const defaultFilters: TaskFilters = {
  search: "",
  status: "all",
  priority: "all",
};

const defaultSort: TaskSort = {
  sortBy: "dueDate",
  direction: "asc",
};

export function TasksPage() {
  const {
    addTask,
    archiveAllTasks,
    archiveTask,
    changeTaskStatus,
    error,
    isLoading,
    tasks,
    updateTask,
  } = useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [pendingFormValues, setPendingFormValues] = useState<UpdateTaskInput | undefined>();
  const [filters, setFilters] = useState<TaskFilters>(defaultFilters);
  const [sort, setSort] = useState<TaskSort>(defaultSort);

  const visibleTasks = filterAndSortTasks(tasks, filters, sort);
  const hasActiveFilters =
    filters.search.trim() !== "" || filters.status !== "all" || filters.priority !== "all";
  const shouldShowEmptyState = !isLoading && visibleTasks.length === 0;

  function openAddForm() {
    setEditingTask(undefined);
    setIsFormOpen(true);
  }

  function openEditForm(task: Task) {
    setEditingTask(task);
    setIsFormOpen(true);
  }

  function closeForm() {
    setEditingTask(undefined);
    setIsFormOpen(false);
  }

  function handleSubmit(values: UpdateTaskInput) {
    setPendingFormValues(values);
  }

  async function confirmSaveTask() {
    if (!pendingFormValues) {
      return;
    }

    if (editingTask) {
      await updateTask(editingTask.id, pendingFormValues);
    } else {
      await addTask(pendingFormValues);
    }

    setPendingFormValues(undefined);
    closeForm();
  }

  function cancelSaveTask() {
    setPendingFormValues(undefined);
  }

  function resetFilters() {
    setFilters(defaultFilters);
    setSort(defaultSort);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-50">Tasks</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            A Kanban-ready structure prepared for future task actions.
          </p>
        </div>

        <div className="grid gap-2 sm:flex sm:flex-row">
          <Button onClick={openAddForm}>Add task</Button>
          <Button onClick={archiveAllTasks} variant="secondary">
            Move all to backlog
          </Button>
        </div>
      </div>

      {isFormOpen ? (
        <TaskForm initialTask={editingTask} onCancel={closeForm} onSubmit={handleSubmit} />
      ) : null}

      {error ? (
        <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-300">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-6 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          Loading tasks from Firestore...
        </div>
      ) : null}

      <TaskFiltersPanel
        filters={filters}
        onFiltersChange={setFilters}
        onReset={resetFilters}
        onSortChange={setSort}
        resultCount={visibleTasks.length}
        sort={sort}
        totalCount={tasks.length}
      />

      {shouldShowEmptyState ? (
        <EmptyState
          action={
            hasActiveFilters ? (
              <Button onClick={resetFilters} variant="secondary">
                Clear filters
              </Button>
            ) : (
              <Button onClick={openAddForm}>Add your first task</Button>
            )
          }
          description={
            hasActiveFilters
              ? "Adjust your search or filters to bring tasks back into view."
              : "Create a task to start filling your active board."
          }
          title={hasActiveFilters ? "No tasks match your filters" : "No active tasks yet"}
        />
      ) : (
        <KanbanBoard
          onArchiveTask={archiveTask}
          onEditTask={openEditForm}
          onStatusChange={changeTaskStatus}
          tasks={visibleTasks}
        />
      )}

      <ConfirmDialog
        confirmLabel={editingTask ? "Save changes" : "Add task"}
        description={
          editingTask
            ? "Confirm that you want to save these changes to Firestore."
            : "Confirm that you want to create this task in Firestore."
        }
        isOpen={Boolean(pendingFormValues)}
        onCancel={cancelSaveTask}
        onConfirm={confirmSaveTask}
        title={editingTask ? "Save task changes?" : "Add this task?"}
      />
    </div>
  );
}
