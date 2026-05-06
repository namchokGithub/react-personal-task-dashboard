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
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))_auto] lg:items-end">
        <label className="space-y-1.5">
          <span className="text-sm font-medium text-slate-700">Search</span>
          <input
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            onChange={(event) => onFiltersChange({ ...filters, search: event.target.value })}
            placeholder="Search by title"
            value={filters.search}
          />
        </label>

        <label className="space-y-1.5">
          <span className="text-sm font-medium text-slate-700">Status</span>
          <select
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
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
          <span className="text-sm font-medium text-slate-700">Priority</span>
          <select
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
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
          <span className="text-sm font-medium text-slate-700">Sort</span>
          <select
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
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

        <Button className="lg:min-w-28" onClick={onReset} variant="secondary">
          Clear
        </Button>
      </div>

      <p className="mt-3 text-sm text-slate-500">
        Showing {resultCount} of {totalCount} tasks
      </p>
    </section>
  );
}
