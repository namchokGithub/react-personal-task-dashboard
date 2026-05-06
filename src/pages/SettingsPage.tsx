import { Card } from "../components/ui/Card";
import { ThemeToggle } from "../components/ui/ThemeToggle";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import {
  badgeVariantOptions,
  usePrioritySettings,
  type PrioritySetting,
} from "../hooks/usePrioritySettings";
import type { TaskPriority } from "../types/task";
import { ToastContainer } from "../components/ui/ToastContainer";
import { useToast } from "../hooks/useToast";

const priorityRows: Array<{
  helper: string;
  key: TaskPriority;
  title: string;
}> = [
  {
    helper: "Used for low effort or non-urgent work.",
    key: "low",
    title: "Low priority",
  },
  {
    helper: "Used for normal day-to-day tasks.",
    key: "medium",
    title: "Medium priority",
  },
  {
    helper: "Used for urgent or important tasks.",
    key: "high",
    title: "High priority",
  },
];

export function SettingsPage() {
  const { toasts, showToast, removeToast } = useToast();
  const { prioritySettings, resetPrioritySettings, updatePrioritySetting } =
    usePrioritySettings();

  function updateLabel(priority: TaskPriority, label: string) {
    updatePrioritySetting(priority, {
      ...prioritySettings[priority],
      label,
    });

    showToast({
      type: "success",
      title: "Priority label updated",
      message: `${priority} priority label has been updated.`,
    });
  }

  function updateVariant(
    priority: TaskPriority,
    variant: PrioritySetting["variant"],
  ) {
    updatePrioritySetting(priority, {
      ...prioritySettings[priority],
      variant,
    });

    showToast({
      type: "success",
      title: "Priority variant updated",
      message: `${priority} priority variant has been updated.`,
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-50">
          Settings
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Placeholder settings area for future preferences and data controls.
        </p>
      </div>

      <Card>
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-semibold text-slate-950 dark:text-slate-50">
              App preferences
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Theme controls and dashboard defaults can live here.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Appearance
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Switch between light and dark mode.
              </p>
            </div>
            <ThemeToggle />
          </div>

          <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Priority labels
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Customize the label and badge color used across task cards,
                  forms, filters, and backlog.
                </p>
              </div>
              <Button onClick={resetPrioritySettings} variant="secondary">
                Reset
              </Button>
            </div>

            <div className="grid gap-3">
              {priorityRows.map((priorityRow) => {
                const setting = prioritySettings[priorityRow.key];

                return (
                  <div
                    className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 transition duration-200 hover:border-slate-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 lg:grid-cols-[minmax(0,1fr)_minmax(10rem,14rem)_minmax(9rem,12rem)_auto] lg:items-center"
                    key={priorityRow.key}>
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        {priorityRow.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {priorityRow.helper}
                      </p>
                    </div>

                    <label className="space-y-1.5">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        Label
                      </span>
                      <input
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:ring-slate-800"
                        maxLength={24}
                        onChange={(event) =>
                          updateLabel(priorityRow.key, event.target.value)
                        }
                        value={setting.label}
                      />
                    </label>

                    <label className="space-y-1.5">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        Color
                      </span>
                      <select
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
                        onChange={(event) =>
                          updateVariant(
                            priorityRow.key,
                            event.target.value as PrioritySetting["variant"],
                          )
                        }
                        value={setting.variant}>
                        {badgeVariantOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <div className="flex lg:justify-end">
                      <Badge variant={setting.variant}>{setting.label}</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
