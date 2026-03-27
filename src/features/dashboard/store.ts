import { create } from "zustand";

import type { Channel, DashboardFilters, TimeRange } from "./types";

export const DEFAULT_FILTERS: DashboardFilters = {
  range: "30d",
  search: "",
  channels: [],
  minConversionRate: null,
  revenueMin: null,
  revenueMax: null,
};

interface DashboardFilterState {
  range: TimeRange;
  search: string;
  channels: Channel[];
  minConversionRate: number | null;
  revenueMin: number | null;
  revenueMax: number | null;
  setRange: (range: TimeRange) => void;
  setSearch: (search: string) => void;
  setChannels: (channels: Channel[]) => void;
  toggleChannel: (channel: Channel) => void;
  setMinConversionRate: (value: number | null) => void;
  setRevenueMin: (value: number | null) => void;
  setRevenueMax: (value: number | null) => void;
  applyFilters: (filters: DashboardFilters) => void;
}

export const useDashboardFilters = create<DashboardFilterState>((set) => ({
  ...DEFAULT_FILTERS,
  setRange: (range) => set({ range }),
  setSearch: (search) => set({ search }),
  setChannels: (channels) => set({ channels }),
  toggleChannel: (channel) =>
    set((state) => ({
      channels: state.channels.includes(channel)
        ? state.channels.filter((item) => item !== channel)
        : [...state.channels, channel],
    })),
  setMinConversionRate: (minConversionRate) => set({ minConversionRate }),
  setRevenueMin: (revenueMin) => set({ revenueMin }),
  setRevenueMax: (revenueMax) => set({ revenueMax }),
  applyFilters: (filters) => set({ ...filters }),
}));
