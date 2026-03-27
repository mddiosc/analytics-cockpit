import { describe, expect, it, vi } from "vitest";

import { loadCustomPresets, saveCustomPresets } from "./presets";

describe("preset persistence", () => {
  it("saves and restores custom presets from localStorage", () => {
    const setItem = vi.spyOn(Storage.prototype, "setItem");
    const getItem = vi.spyOn(Storage.prototype, "getItem");

    saveCustomPresets([
      {
        id: "c1",
        name: "Custom",
        kind: "custom",
        filters: {
          range: "30d",
          search: "campaign",
          channels: ["Organic"],
          minConversionRate: 2,
          revenueMin: null,
          revenueMax: 40000,
        },
      },
    ]);

    const stored = setItem.mock.calls.at(-1)?.[1] as string;
    getItem.mockReturnValue(stored);

    const restored = loadCustomPresets();
    expect(restored).toHaveLength(1);
    expect(restored[0]?.name).toBe("Custom");
  });
});
