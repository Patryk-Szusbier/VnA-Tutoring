import { expect, test } from "vitest";
import { keepShortWords } from "./typography";

test("skleja jednoliterowe słowa z następnym wyrazem", () => {
  expect(keepShortWords("Notatki i zadania z lekcji w Teams")).toBe(
    "Notatki i\u00a0zadania z\u00a0lekcji w\u00a0Teams",
  );
  expect(keepShortWords("W czym pomagam")).toBe("W\u00a0czym pomagam");
  expect(keepShortWords("110 zł za lekcję")).toBe("110 zł za lekcję");
});
