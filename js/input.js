// input.js
// Tracks keyboard state. The rest of the game asks this file questions
// ("is left held?", "was gravity switch pressed?") instead of listening to
// key events directly.

const KEY_LEFT = "ArrowLeft";
const KEY_RIGHT = "ArrowRight";
const KEY_SWITCH_GRAVITY = "Space";
// TODO (Phase 2): add KEY_RESTART = "KeyR" and a consumeRestartPress() helper.

// Keys that should not scroll the page while the game is focused.
const KEYS_TO_BLOCK_DEFAULT = [KEY_LEFT, KEY_RIGHT, KEY_SWITCH_GRAVITY, "ArrowUp", "ArrowDown"];

const heldKeys = new Set();

// Gravity switching happens once per key press, not every frame while Space
// is held, so we remember that a press happened until the game consumes it.
let gravitySwitchRequested = false;

window.addEventListener("keydown", (event) => {
  if (KEYS_TO_BLOCK_DEFAULT.includes(event.code)) {
    event.preventDefault();
  }

  // event.repeat is true for auto-repeated keydowns while a key is held.
  if (event.code === KEY_SWITCH_GRAVITY && !event.repeat) {
    gravitySwitchRequested = true;
  }

  heldKeys.add(event.code);
});

window.addEventListener("keyup", (event) => {
  heldKeys.delete(event.code);
});

// Release all keys if the window loses focus, otherwise a key released while
// the window is in the background would stay "held" forever.
window.addEventListener("blur", () => {
  heldKeys.clear();
});

/**
 * Returns -1 (left), 1 (right) or 0 (no movement / both held).
 */
function getHorizontalInputDirection() {
  let direction = 0;
  if (heldKeys.has(KEY_LEFT)) direction -= 1;
  if (heldKeys.has(KEY_RIGHT)) direction += 1;
  return direction;
}

/**
 * Returns true once per Space press, then resets.
 */
function consumeGravitySwitchPress() {
  const wasRequested = gravitySwitchRequested;
  gravitySwitchRequested = false;
  return wasRequested;
}
