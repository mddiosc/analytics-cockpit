import { dashboardPresetsSchema } from "../schema";
import { DEFAULT_FILTERS } from "../store";
import type { DashboardViewPreset } from "../types";

const STORAGE_KEY = "analytics-cockpit.custom-presets.v1";

export const builtInPresets: DashboardViewPreset[] = [
  {
    id: "preset-growth",
    name: "Growth Focus",
    kind: "built-in",
    filters: {
      ...DEFAULT_FILTERS,
      channels: ["Paid Search", "Email"],
      minConversionRate: 3,
    },
  },
  {
    id: "preset-efficiency",
    name: "Efficiency Watch",
    kind: "built-in",
    filters: {
      ...DEFAULT_FILTERS,
      channels: ["Organic", "Referral"],
      revenueMin: 12000,
      minConversionRate: 2.5,
    },
  },
  {
    id: "preset-social",
    name: "Social Pulse",
    kind: "built-in",
    filters: {
      ...DEFAULT_FILTERS,
      channels: ["Social"],
      range: "7d",
    },
  },
];

export function loadCustomPresets(): DashboardViewPreset[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return dashboardPresetsSchema
      .parse(parsed)
      .filter((preset) => preset.kind === "custom");
  } catch {
    return [];
  }
}

export function saveCustomPresets(presets: DashboardViewPreset[]): void {
  const customOnly = presets.filter((preset) => preset.kind === "custom");
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(customOnly));
}
