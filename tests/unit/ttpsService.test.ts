import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as ttpsService from "@/services/ttpsService";
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

const mockTtp = { id: 1, name: "Test TTP", description: "A test TTP" };
const mockTtps = [mockTtp, { id: 2, name: "TTP 2", description: "Second TTP" }];

describe("ttpsService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getTtps", () => {
    it("should return all TTPs on success", async () => {
      vi.spyOn(apiClient, "get").mockResolvedValue(createMockResponse(mockTtps));

      const result = await ttpsService.getTtps();

      expect(apiClient.get).toHaveBeenCalledWith("/ttps");
      expect(result.data).toEqual(mockTtps);
    });

    it("should throw on error", async () => {
      vi.spyOn(apiClient, "get").mockRejectedValue(new Error("Network Error"));

      await expect(ttpsService.getTtps()).rejects.toThrow("Network Error");
    });
  });

  describe("getTtpById", () => {
    it("should return a single TTP on success", async () => {
      vi.spyOn(apiClient, "get").mockResolvedValue(createMockResponse(mockTtp));

      const result = await ttpsService.getTtpById(1);

      expect(apiClient.get).toHaveBeenCalledWith("/ttps/1");
      expect(result.data).toEqual(mockTtp);
    });

    it("should throw on error", async () => {
      vi.spyOn(apiClient, "get").mockRejectedValue(new Error("Not found"));

      await expect(ttpsService.getTtpById(999)).rejects.toThrow("Not found");
    });
  });

  describe("createTtp", () => {
    it("should create a TTP on success", async () => {
      const newTtp = { name: "New TTP", description: "Description" };
      vi.spyOn(apiClient, "post").mockResolvedValue(createMockResponse({ ...mockTtp, id: 3, ...newTtp }));

      const result = await ttpsService.createTtp(newTtp);

      expect(apiClient.post).toHaveBeenCalledWith("/ttps", newTtp);
      expect(result.data).toEqual({ id: 3, name: "New TTP", description: "Description" });
    });

    it("should throw on error", async () => {
      vi.spyOn(apiClient, "post").mockRejectedValue(new Error("Validation error"));

      await expect(ttpsService.createTtp({ name: "" })).rejects.toThrow("Validation error");
    });
  });

  describe("updateTtp", () => {
    it("should update a TTP on success", async () => {
      const updates = { name: "Updated TTP" };
      vi.spyOn(apiClient, "put").mockResolvedValue(createMockResponse({ ...mockTtp, ...updates }));

      const result = await ttpsService.updateTtp(1, updates);

      expect(apiClient.put).toHaveBeenCalledWith("/ttps/1", updates);
      expect(result.data).toEqual({ id: 1, name: "Updated TTP", description: "A test TTP" });
    });

    it("should throw on error", async () => {
      vi.spyOn(apiClient, "put").mockRejectedValue(new Error("Not found"));

      await expect(ttpsService.updateTtp(999, { name: "X" })).rejects.toThrow("Not found");
    });
  });

  describe("deleteTtp", () => {
    it("should delete a TTP on success", async () => {
      vi.spyOn(apiClient, "delete").mockResolvedValue(createMockResponse({ message: "Deleted" }));

      const result = await ttpsService.deleteTtp(1);

      expect(apiClient.delete).toHaveBeenCalledWith("/ttps/1");
      expect(result.data).toEqual({ message: "Deleted" });
    });

    it("should throw on error", async () => {
      vi.spyOn(apiClient, "delete").mockRejectedValue(new Error("Not found"));

      await expect(ttpsService.deleteTtp(999)).rejects.toThrow("Not found");
    });
  });

  describe("linkReportToActor", () => {
    it("should link a report to an actor on success", async () => {
      vi.spyOn(apiClient, "post").mockResolvedValue(createMockResponse({ message: "Link created" }));

      const result = await ttpsService.linkReportToActor(1, 42);

      expect(apiClient.post).toHaveBeenCalledWith("/actors/1/reports", { report_id: 42 });
      expect(result.data).toEqual({ message: "Link created" });
    });

    it("should throw on error", async () => {
      vi.spyOn(apiClient, "post").mockRejectedValue(new Error("Bad request"));

      await expect(ttpsService.linkReportToActor(1, 999)).rejects.toThrow("Bad request");
    });
  });

  describe("unlinkReportFromActor", () => {
    it("should unlink a report from an actor on success", async () => {
      vi.spyOn(apiClient, "delete").mockResolvedValue(createMockResponse({ message: "Deleted" }));

      const result = await ttpsService.unlinkReportFromActor(1, 42);

      expect(apiClient.delete).toHaveBeenCalledWith("/actors/1/reports/42");
      expect(result.data).toEqual({ message: "Deleted" });
    });

    it("should throw on error", async () => {
      vi.spyOn(apiClient, "delete").mockRejectedValue(new Error("Not found"));

      await expect(ttpsService.unlinkReportFromActor(1, 999)).rejects.toThrow("Not found");
    });
  });
});
