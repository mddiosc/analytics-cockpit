import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchDashboardData, fetchDashboardInsightData } from "../api";
import type { Channel, DashboardFilters, TimeRange } from "../types";
import {
  applyDashboardFilters,
  deriveKpis,
  deriveChannelMix,
  scaleTrendsByRowSelection,
} from "../lib/filtering";
import { useDashboardFilters } from "../store";

interface DashboardFilterSlice {
  range: TimeRange;
  search: string;
  channels: Channel[];
  minConversionRate: number | null;
  revenueMin: number | null;
  revenueMax: number | null;
}

export function useDashboardData() {
  const range = useDashboardFilters(
    (state: DashboardFilterSlice) => state.range,
  );
  const search = useDashboardFilters(
    (state: DashboardFilterSlice) => state.search,
  );
  const channels = useDashboardFilters(
    (state: DashboardFilterSlice) => state.channels,
  );
  const minConversionRate = useDashboardFilters(
    (state: DashboardFilterSlice) => state.minConversionRate,
  );
  const revenueMin = useDashboardFilters(
    (state: DashboardFilterSlice) => state.revenueMin,
  );
  const revenueMax = useDashboardFilters(
    (state: DashboardFilterSlice) => state.revenueMax,
  );

  const tableQuery = useQuery({
    queryKey: ["dashboard", range],
    queryFn: () => fetchDashboardData(range),
  });

  const insightQuery = useQuery({
    queryKey: ["dashboard-insights", range],
    queryFn: () => fetchDashboardInsightData(range),
  });

  const filters = useMemo<DashboardFilters>(
    () => ({
      range,
      search,
      channels,
      minConversionRate,
      revenueMin,
      revenueMax,
    }),
    [channels, minConversionRate, range, revenueMax, revenueMin, search],
  );

  const filteredRows = useMemo(() => {
    if (!tableQuery.data) {
      return [];
    }

    return applyDashboardFilters(tableQuery.data.rows, filters);
  }, [filters, tableQuery.data]);

  const filteredInsight = useMemo(() => {
    if (!insightQuery.data || !tableQuery.data) {
      return null;
    }

    return {
      range,
      channelMix: deriveChannelMix(filteredRows),
      trends: scaleTrendsByRowSelection(
        insightQuery.data.trends,
        filteredRows,
        tableQuery.data.rows,
      ),
    };
  }, [filteredRows, insightQuery.data, range, tableQuery.data]);

  const totals = useMemo(() => {
    if (!tableQuery.data) {
      return { campaigns: 0 };
    }

    return { campaigns: filteredRows.length };
  }, [filteredRows.length, tableQuery.data]);

  const filteredKpis = useMemo(() => deriveKpis(filteredRows), [filteredRows]);

  return {
    ...tableQuery,
    range,
    totals,
    filters,
    data: tableQuery.data
      ? {
          ...tableQuery.data,
          kpis: filteredKpis,
          rows: filteredRows,
        }
      : undefined,
    insightData: filteredInsight,
    insightPending: insightQuery.isPending,
    insightError: insightQuery.isError,
    refetchInsights: insightQuery.refetch,
  };
}
