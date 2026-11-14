import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// jsdom nie implementuje IntersectionObserver – atrapa z ręcznym wyzwalaniem
export class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  callback: (entries: { isIntersecting: boolean }[]) => void;
  options?: IntersectionObserverInit;
  constructor(
    callback: (entries: { isIntersecting: boolean }[]) => void,
    options?: IntersectionObserverInit,
  ) {
    this.callback = callback;
    this.options = options;
    MockIntersectionObserver.instances.push(this);
  }
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

afterEach(() => {
  cleanup();
  MockIntersectionObserver.instances = [];
});
