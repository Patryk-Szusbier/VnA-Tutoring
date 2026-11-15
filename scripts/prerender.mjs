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

// Fonty z polskimi znakami (latin + latin-ext) pobierane od razu: tekst układa się raz,
// zamiast ponownie po doczytaniu każdego pliku fontu (krótszy Total Blocking Time).
const fonts = [...new Set(css.match(/\/assets\/[\w-]+-latin(-ext)?-wght-normal-[\w-]+\.woff2/g))];
if (fonts.length !== 4) throw new Error(`prerender: oczekiwano 4 plików fontów, jest ${fonts.length}`);
const preloads = fonts
  .map((href) => `<link rel="preload" as="font" type="font/woff2" crossorigin href="${href}">`)
  .join("");

const result = page
  .replace(stylesheet[0], () => `${preloads}<style>${css}</style>`)
  .replace(marker, () => `<div id="root">${html}</div>`);
await writeFile(file, result);
// vite-plugin-compression spakował jeszcze pustą wersję strony.
if (existsSync(`${file}.gz`)) await writeFile(`${file}.gz`, gzipSync(result));
await rm("dist-ssr", { recursive: true });
console.log(`prerender: ${file} (${(result.length / 1024).toFixed(1)} kB)`);
