import { z } from "zod";

export const timeRangeSchema = z.union([
  z.literal("7d"),
  z.literal("30d"),
  z.literal("90d"),
]);

const kpiMetricSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.number(),
  unit: z.union([
    z.literal("currency"),
    z.literal("percent"),
    z.literal("number"),
  ]),
  trendDelta: z.number(),
});

const trendPointSchema = z.object({
  date: z.string(),
  revenue: z.number(),
  sessions: z.number(),
});

const campaignPerformanceRowSchema = z.object({
  id: z.string(),
  campaign: z.string(),
  channel: z.union([
    z.literal("Paid Search"),
    z.literal("Email"),
    z.literal("Organic"),
    z.literal("Social"),
    z.literal("Referral"),
  ]),
  sessions: z.number(),
  conversionRate: z.number(),
  revenue: z.number(),
  change: z.number(),
});

export const dashboardDataSchema = z.object({
  range: timeRangeSchema,
  kpis: z.array(kpiMetricSchema).min(1),
  trends: z.array(trendPointSchema).min(1),
  rows: z.array(campaignPerformanceRowSchema),
});
