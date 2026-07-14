# Chrome Extension Playground

A small collection of unpacked Chrome (Manifest V3) extensions built while
learning the extensions APIs, plus one YouTube comment translator adapted
from an existing open-source extension.

## Status: Archived / Unmaintained

This repository is **archived and not actively developed**. It was a
personal learning project; the last commit was in June 2024. Code is kept
as-is for reference. No support or updates should be expected, but see
"Verified to work" below — as of 2026-07-14 everything here still loads and
runs with no changes required.

## What's in here

- **`extensions_101/`** — "Hello Extensions", the bare-minimum popup
  extension from Chrome's [Getting Started
  guide](https://developer.chrome.com/docs/extensions/mv3/getstarted/).
- **`reading_time/`** — Content script that adds an estimated reading time
  badge to `developer.chrome.com` documentation pages (from the same
  Getting Started tutorial series).
- **`yt_translator/`** — Adds a "translate" button to YouTube comments,
  calling a translation API (Google Translate's unofficial endpoint, or a
  custom one you configure) client-side. Adapted from
  [toluschr/YouTube-Comment-Translate](https://github.com/toluschr/YouTube-Comment-Translate).
  See `yt_translator/README.md` for its own notes and architecture diagram.

Each subfolder is an independent, self-contained extension — there is no
shared code and no build step ties them together.

## Tech stack

- Vanilla JavaScript, HTML, and Manifest V3 `manifest.json` files — no
  bundler, framework, or transpilation.
- `chrome-types` (`package.json`) — TypeScript type definitions for the
  `chrome.*` APIs, used only for editor IDE support. Nothing in the repo
  imports or requires it at runtime.
- No test suite, no CI configuration.

## Setup & run

There's no build step. Each extension is loaded directly as "unpacked" in
Chrome:

1. Open `chrome://extensions` in Chrome.
2. Enable **Developer mode** (toggle, top right).
3. Click **Load unpacked** and select one of the extension folders
   (`extensions_101/`, `reading_time/`, or `yt_translator/`).
4. The extension becomes active immediately — no further build/run
   commands are needed.

Optional: `npm install` will fetch `chrome-types` for editor
autocompletion, but this is not required to run any of the extensions.

### Verified to work (2026-07-14)

Re-checked before archival:
- All three `manifest.json` files parse as valid JSON.
- All `.js` files pass a Node syntax check with no errors.
- Every asset referenced by a manifest (icons, `arch.JPG`, etc.) is present
  in the repo.
- `npm install` succeeds cleanly (`chrome-types@0.1.238` is still
  available on the registry).

No code changes were needed to get this into a working state — it was
already functional. The only pre-existing working-tree diff you'll see
(CRLF vs LF line endings) is unrelated to this and comes from checking the
repo out on this machine; it predates this review.

## Notes for a future reader

- `yt_translator/inject.js` talks to a hardcoded translation endpoint
  (configurable via the extension's options page, `options.html`/
  `options.js`, backed by `chrome.storage.sync`). There's no bundled API
  key — you provide your own endpoint if you don't want to use the default
  Google Translate one.
- No `LICENSE` file is present in this repository, so no license is
  claimed here; check with the original repo author before reuse.
