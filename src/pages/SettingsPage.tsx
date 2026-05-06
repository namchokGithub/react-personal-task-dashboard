import { Card } from "../components/ui/Card";

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-950">Settings</h2>
        <p className="mt-1 text-sm text-slate-500">
          Placeholder settings area for future preferences and data controls.
        </p>
      </div>

      <Card>
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-semibold text-slate-950">App preferences</h3>
            <p className="mt-1 text-sm text-slate-500">
              Theme, reset-data controls, and dashboard defaults can live here later.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-700">Future settings</p>
            <p className="mt-1 text-sm text-slate-500">
              Dark mode, default task filters, and storage reset options are intentionally left
              as the next layer.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
