import { useState } from "react";
import { KanbanBoard } from "../components/task/KanbanBoard";
import { TaskFiltersPanel } from "../components/task/TaskFiltersPanel";
import { TaskForm } from "../components/task/TaskForm";
import { Button } from "../components/ui/Button";
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
  const { addTask, changeTaskStatus, deleteTask, resetTasks, tasks, updateTask } = useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [filters, setFilters] = useState<TaskFilters>(defaultFilters);
  const [sort, setSort] = useState<TaskSort>(defaultSort);

  const visibleTasks = filterAndSortTasks(tasks, filters, sort);

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
    if (editingTask) {
      updateTask(editingTask.id, values);
    } else {
      addTask(values);
    }

    closeForm();
  }

  function resetFilters() {
    setFilters(defaultFilters);
    setSort(defaultSort);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">Tasks</h2>
          <p className="mt-1 text-sm text-slate-500">
            A Kanban-ready structure prepared for future task actions.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button onClick={openAddForm}>Add task</Button>
          <Button onClick={resetTasks} variant="secondary">
            Reset mock tasks
          </Button>
        </div>
      </div>

      {isFormOpen ? (
        <TaskForm initialTask={editingTask} onCancel={closeForm} onSubmit={handleSubmit} />
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

      <KanbanBoard
        onDeleteTask={deleteTask}
        onEditTask={openEditForm}
        onStatusChange={changeTaskStatus}
        tasks={visibleTasks}
      />
    </div>
  );
}
