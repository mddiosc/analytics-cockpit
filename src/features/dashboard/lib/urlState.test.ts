import { describe, expect, it } from "vitest";

import {
  deserializeFiltersFromSearch,
  serializeFiltersToSearch,
} from "./urlState";

describe("url state serialization", () => {
  it("roundtrips complete filter payload", () => {
    const serialized = serializeFiltersToSearch({
      range: "90d",
      search: "spring",
      channels: ["Email", "Paid Search"],
      minConversionRate: 3.5,
      revenueMin: 12000,
      revenueMax: 80000,
    });

    const restored = deserializeFiltersFromSearch(serialized);

    expect(restored).toEqual({
      range: "90d",
      search: "spring",
      channels: ["Email", "Paid Search"],
      minConversionRate: 3.5,
      revenueMin: 12000,
      revenueMax: 80000,
    });
  });
});
