import { Card } from "../components/ui/Card";
import { ThemeToggle } from "../components/ui/ThemeToggle";

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-50">Settings</h2>
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

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Future settings
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Default task filters and dashboard preferences can be added here later.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
