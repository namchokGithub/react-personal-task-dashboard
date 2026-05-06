import { Button } from "../ui/Button";
import type {
  TaskFilterPriority,
  TaskFilterStatus,
  TaskFilters,
  TaskSort,
  TaskSortDirection,
} from "../../types/task";

export interface TaskFiltersPanelProps {
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
  onReset: () => void;
  onSortChange: (sort: TaskSort) => void;
  resultCount: number;
  sort: TaskSort;
  totalCount: number;
}

const statusOptions: Array<{ label: string; value: TaskFilterStatus }> = [
  { label: "All statuses", value: "all" },
  { label: "Todo", value: "todo" },
  { label: "In Progress", value: "in_progress" },
  { label: "Done", value: "done" },
];

const priorityOptions: Array<{ label: string; value: TaskFilterPriority }> = [
  { label: "All priorities", value: "all" },
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

const sortDirectionOptions: Array<{ label: string; value: TaskSortDirection }> = [
  { label: "Due date first", value: "asc" },
  { label: "Due date last", value: "desc" },
];

export function TaskFiltersPanel({
  filters,
  onFiltersChange,
  onReset,
  onSortChange,
  resultCount,
  sort,
  totalCount,
}: TaskFiltersPanelProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))_auto] xl:items-end">
        <label className="space-y-1.5">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Search</span>
          <input
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:ring-slate-800"
            onChange={(event) => onFiltersChange({ ...filters, search: event.target.value })}
            placeholder="Search by title"
            value={filters.search}
          />
        </label>

        <label className="space-y-1.5">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Status</span>
          <select
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
            onChange={(event) =>
              onFiltersChange({ ...filters, status: event.target.value as TaskFilterStatus })
            }
            value={filters.status}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1.5">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Priority</span>
          <select
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
            onChange={(event) =>
              onFiltersChange({ ...filters, priority: event.target.value as TaskFilterPriority })
            }
            value={filters.priority}
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1.5">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Sort</span>
          <select
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
            onChange={(event) =>
              onSortChange({ ...sort, direction: event.target.value as TaskSortDirection })
            }
            value={sort.direction}
          >
            {sortDirectionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <Button
          className="sm:col-span-2 xl:col-span-1 xl:min-w-28"
          onClick={onReset}
          variant="secondary"
        >
          Clear
        </Button>
      </div>

      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
        Showing {resultCount} of {totalCount} tasks
      </p>
    </section>
  );
}
