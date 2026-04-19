import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import ActorList from "@/components/pages/Actors/list";
import { MemoryRouter } from "react-router-dom";
import * as actorService from "@/services/actorService";
import * as sonner from "sonner";

const mockActors = [
  { id: 1, name: "APT28", description: "Russian state-sponsored" },
  { id: 2, name: "Lazarus Group", description: "North Korean state-sponsored" },
  { id: 3, name: "FIN7", description: "Financially motivated" },
];

function renderActorList() {
  return render(
    <MemoryRouter>
      <ActorList />
    </MemoryRouter>
  );
}

describe("ActorList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(actorService, "getActors").mockResolvedValue({ data: mockActors });
    vi.spyOn(actorService, "deleteActor").mockResolvedValue(undefined);
    vi.spyOn(sonner, "toast").mockReturnValue(undefined as never);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows loading skeletons on initial render", () => {
    vi.spyOn(actorService, "getActors").mockImplementation(
      () => new Promise(() => {})
    );
    renderActorList();
    const skeletons = screen.getAllByRole("presentation");
    expect(skeletons.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the page title", async () => {
    renderActorList();
    await waitFor(() => screen.getByText("Actors"));
    expect(screen.getByText("Actors")).toBeInTheDocument();
  });

  it("displays actor count after loading", async () => {
    renderActorList();
    await waitFor(() => screen.getByText("3 total"));
    expect(screen.getByText("3 total")).toBeInTheDocument();
  });

  it("renders all actor names in the table", async () => {
    renderActorList();
    await waitFor(() => screen.getByText("APT28"));
    expect(screen.getByText("APT28")).toBeInTheDocument();
    expect(screen.getByText("Lazarus Group")).toBeInTheDocument();
    expect(screen.getByText("FIN7")).toBeInTheDocument();
  });

  it("renders the Create New Actor button", async () => {
    renderActorList();
    await waitFor(() => screen.getByText("Create New Actor"));
    expect(screen.getByText("Create New Actor")).toBeInTheDocument();
  });

  it("renders search input for filtering actors", async () => {
    renderActorList();
    await waitFor(() => screen.getByText("APT28"));
    const searchInput = screen.getByPlaceholderText("Search actors...");
    expect(searchInput).toBeInTheDocument();
  });

  it("filters actors by name search", async () => {
    renderActorList();
    await waitFor(() => screen.getByText("APT28"));
    const searchInput = screen.getByPlaceholderText("Search actors...");
    fireEvent.change(searchInput, { target: { value: "APT" } });
    await waitFor(() => {
      expect(screen.getByText("APT28")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText("Lazarus Group")).not.toBeInTheDocument();
    });
  });

  it("shows all actors when search is cleared", async () => {
    renderActorList();
    await waitFor(() => screen.getByText("APT28"));
    const searchInput = screen.getByPlaceholderText("Search actors...");
    fireEvent.change(searchInput, { target: { value: "APT" } });
    await waitFor(() => {
      expect(screen.queryByText("Lazarus Group")).not.toBeInTheDocument();
    });
    fireEvent.change(searchInput, { target: { value: "" } });
    await waitFor(() => {
      expect(screen.getByText("Lazarus Group")).toBeInTheDocument();
    });
  });

  it("renders delete button for each actor", async () => {
    renderActorList();
    await waitFor(() => screen.getByText("APT28"));
    const deleteButtons = screen.getAllByLabelText("Delete actor");
    expect(deleteButtons).toHaveLength(3);
  });

  it("opens delete confirmation dialog when delete button is clicked", async () => {
    renderActorList();
    await waitFor(() => screen.getByText("APT28"));
    const deleteButtons = screen.getAllByLabelText("Delete actor");
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => {
      expect(screen.getByText("Delete Actor")).toBeInTheDocument();
    });
    expect(screen.getByText(/Are you sure you want to delete "APT28"/)).toBeInTheDocument();
  });

  it("renders Cancel and Delete buttons in delete dialog", async () => {
    renderActorList();
    await waitFor(() => screen.getByText("APT28"));
    const deleteButtons = screen.getAllByLabelText("Delete actor");
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => {
      expect(screen.getByText("Cancel")).toBeInTheDocument();
    });
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("cancels delete when Cancel is clicked", async () => {
    renderActorList();
    await waitFor(() => screen.getByText("APT28"));
    const deleteButtons = screen.getAllByLabelText("Delete actor");
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => screen.getByText("Cancel"));
    fireEvent.click(screen.getByText("Cancel"));
    await waitFor(() => {
      expect(screen.queryByText("Delete Actor")).not.toBeInTheDocument();
    });
  });

  it("deletes actor when Delete is confirmed", async () => {
    renderActorList();
    await waitFor(() => screen.getByText("APT28"));
    const deleteButtons = screen.getAllByLabelText("Delete actor");
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => screen.getByText("Delete"));
    fireEvent.click(screen.getByText("Delete"));
    await waitFor(() => {
      expect(actorService.deleteActor).toHaveBeenCalledWith(1);
    });
  });

  it("shows success toast after deleting actor", async () => {
    renderActorList();
    await waitFor(() => screen.getByText("APT28"));
    const deleteButtons = screen.getAllByLabelText("Delete actor");
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => screen.getByText("Delete"));
    fireEvent.click(screen.getByText("Delete"));
    await waitFor(() => {
      expect(sonner.toast).toHaveBeenCalledWith("success", expect.objectContaining({
        description: expect.stringContaining("APT28"),
      }));
    });
  });

  it("shows error toast when delete fails", async () => {
    vi.spyOn(actorService, "deleteActor").mockRejectedValue(new Error("Delete failed"));
    renderActorList();
    await waitFor(() => screen.getByText("APT28"));
    const deleteButtons = screen.getAllByLabelText("Delete actor");
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => screen.getByText("Delete"));
    fireEvent.click(screen.getByText("Delete"));
    await waitFor(() => {
      expect(sonner.toast).toHaveBeenCalledWith("error", expect.objectContaining({
        description: "Failed to delete actor",
      }));
    });
  });

  it("displays error message when fetch fails", async () => {
    vi.spyOn(actorService, "getActors").mockRejectedValue(new Error("Network error"));
    renderActorList();
    await waitFor(() => screen.getByRole("alert"));
    expect(screen.getByRole("alert")).toHaveTextContent("Failed to fetch actors");
  });
});
