# GravitySwitcher (Phase 1 Foundation)

A 2D puzzle-platformer where the player flips gravity to walk on the floor or the ceiling. See [`SPEC.md`](SPEC.md) for the full design and acceptance criteria.

This is a **Phase 1 foundation**, not the finished game. It has the game screen, player movement, gravity switching, floor/ceiling collision, and a level data format that is ready to extend. Keys, exits, spikes, more levels and the victory screen are left for Phase 2.

## How to run

There are no dependencies and no build step.

- **Easiest:** open `index.html` in a web browser (double-click it).
- **Or use a local server** (useful if your browser restricts local files):
  ```bash
  python3 -m http.server 8000
  # then visit http://localhost:8000
  ```

## Controls

| Key | Action |
| --- | --- |
| Left / Right arrow | Move left / right |
| Space | Switch gravity (floor ↔ ceiling) |

## What works

- A canvas game screen (800×450) with a visible player (yellow block).
- Left/right movement with the arrow keys. Holding both cancels out.
- Gravity switching with Space. You can flip at any time, even mid-air (SPEC.md: "reverse gravity at any moment"). Holding Space flips only once; you must press it again to flip back.
- Collision with the floor and ceiling. The player lands on whichever one gravity pulls toward and can walk along it.
- The player cannot leave the screen on the left or right.
- The player's eye shows which way gravity points (it is on the side away from the surface being stood on) and which way the player is facing.
- Levels are plain data objects in `js/levels.js`, loaded with `loadLevel(index)`.

## Not done yet (Phase 2 and later)

Search the code for `TODO` to find where each item belongs.

| Feature | SPEC.md item | Where to add it |
| --- | --- | --- |
| Wall and platform side collision | #3 | `resolveHorizontalCollisions` stub in `js/physics.js` |
| Collectible keys | #4 | Level format in `js/levels.js`, `updateGame` in `js/game.js`, drawing in `js/renderer.js` |
| Locked/unlocked exit, level completion | #5, #6 | Same as above |
| Spikes that reset the level | #7 | Same as above. Reset by calling `loadLevel(gameState.currentLevelIndex)` |
| Multiple levels that progress automatically | #8 | Add objects to `LEVELS`; call `loadLevel(index + 1)` on exit |
| R to restart | #9 | `js/input.js` (add the key) and `updateGame` |
| On-screen level number / controls (HUD) | #10 | `renderFrame` in `js/renderer.js` (controls are currently shown below the canvas in HTML) |
| Victory screen | #11 | `renderFrame` plus a `hasWon` flag in `gameState` |
| Visual effect / sound on gravity switch | #12, #13 | `switchPlayerGravity` in `js/player.js` |

## File overview

```
index.html        Page layout, canvas, and the <script> tags (load order matters)
css/style.css     Page styling only. All game visuals are drawn on the canvas
js/config.js      Tunable constants: sizes, speeds, gravity strength, colors
js/input.js       Keyboard state: held arrow keys, one-shot Space press
js/levels.js      Level data (LEVELS array) and the level format description
js/player.js      createPlayer() and switchPlayerGravity()
js/physics.js     Movement, gravity, collision resolution, rectanglesOverlap()
js/renderer.js    All drawing code. Reads state and never changes it
js/game.js        Game state, loadLevel(), updateGame(), and the main loop (loaded last)
```

### How a frame works

1. `gameLoop` (game.js) works out how much time has passed (`deltaSeconds`, capped at 1/30 s).
2. `updateGame` checks for a Space press (input.js), then calls `updatePlayerPhysics` (physics.js).
3. `updatePlayerPhysics` moves the player horizontally, then vertically, and pushes it out of any solid it overlaps.
4. `renderFrame` (renderer.js) draws the level and the player.

### Adding a level

Add an object to the `LEVELS` array in `js/levels.js`:

```js
{
  name: "Level 2: Example",
  playerStart: { x: 60, y: 300 },
  startGravity: GRAVITY_DOWN,
  solids: [
    ...createFloorAndCeiling(),
    { x: 300, y: 200, width: 120, height: 20 }, // a platform
  ],
}
```

Phase 1 only loads level 0. Moving to the next level is a Phase 2 task.

## Known limitations

- **Only vertical collision exists.** Solids block the player from above and below, but the player can walk *through* the sides of a platform or wall. When this happens the vertical check can then snap the player to the platform's top or bottom. This is expected until `resolveHorizontalCollisions` is written. Phase 1 levels have only a floor and ceiling, so it does not happen now.
- **The left/right edges are the screen edges** (`keepPlayerInsideScreen`), not real walls. Levels wider than the screen, or a scrolling camera, are not supported.
- **Unlimited mid-air flips.** This follows the spec's "at any moment" wording. If Phase 2 levels make this too easy, require `player.isGrounded` in `updateGame` before flipping.
- **No restart or death.** Phase 1 has nothing to die from and no R key yet.
- **Fast objects could pass through thin solids.** Max vertical speed is 1200 px/s and the time step is capped at 1/30 s, so the player moves at most 40 px per frame. Solids thinner than that (e.g. 10 px platforms) could be skipped at full speed. The floor and ceiling are 40 px thick. Keep Phase 2 platforms at least ~20 px thick, or lower `MAX_FALL_SPEED`.
- The canvas is fixed at 800×450. It shrinks on small screens but does not scale up.
- Keyboard only. There are no touch controls.

## Testing done in Phase 1

- A headless simulation ran the real game scripts with simulated key presses. It checked: the player starts on the floor; left/right movement; no drift when idle; both arrows cancel; Space flips to the ceiling in about 0.47 s; walking on the ceiling; holding Space flips only once; two flips in mid-air; screen-edge clamping; and 200 random flips with large time steps never passing through the floor or ceiling. All passed.
- Checked in Google Chrome over a local server and opened directly from `file://`: movement, flipping to the ceiling and back, no page scrolling when arrows or Space are pressed, and no JavaScript errors.
