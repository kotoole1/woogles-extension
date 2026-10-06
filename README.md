# woogles-extension

Userscript that improves the post-game analysis layout on woogles.io for
mobile Firefox: the **Analyzer card** (the best-moves list) appears directly
after the board controls (players → board → rack → controls → **analyzer**),
instead of at the very bottom below chat.

Scope: examine/analysis mode only (finished and annotated games). Live games
are untouched. Everything else keeps its normal relative order.

## Install (Firefox for Android)

1. One-time: install **Tampermonkey** (or Violentmonkey) from addons.mozilla.org.
2. Open this URL on the phone (or paste it into Tampermonkey → Utilities →
   "Install from URL"):

   https://raw.githubusercontent.com/kotoole1/woogles-extension/main/woogles-analyzer-first.user.js

Updates are automatic: the script's `@updateURL` points at the same raw URL,
so pushing to `main` with a bumped `@version` reaches the phone on its next
update check (or force it via Tampermonkey → the script → "Check for updates").

## LAN iteration (no push needed)

```sh
cd ~/repos/woogles-extension && python3 -m http.server 8731 --bind 0.0.0.0
```

Phone (same wifi): open `http://<mac-ip>:8731/woogles-analyzer-first.user.js`.

## How it works

Below 1024px woogles lays out `.game-table` as a wrapping flex row ordered
with CSS `order`; the analyzer sits inside `.chat-area` (order 3, bottom of
the page). The script injects a few CSS rules: in examine mode (detected via
`:has(.analyzer-card)` — that card only renders then), `.chat-area` becomes
`display: contents` so its cards join the flex layout, and the analyzer gets
`order: 1` — right after the play area. No DOM mutation, no MutationObserver,
nothing for React to trip over.
