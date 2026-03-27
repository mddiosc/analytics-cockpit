import { create } from "zustand";

import type { TimeRange } from "./types";

interface DashboardFilterState {
  range: TimeRange;
  search: string;
  setRange: (range: TimeRange) => void;
  setSearch: (search: string) => void;
}

export const useDashboardFilters = create<DashboardFilterState>((set) => ({
  range: "30d",
  search: "",
  setRange: (range) => set({ range }),
  setSearch: (search) => set({ search }),
}));
