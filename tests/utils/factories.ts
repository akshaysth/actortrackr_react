import axios, { type AxiosResponse } from "axios";
import type { Actor } from "@/types/actor.types";
import type { Report } from "@/types/report.types";
import type { TTP } from "@/types/ttp.types";

// Mock data factories
export function createMockActor(overrides?: Partial<Actor>): Actor {
  return {
    id: Math.floor(Math.random() * 10000),
    name: overrides?.name ?? "Test Actor",
    description: overrides?.description ?? "A test threat actor",
    ...overrides,
  };
}

export function createMockReport(overrides?: Partial<Report>): Report {
  return {
    id: Math.floor(Math.random() * 10000),
    name: overrides?.name ?? "Test Report",
    author: overrides?.author ?? "Analyst",
    ...overrides,
  };
}

export function createMockTtp(overrides?: Partial<TTP>): TTP {
  return {
    id: Math.floor(Math.random() * 10000),
    name: overrides?.name ?? "Test TTP",
    description: overrides?.description ?? "A test tactic, technique, or procedure",
    ...overrides,
  };
}

export function createMockResponse<T = unknown>(data: T): AxiosResponse<T> {
  return {
    data,
    status: 200,
    statusText: "OK",
    headers: {},
    config: {} as axios.AxiosRequestConfig,
  };
}

// Helper to create a mock axios response chain
export function mockAxiosCall(method: "get" | "post" | "put" | "delete", url: string, response: unknown, error = false): void {
  const mockFn = vi.fn((endpoint: string, ...args: unknown[]) => {
    const matches = endpoint === url || endpoint.startsWith(url.split(":")[0]);
    if (matches) {
      if (error) {
        return Promise.reject(new axios.AxiosError("Network Error"));
      }
      return Promise.resolve(createMockResponse(response));
    }
    return Promise.resolve(createMockResponse([]));
  });

  // Store for later retrieval
  (globalThis as Record<string, unknown>)[`mock_${method}_${url}`] = mockFn;
}

export function getMockFn(method: "get" | "post" | "put" | "delete", url: string) {
  return (globalThis as Record<string, unknown>)[`mock_${method}_${url}`] as ReturnType<typeof vi.fn>;
}

export function resetMocks(): void {
  const keys = Object.keys(globalThis).filter((k) => k.startsWith("mock_"));
  keys.forEach((k) => delete (globalThis as Record<string, unknown>)[k]);
}
