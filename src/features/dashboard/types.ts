export type TimeRange = "7d" | "30d" | "90d";
export type Channel =
  | "Paid Search"
  | "Email"
  | "Organic"
  | "Social"
  | "Referral";

export interface KpiMetric {
  id: string;
  label: string;
  value: number;
  unit: "currency" | "percent" | "number";
  trendDelta: number;
}

export interface TrendPoint {
  date: string;
  revenue: number;
  sessions: number;
}

export interface CampaignPerformanceRow {
  id: string;
  campaign: string;
  channel: Channel;
  sessions: number;
  conversionRate: number;
  revenue: number;
  change: number;
}

export interface ChannelMixItem {
  channel: Channel;
  revenue: number;
  sessions: number;
}

export interface DashboardInsightData {
  range: TimeRange;
  channelMix: ChannelMixItem[];
  trends: TrendPoint[];
}

export interface DashboardFilters {
  range: TimeRange;
  search: string;
  channels: Channel[];
  minConversionRate: number | null;
  revenueMin: number | null;
  revenueMax: number | null;
}

export interface DashboardViewPreset {
  id: string;
  name: string;
  filters: DashboardFilters;
  kind: "built-in" | "custom";
}

export interface DashboardData {
  range: TimeRange;
  kpis: KpiMetric[];
  trends: TrendPoint[];
  rows: CampaignPerformanceRow[];
}
