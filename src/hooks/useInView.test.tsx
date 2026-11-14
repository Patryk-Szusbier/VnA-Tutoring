import { act, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { MockIntersectionObserver } from "../test/setup";
import { useInView } from "./useInView";

function Probe() {
  const [ref, inView] = useInView<HTMLDivElement>("-20% 0px");
  return <div ref={ref}>{inView ? "visible" : "hidden"}</div>;
}

test("śledzi widoczność elementu i sprząta observer po odmontowaniu", () => {
  const { unmount } = render(<Probe />);
  const [io] = MockIntersectionObserver.instances;

  expect(io.options).toEqual({ rootMargin: "-20% 0px", threshold: 0.3 });
  expect(io.observe).toHaveBeenCalledWith(screen.getByText("hidden"));

  act(() => io.callback([{ isIntersecting: true }]));
  expect(screen.getByText("visible")).toBeTruthy();

  act(() => io.callback([{ isIntersecting: false }]));
  expect(screen.getByText("hidden")).toBeTruthy();

  unmount();
  expect(io.disconnect).toHaveBeenCalledOnce();
});
