import { useEffect, useState } from "react";
import type { BadgeVariant } from "../components/ui/Badge";
import type { TaskPriority } from "../types/task";

export interface PrioritySetting {
  label: string;
  variant: BadgeVariant;
}

export type PrioritySettings = Record<TaskPriority, PrioritySetting>;

const storageKey = "task-dashboard-priority-settings";

export const badgeVariantOptions: Array<{ label: string; value: BadgeVariant }> = [
  { label: "Slate", value: "neutral" },
  { label: "Cyan", value: "info" },
  { label: "Green", value: "success" },
  { label: "Amber", value: "warning" },
  { label: "Rose", value: "danger" },
  { label: "Violet", value: "purple" },
];

export const defaultPrioritySettings: PrioritySettings = {
  low: { label: "Low", variant: "neutral" },
  medium: { label: "Medium", variant: "warning" },
  high: { label: "High", variant: "danger" },
};

function isBadgeVariant(value: string): value is BadgeVariant {
  return badgeVariantOptions.some((option) => option.value === value);
}

function normalizePrioritySettings(value: unknown): PrioritySettings {
  if (!value || typeof value !== "object") {
    return defaultPrioritySettings;
  }

  const storedSettings = value as Partial<Record<TaskPriority, Partial<PrioritySetting>>>;

  return {
    low: normalizePrioritySetting(storedSettings.low, defaultPrioritySettings.low),
    medium: normalizePrioritySetting(storedSettings.medium, defaultPrioritySettings.medium),
    high: normalizePrioritySetting(storedSettings.high, defaultPrioritySettings.high),
  };
}

function normalizePrioritySetting(
  setting: Partial<PrioritySetting> | undefined,
  fallback: PrioritySetting,
): PrioritySetting {
  const label = typeof setting?.label === "string" ? setting.label.trim() : "";
  const variant = typeof setting?.variant === "string" ? setting.variant : "";

  return {
    label: label || fallback.label,
    variant: isBadgeVariant(variant) ? variant : fallback.variant,
  };
}

function getStoredPrioritySettings(): PrioritySettings {
  if (typeof window === "undefined") {
    return defaultPrioritySettings;
  }

  const storedValue = window.localStorage.getItem(storageKey);

  if (!storedValue) {
    return defaultPrioritySettings;
  }

  try {
    return normalizePrioritySettings(JSON.parse(storedValue));
  } catch {
    return defaultPrioritySettings;
  }
}

export function usePrioritySettings() {
  const [prioritySettings, setPrioritySettings] = useState<PrioritySettings>(
    getStoredPrioritySettings,
  );

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(prioritySettings));
  }, [prioritySettings]);

  function updatePrioritySetting(priority: TaskPriority, setting: PrioritySetting) {
    setPrioritySettings((currentSettings) => ({
      ...currentSettings,
      [priority]: normalizePrioritySetting(setting, defaultPrioritySettings[priority]),
    }));
  }

  function resetPrioritySettings() {
    setPrioritySettings(defaultPrioritySettings);
  }

  return {
    prioritySettings,
    resetPrioritySettings,
    updatePrioritySetting,
  };
}
