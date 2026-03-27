import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { DashboardPage } from "./DashboardPage";
import { useDashboardFilters } from "../store";

function renderDashboard() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={client}>
      <DashboardPage />
    </QueryClientProvider>,
  );
}

describe("DashboardPage", () => {
  beforeEach(() => {
    useDashboardFilters.setState({ range: "30d", search: "" });
  });

  it("renders KPI summary after loading", async () => {
    renderDashboard();

    await screen.findByLabelText("KPI summary");
    expect(screen.getByText("Total revenue")).toBeInTheDocument();
  });

  it("filters table rows by campaign search", async () => {
    const user = userEvent.setup();
    renderDashboard();

    await screen.findByText("Campaign performance explorer");
    const input = screen.getByPlaceholderText("Type a campaign name");

    await user.type(input, "Lifecycle");

    await waitFor(() => {
      expect(screen.getByText("Lifecycle Reactivation")).toBeInTheDocument();
    });

    expect(screen.queryByText("Affiliate Relaunch")).not.toBeInTheDocument();
  });
});
