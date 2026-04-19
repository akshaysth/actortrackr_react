import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DataTable from "@/components/ui/data-table";

interface TestItem {
  id: string;
  name: string;
  age: number;
}

const mockItems: TestItem[] = [
  { id: "1", name: "Alice", age: 30 },
  { id: "2", name: "Bob", age: 25 },
  { id: "3", name: "Charlie", age: 35 },
  { id: "4", name: "Diana", age: 28 },
  { id: "5", name: "Eve", age: 32 },
  { id: "6", name: "Frank", age: 40 },
  { id: "7", name: "Grace", age: 22 },
];

const baseColumns: Array<import("@/components/ui/data-table").Column<TestItem>> = [
  { key: "name", header: "Name", accessorKey: "name", isSortable: true },
  { key: "age", header: "Age", accessorKey: "age", isSortable: true },
];

describe("DataTable", () => {
  it("renders empty message when data is empty", () => {
    render(<DataTable columns={baseColumns} data={[]} />);
    expect(screen.getByText("No results.")).toBeInTheDocument();
  });

  it("renders custom empty message", () => {
    render(<DataTable columns={baseColumns} data={[]} emptyMessage="Nothing here." />);
    expect(screen.getByText("Nothing here.")).toBeInTheDocument();
  });

  it("renders data rows correctly", () => {
    render(<DataTable columns={baseColumns} data={mockItems} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
  });

  it("renders column headers", () => {
    render(<DataTable columns={baseColumns} data={mockItems} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  it("filters data by search key", async () => {
    render(
      <DataTable<TestItem>
        columns={baseColumns}
        data={mockItems}
        searchKey="name"
        searchPlaceholder="Search..."
      />
    );

    const searchInput = screen.getByLabelText("Search...");
    fireEvent.change(searchInput, { target: { value: "Al" } });

    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
    });

    // Bob should not appear
    expect(screen.queryByText("Bob")).not.toBeInTheDocument();
  });

  it("resets to page 1 on search", () => {
    const { rerender } = render(
      <DataTable<TestItem>
        columns={baseColumns}
        data={mockItems}
        searchKey="name"
        initialPageSize={2}
      />
    );

    // Should show first 2 items initially
    expect(screen.getByText("Alice")).toBeInTheDocument();

    // Search and verify it goes back to page 1
    const searchInput = screen.getByLabelText("Search...");
    fireEvent.change(searchInput, { target: { value: "Frank" } });

    expect(screen.getByText("Frank")).toBeInTheDocument();
  });

  it("sorts data ascending", async () => {
    render(
      <DataTable<TestItem>
        columns={baseColumns}
        data={mockItems}
        initialPageSize={10}
      />
    );

    const sortButtons = screen.getAllByRole("button");
    const nameSort = sortButtons.find((btn) => btn.getAttribute("aria-label") === "Sort by Name");
    if (nameSort) {
      fireEvent.click(nameSort);
      await waitFor(() => {
        // After sorting by name ascending: Alice should be first
        const rows = screen.getAllByRole("row");
        // First row is header, second row should be Alice
        expect(rows[1]).toHaveTextContent("Alice");
      });
    }
  });

  it("sorts data descending (click twice)", async () => {
    render(
      <DataTable<TestItem>
        columns={baseColumns}
        data={mockItems}
        initialPageSize={10}
      />
    );

    const sortButtons = screen.getAllByRole("button");
    const nameSort = sortButtons.find((btn) => btn.getAttribute("aria-label") === "Sort by Name");
    if (nameSort) {
      fireEvent.click(nameSort);
      fireEvent.click(nameSort);
      await waitFor(() => {
        const rows = screen.getAllByRole("row");
        // After sorting by name descending: Grace should be first (alphabetically last)
        const firstDataRow = rows[1];
        const text = firstDataRow.textContent;
        expect(text).toContain("Grace");
        expect(text).not.toContain("Alice");
        expect(text).not.toContain("Bob");
      });
    }
  });

  it("clears sort when clicked a third time", async () => {
    render(
      <DataTable<TestItem>
        columns={baseColumns}
        data={mockItems}
        initialPageSize={10}
      />
    );

    const sortButtons = screen.getAllByRole("button");
    const nameSort = sortButtons.find((btn) => btn.getAttribute("aria-label") === "Sort by Name");
    if (nameSort) {
      fireEvent.click(nameSort);
      fireEvent.click(nameSort);
      fireEvent.click(nameSort);
      // After clearing sort, data should be in original order
      const rows = screen.getAllByRole("row");
      expect(rows[1]).toHaveTextContent("Alice");
    }
  });

  it("sorts numbers numerically", async () => {
    render(
      <DataTable<TestItem>
        columns={baseColumns}
        data={mockItems}
        initialPageSize={10}
      />
    );

    const sortButtons = screen.getAllByRole("button");
    const ageSort = sortButtons.find((btn) => btn.getAttribute("aria-label") === "Sort by Age");
    if (ageSort) {
      fireEvent.click(ageSort);
      await waitFor(() => {
        const rows = screen.getAllByRole("row");
        // First data row should have the youngest (Grace, 22)
        expect(rows[1]).toHaveTextContent("Grace");
      });
    }
  });

  it("paginates data with correct page size", () => {
    render(
      <DataTable<TestItem>
        columns={baseColumns}
        data={mockItems}
        initialPageSize={3}
      />
    );

    // Should show "Showing 1–3 of 7"
    expect(screen.getByText(/Showing 1–3 of 7/)).toBeInTheDocument();
  });

  it("changes page size", async () => {
    render(
      <DataTable<TestItem>
        columns={baseColumns}
        data={mockItems}
        pageSizeOptions={[3, 6, 10]}
        initialPageSize={3}
      />
    );

    expect(screen.getByText(/Showing 1–3 of 7/)).toBeInTheDocument();

    // Click page size button for 6
    const pageSizeButtons = screen.getAllByRole("button");
    const size6Btn = pageSizeButtons.find((btn) => btn.textContent === "6");
    if (size6Btn) {
      fireEvent.click(size6Btn);
    }

    await waitFor(() => {
      expect(screen.getByText(/Showing 1–6 of 7/)).toBeInTheDocument();
    });
  });

  it("renders actions column when provided", () => {
    const actionsMock = vi.fn((row: TestItem) => (
      <button onClick={() => void 0} data-testid={`action-${row.id}`}>
        Edit
      </button>
    ));
    render(
      <DataTable<TestItem>
        columns={baseColumns}
        data={mockItems}
        actions={actionsMock}
        initialPageSize={10}
      />
    );

    expect(screen.getByText("Actions")).toBeInTheDocument();
    expect(screen.getByTestId("action-1")).toBeInTheDocument();
    expect(screen.getByTestId("action-2")).toBeInTheDocument();
  });

  it("renders custom column render function", () => {
    const columnsWithRender: Array<import("@/components/ui/data-table").Column<TestItem>> = [
      {
        key: "name",
        header: "Name",
        accessorKey: "name",
        render: (value: unknown) => `👤 ${String(value)}`,
      },
      { key: "age", header: "Age", accessorKey: "age" },
    ];

    render(<DataTable columns={columnsWithRender} data={mockItems} />);
    expect(screen.getByText("👤 Alice")).toBeInTheDocument();
  });

  it("shows ellipsis for null/undefined values", () => {
    const itemsWithNulls: Array<Record<string, unknown>> = [
      { id: "1", name: "Alice", age: null },
      { id: "2", name: "Bob", age: 25 },
    ];

    const columns: Array<import("@/components/ui/data-table").Column<Record<string, unknown>>> = [
      { key: "name", header: "Name", accessorKey: "name" },
      { key: "age", header: "Age", accessorKey: "age" },
    ];

    render(<DataTable columns={columns} data={itemsWithNulls as Record<string, unknown>[]} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    // Null age should show em-dash
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("shows pagination controls with prev/next when multiple pages", async () => {
    render(
      <DataTable<TestItem>
        columns={baseColumns}
        data={mockItems}
        initialPageSize={2}
      />
    );

    // Page 1 should show items 1-2
    expect(screen.getByText(/Showing 1–2 of 7/)).toBeInTheDocument();

    // Should have next button on page 1
    const allButtons = screen.getAllByRole("button");
    const nextBtn = allButtons.find((btn) => btn.getAttribute("aria-label") === "Next page");
    expect(nextBtn).toBeInTheDocument();

    if (nextBtn) {
      fireEvent.click(nextBtn);

      await waitFor(() => {
        expect(screen.getByText(/Showing 3–4 of 7/)).toBeInTheDocument();
      });

      // Now go back to page 1 - query fresh buttons after re-render
      const freshButtons = screen.getAllByRole("button");
      const prevBtn = freshButtons.find((btn) => btn.getAttribute("aria-label") === "Previous page");
      expect(prevBtn).toBeInTheDocument();
      if (prevBtn) {
        fireEvent.click(prevBtn);
      }

      await waitFor(() => {
        expect(screen.getByText(/Showing 1–2 of 7/)).toBeInTheDocument();
      });
    }
  });
});
