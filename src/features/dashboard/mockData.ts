import type {
  Channel,
  DashboardData,
  DashboardInsightData,
  TimeRange,
} from "./types";

const baseRows: DashboardData["rows"] = [
  {
    id: "cmp-01",
    campaign: "Spring Performance Max",
    channel: "Paid Search",
    sessions: 12390,
    conversionRate: 4.62,
    revenue: 145230,
    change: 12.4,
  },
  {
    id: "cmp-02",
    campaign: "Lifecycle Reactivation",
    channel: "Email",
    sessions: 9180,
    conversionRate: 5.14,
    revenue: 96340,
    change: 8.7,
  },
  {
    id: "cmp-03",
    campaign: "Organic Content Cluster",
    channel: "Organic",
    sessions: 15570,
    conversionRate: 2.96,
    revenue: 81120,
    change: 4.1,
  },
  {
    id: "cmp-04",
    campaign: "Creator Partnership Wave",
    channel: "Social",
    sessions: 7020,
    conversionRate: 3.44,
    revenue: 59810,
    change: -1.9,
  },
  {
    id: "cmp-05",
    campaign: "Affiliate Relaunch",
    channel: "Referral",
    sessions: 6230,
    conversionRate: 4.01,
    revenue: 47890,
    change: 6.3,
  },
];

const bulkRows: DashboardData["rows"] = Array.from({ length: 360 }).map(
  (_, index) => {
    const channelCycle: Channel[] = [
      "Paid Search",
      "Email",
      "Organic",
      "Social",
      "Referral",
    ];
    const channel = channelCycle[index % channelCycle.length];
    const seed = index + 1;

    return {
      id: `bulk-${seed}`,
      campaign: `${channel} Campaign ${String(seed).padStart(3, "0")}`,
      channel,
      sessions: 600 + ((seed * 73) % 4200),
      conversionRate: Number((1.8 + ((seed * 17) % 420) / 100).toFixed(2)),
      revenue: 4000 + ((seed * 521) % 42000),
      change: Number((((seed % 29) - 14) * 0.8).toFixed(1)),
    };
  },
);

const rangeFactor: Record<TimeRange, number> = {
  "7d": 0.42,
  "30d": 1,
  "90d": 2.45,
};

function buildTrends(range: TimeRange): DashboardData["trends"] {
  let points: number;
  if (range === "7d") {
    points = 7;
  } else if (range === "30d") {
    points = 10;
  } else {
    points = 12;
  }
  const factor = rangeFactor[range];

  return Array.from({ length: points }).map((_, index) => {
    const base = 24000 * factor;
    const variance = Math.sin(index * 0.65) * 1800 * factor;
    return {
      date: `P${index + 1}`,
      revenue: Math.round(base + variance + index * 350 * factor),
      sessions: Math.round(
        4200 * factor + index * 120 * factor + variance * 0.2,
      ),
    };
  });
}

export function getDashboardMockData(range: TimeRange): DashboardData {
  const factor = rangeFactor[range];

  const rows = [...baseRows, ...bulkRows].map((row) => ({
    ...row,
    sessions: Math.round(row.sessions * factor),
    revenue: Math.round(row.revenue * factor),
  }));

  const totalRevenue = rows.reduce((sum, row) => sum + row.revenue, 0);
  const totalSessions = rows.reduce((sum, row) => sum + row.sessions, 0);
  const weightedCv =
    rows.reduce((sum, row) => sum + row.sessions * row.conversionRate, 0) /
    totalSessions;

  return {
    range,
    rows,
    trends: buildTrends(range),
    kpis: [
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
        value: Number(weightedCv.toFixed(2)),
        unit: "percent",
        trendDelta: 1.8,
      },
      {
        id: "aov",
        label: "Average order value",
        value: totalRevenue / Math.max(totalSessions * (weightedCv / 100), 1),
        unit: "currency",
        trendDelta: -0.7,
      },
    ],
  };
}

export function getDashboardInsightMockData(
  range: TimeRange,
): DashboardInsightData {
  const data = getDashboardMockData(range);

  const byChannel = new Map<Channel, { revenue: number; sessions: number }>();
  for (const row of data.rows) {
    const current = byChannel.get(row.channel) ?? { revenue: 0, sessions: 0 };
    current.revenue += row.revenue;
    current.sessions += row.sessions;
    byChannel.set(row.channel, current);
  }

  return {
    range,
    trends: data.trends,
    channelMix: Array.from(byChannel.entries()).map(([channel, value]) => ({
      channel,
      revenue: value.revenue,
      sessions: value.sessions,
    })),
  };
}
