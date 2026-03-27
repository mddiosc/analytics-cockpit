export type TimeRange = "7d" | "30d" | "90d";

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
  channel: "Paid Search" | "Email" | "Organic" | "Social" | "Referral";
  sessions: number;
  conversionRate: number;
  revenue: number;
  change: number;
}

export interface DashboardData {
  range: TimeRange;
  kpis: KpiMetric[];
  trends: TrendPoint[];
  rows: CampaignPerformanceRow[];
}
