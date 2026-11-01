# GravitySwitcher (Phase 1)

A 2D puzzle-platformer where you flip gravity to walk on the floor or the ceiling. The design is in [`SPEC.md`](SPEC.md).

Phase 1 is a foundation, not a finished game. You can move, flip gravity, and get past one wall, but there is no key, exit or way to win yet.

## Run it

No dependencies or build step. Open `index.html` in a browser, or run a local server:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

| Key | Action |
| --- | --- |
| ← / → | Move |
| Space | Flip gravity (works mid-air; holding it flips only once) |

## SPEC.md acceptance criteria

| # | Criterion | Status |
| --- | --- | --- |
| 1 | Arrow keys move the player | ✅ Met |
| 2 | Space reverses gravity | ✅ Met |
| 3 | Can't pass through floors, ceilings, walls | ✅ Met. Every solid blocks the player from all sides. Level 1 has one wall; no level has a platform yet |
| 4 | Keys remove themselves and unlock the exit | ❌ Not met |
| 5 | Locked exit doesn't complete the level | ❌ Not met |
| 6 | One level can be finished start to end | ❌ Not met (no keys or exit) |
| 7 | Spikes reset the player | ❌ Not met |
| 8 | Several levels that progress automatically | ❌ Not met. Only level 0 exists and loads |
| 9 | R restarts the level | ❌ Not met |
| 10 | Level number and controls on screen | 🟡 Partial. Controls are shown in HTML below the canvas; no level number |
| 11 | Win message after the final level | ❌ Not met |
| 12 | Gravity switch has a visible effect | 🟡 Partial. The player's eye moves to the other side; there is no dedicated effect |
| 13 | Sounds on flip and level complete | ❌ Not met |

## Code map

Scripts are plain `<script>` tags (no modules), so they load in the order listed in `index.html`, and `game.js` must be last.

| File | What it does |
| --- | --- |
| `index.html` | Canvas, controls text, and the script tags |
| `css/style.css` | Page styling only; the game is drawn on the canvas |
| `js/config.js` | Constants: canvas and player size, speeds, gravity, colors |
| `js/input.js` | Keyboard state. `getHorizontalInputDirection()` returns -1/0/1; `consumeGravitySwitchPress()` returns true once per Space press |
| `js/levels.js` | The `LEVELS` array and the level format. `createFloorAndCeiling()` builds the two default solids |
| `js/player.js` | `createPlayer()` builds the player object; `switchPlayerGravity()` flips it |
| `js/physics.js` | `updatePlayerPhysics()` moves the player along x, then y. `resolveHorizontalCollisions()` / `resolveVerticalCollisions()` push it out of solids. `rectanglesOverlap()` is the shared hit test. `keepPlayerInsideScreen()` clamps to the screen edges |
| `js/renderer.js` | `renderFrame()` draws the background, the solids and the player. It only reads state |
| `js/game.js` | `gameState`, `loadLevel(index)` (also the restart function), `updateGame()` (one game step), and `gameLoop()` (runs every frame) |

A level is `{ name, playerStart, startGravity, solids }`. To add a wall or platform, add a `{ x, y, width, height }` rectangle to `solids`; no other code needs to change. Level 1's wall is an example.

## Next steps (in priority order)

Search for `TODO` in the code; each one marks where a feature goes.

1. **Keys, locked exit, level completion** (#4–6). These finish Priority 1. Add `keys` and `exit` to the level format; copy keys into `gameState` in `loadLevel` so a restart restores them; check touches with `rectanglesOverlap()` in `updateGame`; draw them in `renderFrame`. Put the exit beyond the wall in level 1.
2. **R to restart and spikes** (#9, #7). Both just call `loadLevel(gameState.currentLevelIndex)`.
3. **More levels, auto-progression, win screen** (#8, #11). Load `currentLevelIndex + 1` on exit; set a `hasWon` flag after the last level. Add at least one platform to test platform collision.
4. **On-screen level number** (#10), drawn in `renderFrame`.
5. **Flip effect and sounds** (#12–13), in `switchPlayerGravity`. The spec says to cut these first if time runs short.

## Known issues and shortcuts

- **Thin solids can be skipped.** The player falls up to 40 px per frame, so a solid thinner than that can be passed through. Make solids about 20 px thick or more, or lower `MAX_FALL_SPEED`.
- **Corner snap.** If the player is falling past the edge of a solid's top and overlaps it by a few pixels sideways, it gets placed on top instead of falling past. This is common in simple platformers.
- **Slow motion under 30 fps.** Each frame's time step is capped at 1/30 s to stop the player passing through solids. On a slow machine, the game runs slower instead of skipping frames.
- **Canvas size is set in two places.** It is in `index.html` and in `CANVAS_WIDTH`/`CANVAS_HEIGHT` in `config.js`; change both together.
- **Screen edges act as walls.** No scrolling, and levels can't be wider than 800 px.
- **Unlimited mid-air flips.** This matches the spec's "at any moment". To limit it, require `player.isGrounded` before flipping. That flag is maintained but not used yet.
- **Solids can't move.** Collision assumes still solids. A moving platform would need to push the player.
- The level `name` isn't displayed anywhere yet.
- Keyboard only. The canvas shrinks on small screens but never grows beyond 800×450.

## Testing

A headless Node simulation ran the real scripts with fake key presses. It covered:

- movement, flipping, and holding Space;
- screen edges;
- being blocked by the wall from both sides;
- going over the wall on the ceiling, and landing on its top;
- 20,000 random frames without ever overlapping a solid.

All checks passed. The wall changes have not yet been checked by playing in a browser.
