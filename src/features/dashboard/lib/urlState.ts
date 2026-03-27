import { dashboardFiltersSchema } from "../schema";
import { DEFAULT_FILTERS } from "../store";
import type { DashboardFilters } from "../types";

function parseNumeric(input: string | null): number | null {
  if (!input) {
    return null;
  }

  const value = Number(input);
  return Number.isFinite(value) ? value : null;
}

export function deserializeFiltersFromSearch(search: string): DashboardFilters {
  const params = new URLSearchParams(search);

  const candidate: DashboardFilters = {
    range:
      (params.get("range") as DashboardFilters["range"]) ??
      DEFAULT_FILTERS.range,
    search: params.get("q") ?? DEFAULT_FILTERS.search,
    channels:
      (params
        .get("channels")
        ?.split(",")
        .map((value) => value.trim())
        .filter(Boolean) as DashboardFilters["channels"]) ??
      DEFAULT_FILTERS.channels,
    minConversionRate: parseNumeric(params.get("minCv")),
    revenueMin: parseNumeric(params.get("revMin")),
    revenueMax: parseNumeric(params.get("revMax")),
  };

  return dashboardFiltersSchema.parse(candidate);
}

export function serializeFiltersToSearch(filters: DashboardFilters): string {
  const params = new URLSearchParams();

  params.set("range", filters.range);

  if (filters.search) {
    params.set("q", filters.search);
  }

  if (filters.channels.length > 0) {
    params.set("channels", filters.channels.join(","));
  }

  if (filters.minConversionRate !== null) {
    params.set("minCv", String(filters.minConversionRate));
  }

  if (filters.revenueMin !== null) {
    params.set("revMin", String(filters.revenueMin));
  }

  if (filters.revenueMax !== null) {
    params.set("revMax", String(filters.revenueMax));
  }

  return params.toString();
}
