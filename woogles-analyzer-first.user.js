// ==UserScript==
// @name         Woogles Analyzer First
// @namespace    woogles-extension
// @version      0.2.0
// @description  Mobile woogles.io: when examining a game, show the Analyzer (best-moves list) right after the board controls.
// @match        https://woogles.io/game/*
// @match        https://woogles.io/anno/*
// @downloadURL  https://raw.githubusercontent.com/kotoole1/woogles-extension/main/woogles-analyzer-first.user.js
// @updateURL    https://raw.githubusercontent.com/kotoole1/woogles-extension/main/woogles-analyzer-first.user.js
// @grant        GM_addStyle
// @run-at       document-start
// @noframes
// ==/UserScript==

/*
 * On mobile (<1024px) woogles lays out .game-table as a wrapping flex row
 * whose children stack vertically in `order`:
 *   .sticky-player-card-container (0), .play-area (0: board/rack/controls),
 *   .data-area (0: pool/scores/moves/game-info), .chat-area (3: chat + analyzer).
 *
 * The Analyzer card lives inside .chat-area, so pure reordering can't reach
 * it — instead, in examine mode only (the .analyzer-card exists only then),
 * we `display: contents` the .chat-area so its cards become flex items of
 * .game-table, then slot the analyzer at order 1 (right after the controls)
 * and keep everything else in its current sequence:
 *   players/board/rack/controls (0) → analyzer (1) → data-area (2) → chat (4).
 *
 * Promoted cards lose .chat-area's width constraint, so they get the same
 * column width the sibling areas use. .ca-fullscreen (the computer-analysis
 * overlay mode) has its own layout and is left alone. No DOM is mutated, so
 * React never notices.
 */
GM_addStyle(`
  @media (max-width: 1023px) {
    .game-table:has(.chat-area > .analyzer-card) .chat-area:not(.ca-fullscreen) {
      display: contents;
    }
    .game-table:has(.chat-area > .analyzer-card) .chat-area:not(.ca-fullscreen) > * {
      min-width: calc(510px / var(--dim, 15) * var(--dim, 15) + 24px);
      max-width: calc(510px / var(--dim, 15) * var(--dim, 15) + 24px);
      margin: 0 0 12px;
      order: 4;
    }
    .game-table:has(.chat-area > .analyzer-card) .chat-area:not(.ca-fullscreen) > .analyzer-card {
      order: 1;
    }
    .game-table:has(.chat-area > .analyzer-card) .data-area {
      order: 2;
    }
  }
`);
