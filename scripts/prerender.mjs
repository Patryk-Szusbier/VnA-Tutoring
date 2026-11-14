// Wstawia wyrenderowany HTML aplikacji do dist/index.html, żeby treść była widoczna,
// zanim przeglądarka pobierze i uruchomi JavaScript. Uruchamiane przez `npm run build`.
import { existsSync } from "node:fs";
import { readFile, rm, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { gzipSync } from "node:zlib";

const { html } = await import(pathToFileURL("dist-ssr/entry-server.js").href);
const file = "dist/index.html";
const page = await readFile(file, "utf8");
const marker = '<div id="root"></div>';

if (!page.includes(marker)) throw new Error(`prerender: brak ${marker} w ${file}`);
if (!html.includes("<h1")) throw new Error("prerender: wyrenderowany HTML nie zawiera nagłówka h1");

// Style trafiają wprost do HTML: pierwsze wyświetlenie nie czeka na osobne pobranie pliku CSS.
const stylesheet = page.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
if (!stylesheet) throw new Error(`prerender: brak arkusza stylów w ${file}`);
const css = await readFile(`dist${stylesheet[1]}`, "utf8");

const result = page
  .replace(stylesheet[0], () => `<style>${css}</style>`)
  .replace(marker, () => `<div id="root">${html}</div>`);
await writeFile(file, result);
// vite-plugin-compression spakował jeszcze pustą wersję strony.
if (existsSync(`${file}.gz`)) await writeFile(`${file}.gz`, gzipSync(result));
await rm("dist-ssr", { recursive: true });
console.log(`prerender: ${file} (${(result.length / 1024).toFixed(1)} kB)`);
