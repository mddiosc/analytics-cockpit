import { z } from "zod";

export const timeRangeSchema = z.union([
  z.literal("7d"),
  z.literal("30d"),
  z.literal("90d"),
]);

export const channelSchema = z.union([
  z.literal("Paid Search"),
  z.literal("Email"),
  z.literal("Organic"),
  z.literal("Social"),
  z.literal("Referral"),
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
  channel: channelSchema,
  sessions: z.number(),
  conversionRate: z.number(),
  revenue: z.number(),
  change: z.number(),
});

export const dashboardFiltersSchema = z.object({
  range: timeRangeSchema,
  search: z.string(),
  channels: z.array(channelSchema),
  minConversionRate: z.number().nullable(),
  revenueMin: z.number().nullable(),
  revenueMax: z.number().nullable(),
});

export const dashboardPresetSchema = z.object({
  id: z.string(),
  name: z.string(),
  kind: z.union([z.literal("built-in"), z.literal("custom")]),
  filters: dashboardFiltersSchema,
});

export const dashboardPresetsSchema = z.array(dashboardPresetSchema);

export const dashboardInsightDataSchema = z.object({
  range: timeRangeSchema,
  channelMix: z.array(
    z.object({
      channel: channelSchema,
      revenue: z.number(),
      sessions: z.number(),
    }),
  ),
  trends: z.array(trendPointSchema).min(1),
});

export const dashboardDataSchema = z.object({
  range: timeRangeSchema,
  kpis: z.array(kpiMetricSchema).min(1),
  trends: z.array(trendPointSchema).min(1),
  rows: z.array(campaignPerformanceRowSchema),
});
