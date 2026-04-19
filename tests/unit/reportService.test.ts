import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as reportService from "@/services/reportService";
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

const mockReport = { id: 1, name: "Test Report", author: "Analyst" };
const mockReports = [mockReport, { id: 2, name: "Report 2", author: "Other" }];

describe("reportService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getReports", () => {
    it("should return all reports on success", async () => {
      vi.spyOn(apiClient, "get").mockResolvedValue(createMockResponse(mockReports));

      const result = await reportService.getReports();

      expect(apiClient.get).toHaveBeenCalledWith("/reports");
      expect(result.data).toEqual(mockReports);
    });

    it("should throw on error", async () => {
      vi.spyOn(apiClient, "get").mockRejectedValue(new Error("Network Error"));

      await expect(reportService.getReports()).rejects.toThrow("Network Error");
    });
  });

  describe("getReportById", () => {
    it("should return a single report on success", async () => {
      vi.spyOn(apiClient, "get").mockResolvedValue(createMockResponse(mockReport));

      const result = await reportService.getReportById(1);

      expect(apiClient.get).toHaveBeenCalledWith("/reports/1");
      expect(result.data).toEqual(mockReport);
    });

    it("should throw on error", async () => {
      vi.spyOn(apiClient, "get").mockRejectedValue(new Error("Not found"));

      await expect(reportService.getReportById(999)).rejects.toThrow("Not found");
    });
  });

  describe("createReport", () => {
    it("should create a report on success", async () => {
      const newReport = { name: "New Report", author: "Analyst" };
      vi.spyOn(apiClient, "post").mockResolvedValue(createMockResponse({ ...mockReport, id: 3, ...newReport }));

      const result = await reportService.createReport(newReport);

      expect(apiClient.post).toHaveBeenCalledWith("/reports", newReport);
      expect(result.data).toEqual({ id: 3, name: "New Report", author: "Analyst" });
    });

    it("should throw on error", async () => {
      vi.spyOn(apiClient, "post").mockRejectedValue(new Error("Validation error"));

      await expect(reportService.createReport({ name: "" })).rejects.toThrow("Validation error");
    });
  });

  describe("updateReport", () => {
    it("should update a report on success", async () => {
      const updates = { name: "Updated Report" };
      vi.spyOn(apiClient, "put").mockResolvedValue(createMockResponse({ ...mockReport, ...updates }));

      const result = await reportService.updateReport(1, updates);

      expect(apiClient.put).toHaveBeenCalledWith("/reports/1", updates);
      expect(result.data).toEqual({ id: 1, name: "Updated Report", author: "Analyst" });
    });

    it("should throw on error", async () => {
      vi.spyOn(apiClient, "put").mockRejectedValue(new Error("Not found"));

      await expect(reportService.updateReport(999, { name: "X" })).rejects.toThrow("Not found");
    });
  });

  describe("deleteReport", () => {
    it("should delete a report on success", async () => {
      vi.spyOn(apiClient, "delete").mockResolvedValue(createMockResponse({ message: "Deleted" }));

      const result = await reportService.deleteReport(1);

      expect(apiClient.delete).toHaveBeenCalledWith("/reports/1");
      expect(result.data).toEqual({ message: "Deleted" });
    });

    it("should throw on error", async () => {
      vi.spyOn(apiClient, "delete").mockRejectedValue(new Error("Not found"));

      await expect(reportService.deleteReport(999)).rejects.toThrow("Not found");
    });
  });

  describe("linkTtpToReport", () => {
    it("should link a TTP to a report on success", async () => {
      vi.spyOn(apiClient, "post").mockResolvedValue(createMockResponse({ message: "Link created" }));

      const result = await reportService.linkTtpToReport(1, 42);

      expect(apiClient.post).toHaveBeenCalledWith("/reports/1/ttps", { ttp_id: 42 });
      expect(result.data).toEqual({ message: "Link created" });
    });

    it("should throw on error", async () => {
      vi.spyOn(apiClient, "post").mockRejectedValue(new Error("Bad request"));

      await expect(reportService.linkTtpToReport(1, 999)).rejects.toThrow("Bad request");
    });
  });

  describe("unlinkTtpFromReport", () => {
    it("should unlink a TTP from a report on success", async () => {
      vi.spyOn(apiClient, "delete").mockResolvedValue(createMockResponse({ message: "Deleted" }));

      const result = await reportService.unlinkTtpFromReport(1, 42);

      expect(apiClient.delete).toHaveBeenCalledWith("/reports/1/ttps/42");
      expect(result.data).toEqual({ message: "Deleted" });
    });

    it("should throw on error", async () => {
      vi.spyOn(apiClient, "delete").mockRejectedValue(new Error("Not found"));

      await expect(reportService.unlinkTtpFromReport(1, 999)).rejects.toThrow("Not found");
    });
  });
});
