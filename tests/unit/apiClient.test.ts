import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import apiClient from "@/services/apiClient";
import axios from "axios";

describe("apiClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should be an axios instance", () => {
    expect(apiClient).toBeDefined();
    expect(typeof apiClient.get).toBe("function");
    expect(typeof apiClient.post).toBe("function");
    expect(typeof apiClient.put).toBe("function");
    expect(typeof apiClient.delete).toBe("function");
  });

  it("should have Content-Type header set to application/json", () => {
    expect(apiClient.defaults.headers["Content-Type"]).toBe("application/json");
  });

  it("should use VITE_API_URL as base URL", () => {
    const expectedBaseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
    expect(apiClient.defaults.baseURL).toBe(expectedBaseURL);
  });

  it("should create the client with default axios config", () => {
    const createSpy = vi.spyOn(axios, "create");
    // Re-import to trigger the create call
    vi.resetModules();
    return import("@/services/apiClient").then((mod) => {
      expect(createSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
        })
      );
    });
  });
});
