import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Homepage from "@/components/pages/Homepage";
import { MemoryRouter } from "react-router-dom";

function renderHomepage() {
  return render(
    <MemoryRouter>
      <Homepage title="Dashboard" />
    </MemoryRouter>
  );
}

describe("Homepage", () => {
  it("renders the page title", () => {
    renderHomepage();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders the summary cards section with Actors, TTPs, Reports", () => {
    renderHomepage();
    expect(screen.getByText("Actors")).toBeInTheDocument();
    expect(screen.getByText("TTPs")).toBeInTheDocument();
    expect(screen.getByText("Reports")).toBeInTheDocument();
  });

  it("renders summary card descriptions", () => {
    renderHomepage();
    expect(screen.getByText("Total threat actors")).toBeInTheDocument();
    expect(screen.getByText("Total tactics, techniques & procedures")).toBeInTheDocument();
    expect(screen.getByText("Total reports generated")).toBeInTheDocument();
  });

  it("renders the navigation cards section with View Actors, View TTPs, View Reports", () => {
    renderHomepage();
    expect(screen.getByText("Threat Actors")).toBeInTheDocument();
    expect(screen.getByText("Manage and track threat actor profiles")).toBeInTheDocument();
    expect(screen.getByText("View Actors")).toBeInTheDocument();
    expect(screen.getByText("TTPs")).toBeInTheDocument();
    expect(screen.getByText("View TTPs")).toBeInTheDocument();
    expect(screen.getByText("Reports")).toBeInTheDocument();
    expect(screen.getByText("View Reports")).toBeInTheDocument();
  });

  it("renders the Create New section with New Actor, New TTP, New Report buttons", () => {
    renderHomepage();
    expect(screen.getByText("Create New")).toBeInTheDocument();
    expect(screen.getByText("Quick actions to add new entries")).toBeInTheDocument();
    expect(screen.getByText("New Actor")).toBeInTheDocument();
    expect(screen.getByText("New TTP")).toBeInTheDocument();
    expect(screen.getByText("New Report")).toBeInTheDocument();
  });

  it("renders links with correct routes", () => {
    renderHomepage();
    const links = screen.getAllByRole("link");
    const hrefs = links.map((link) => link.getAttribute("href"));
    expect(hrefs).toContain("/actors");
    expect(hrefs).toContain("/ttps");
    expect(hrefs).toContain("/reports");
    expect(hrefs).toContain("/actors/create");
    expect(hrefs).toContain("/ttps/create");
    expect(hrefs).toContain("/reports/create");
  });

  it("renders exactly 7 links", () => {
    renderHomepage();
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(7);
  });

  it("renders exactly 4 summary/action cards", () => {
    renderHomepage();
    const cards = screen.getAllByRole("region");
    expect(cards.length).toBeGreaterThanOrEqual(4);
  });
});
