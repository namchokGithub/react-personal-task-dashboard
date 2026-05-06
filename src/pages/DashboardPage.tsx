import { Card } from "../components/ui/Card";
import { useTasks } from "../hooks/useTasks";
import {
  getCompletedTasks,
  getPendingTasks,
  getTotalTasks,
  getUpcomingDueTasks,
} from "../utils/taskUtils";

const summaryCardClasses = "min-h-32";

export function DashboardPage() {
  const { tasks } = useTasks();

  const summaries = [
    { label: "Total Tasks", value: getTotalTasks(tasks), detail: "All tracked tasks" },
    { label: "Completed", value: getCompletedTasks(tasks), detail: "Tasks marked done" },
    { label: "Pending", value: getPendingTasks(tasks), detail: "Todo or in progress" },
    { label: "Upcoming Due", value: getUpcomingDueTasks(tasks), detail: "Due in the next 7 days" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-950">Dashboard</h2>
        <p className="mt-1 text-sm text-slate-500">
          A quick overview of your current personal task load.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaries.map((summary) => (
          <Card className={summaryCardClasses} key={summary.label}>
            <p className="text-sm font-medium text-slate-500">{summary.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">{summary.value}</p>
            <p className="mt-2 text-sm text-slate-500">{summary.detail}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
