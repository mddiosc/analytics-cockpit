import type {
  CampaignPerformanceRow,
  ChannelMixItem,
  KpiMetric,
  DashboardFilters,
  TrendPoint,
} from "../types";

export function applyDashboardFilters(
  rows: CampaignPerformanceRow[],
  filters: DashboardFilters,
): CampaignPerformanceRow[] {
  const normalizedSearch = filters.search.trim().toLowerCase();

  return rows.filter((row) => {
    if (
      normalizedSearch &&
      !row.campaign.toLowerCase().includes(normalizedSearch)
    ) {
      return false;
    }

    if (
      filters.channels.length > 0 &&
      !filters.channels.includes(row.channel)
    ) {
      return false;
    }

    if (
      filters.minConversionRate !== null &&
      row.conversionRate < filters.minConversionRate
    ) {
      return false;
    }

    if (filters.revenueMin !== null && row.revenue < filters.revenueMin) {
      return false;
    }

    if (filters.revenueMax !== null && row.revenue > filters.revenueMax) {
      return false;
    }

    return true;
  });
}

export function deriveChannelMix(
  rows: CampaignPerformanceRow[],
): ChannelMixItem[] {
  const map = new Map<string, ChannelMixItem>();

  for (const row of rows) {
    const current = map.get(row.channel);
    if (!current) {
      map.set(row.channel, {
        channel: row.channel,
        revenue: row.revenue,
        sessions: row.sessions,
      });
      continue;
    }

    current.revenue += row.revenue;
    current.sessions += row.sessions;
  }

  return Array.from(map.values()).sort((a, b) => b.revenue - a.revenue);
}

export function scaleTrendsByRowSelection(
  trends: TrendPoint[],
  filteredRows: CampaignPerformanceRow[],
  allRows: CampaignPerformanceRow[],
): TrendPoint[] {
  if (trends.length === 0 || allRows.length === 0) {
    return trends;
  }

  const totalRevenue = allRows.reduce((sum, row) => sum + row.revenue, 0);
  const totalSessions = allRows.reduce((sum, row) => sum + row.sessions, 0);
  const filteredRevenue = filteredRows.reduce(
    (sum, row) => sum + row.revenue,
    0,
  );
  const filteredSessions = filteredRows.reduce(
    (sum, row) => sum + row.sessions,
    0,
  );

  const revenueRatio = totalRevenue > 0 ? filteredRevenue / totalRevenue : 1;
  const sessionsRatio =
    totalSessions > 0 ? filteredSessions / totalSessions : 1;

  return trends.map((point) => ({
    ...point,
    revenue: Math.round(point.revenue * revenueRatio),
    sessions: Math.round(point.sessions * sessionsRatio),
  }));
}

export function deriveKpis(rows: CampaignPerformanceRow[]): KpiMetric[] {
  const totalRevenue = rows.reduce((sum, row) => sum + row.revenue, 0);
  const totalSessions = rows.reduce((sum, row) => sum + row.sessions, 0);

  const weightedConversion =
    totalSessions > 0
      ? rows.reduce((sum, row) => sum + row.sessions * row.conversionRate, 0) /
        totalSessions
      : 0;

  const conversions = Math.max(totalSessions * (weightedConversion / 100), 1);
  const averageOrderValue = totalRevenue / conversions;

  return [
    {
      id: "revenue",
      label: "Total revenue",
      value: totalRevenue,
      unit: "currency",
      trendDelta: 11.2,
    },
    {
      id: "sessions",
      label: "Sessions",
      value: totalSessions,
      unit: "number",
      trendDelta: 6.4,
    },
    {
      id: "conversion",
      label: "Conversion rate",
      value: Number(weightedConversion.toFixed(2)),
      unit: "percent",
      trendDelta: 1.8,
    },
    {
      id: "aov",
      label: "Average order value",
      value: averageOrderValue,
      unit: "currency",
      trendDelta: -0.7,
    },
  ];
}
