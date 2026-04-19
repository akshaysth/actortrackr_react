import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as actorService from "@/services/actorService";
import apiClient from "@/services/apiClient";
import type { AxiosResponse } from "axios";

function createMockResponse<T = unknown>(data: T): AxiosResponse<T> {
  return {
    data,
    status: 200,
    statusText: "OK",
    headers: {},
    config: {} as any,
  };
}

const mockActor = { id: 1, name: "Test Actor", description: "A test threat actor" };
const mockActors = [mockActor, { id: 2, name: "Actor 2", description: "Second actor" }];

describe("actorService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getActors", () => {
    it("should return all actors on success", async () => {
      vi.spyOn(apiClient, "get").mockResolvedValue(createMockResponse(mockActors));

      const result = await actorService.getActors();

      expect(apiClient.get).toHaveBeenCalledWith("/actors");
      expect(result.data).toEqual(mockActors);
    });

    it("should throw on error", async () => {
      vi.spyOn(apiClient, "get").mockRejectedValue(new Error("Network Error"));

      await expect(actorService.getActors()).rejects.toThrow("Network Error");
    });
  });

  describe("getActorById", () => {
    it("should return a single actor on success", async () => {
      vi.spyOn(apiClient, "get").mockResolvedValue(createMockResponse(mockActor));

      const result = await actorService.getActorById(1);

      expect(apiClient.get).toHaveBeenCalledWith("/actors/1");
      expect(result.data).toEqual(mockActor);
    });

    it("should throw on error", async () => {
      vi.spyOn(apiClient, "get").mockRejectedValue(new Error("Not found"));

      await expect(actorService.getActorById(999)).rejects.toThrow("Not found");
    });
  });

  describe("createActor", () => {
    it("should create an actor on success", async () => {
      const newActor = { name: "New Actor", description: "Description" };
      vi.spyOn(apiClient, "post").mockResolvedValue(createMockResponse({ ...mockActor, id: 3, ...newActor }));

      const result = await actorService.createActor(newActor);

      expect(apiClient.post).toHaveBeenCalledWith("/actors", newActor);
      expect(result.data).toEqual({ id: 3, name: "New Actor", description: "Description" });
    });

    it("should throw on error", async () => {
      vi.spyOn(apiClient, "post").mockRejectedValue(new Error("Validation error"));

      await expect(actorService.createActor({ name: "" })).rejects.toThrow("Validation error");
    });
  });

  describe("updateActor", () => {
    it("should update an actor on success", async () => {
      const updates = { name: "Updated Actor" };
      vi.spyOn(apiClient, "put").mockResolvedValue(createMockResponse({ ...mockActor, ...updates }));

      const result = await actorService.updateActor(1, updates);

      expect(apiClient.put).toHaveBeenCalledWith("/actors/1", updates);
      expect(result.data).toEqual({ id: 1, name: "Updated Actor", description: "A test threat actor" });
    });

    it("should throw on error", async () => {
      vi.spyOn(apiClient, "put").mockRejectedValue(new Error("Not found"));

      await expect(actorService.updateActor(999, { name: "X" })).rejects.toThrow("Not found");
    });
  });

  describe("deleteActor", () => {
    it("should delete an actor on success", async () => {
      vi.spyOn(apiClient, "delete").mockResolvedValue(createMockResponse({ message: "Deleted" }));

      const result = await actorService.deleteActor(1);

      expect(apiClient.delete).toHaveBeenCalledWith("/actors/1");
      expect(result.data).toEqual({ message: "Deleted" });
    });

    it("should throw on error", async () => {
      vi.spyOn(apiClient, "delete").mockRejectedValue(new Error("Not found"));

      await expect(actorService.deleteActor(999)).rejects.toThrow("Not found");
    });
  });

  describe("linkReportToActor", () => {
    it("should link a report to an actor on success", async () => {
      vi.spyOn(apiClient, "post").mockResolvedValue(createMockResponse({ message: "Link created" }));

      const result = await actorService.linkReportToActor(1, 42);

      expect(apiClient.post).toHaveBeenCalledWith("/actors/1/reports", { report_id: 42 });
      expect(result.data).toEqual({ message: "Link created" });
    });

    it("should throw on error", async () => {
      vi.spyOn(apiClient, "post").mockRejectedValue(new Error("Bad request"));

      await expect(actorService.linkReportToActor(1, 999)).rejects.toThrow("Bad request");
    });
  });

  describe("unlinkReportFromActor", () => {
    it("should unlink a report from an actor on success", async () => {
      vi.spyOn(apiClient, "delete").mockResolvedValue(createMockResponse({ message: "Deleted" }));

      const result = await actorService.unlinkReportFromActor(1, 42);

      expect(apiClient.delete).toHaveBeenCalledWith("/actors/1/reports/42");
      expect(result.data).toEqual({ message: "Deleted" });
    });

    it("should throw on error", async () => {
      vi.spyOn(apiClient, "delete").mockRejectedValue(new Error("Not found"));

      await expect(actorService.unlinkReportFromActor(1, 999)).rejects.toThrow("Not found");
    });
  });
});
