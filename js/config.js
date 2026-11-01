// config.js
// Tunable game constants live here so they can be adjusted in one place.
// Speeds are in pixels per second; acceleration is in pixels per second squared.

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 450;

const PLAYER_WIDTH = 28;
const PLAYER_HEIGHT = 36;
const PLAYER_MOVE_SPEED = 260;

// Gravity is kept strong so that switching feels fast (a SPEC.md priority).
const GRAVITY_ACCELERATION = 3200;
const MAX_FALL_SPEED = 1200;

// Gravity direction values. Multiply by GRAVITY_ACCELERATION to get the
// vertical pull on the player. (Canvas y grows downward.)
const GRAVITY_DOWN = 1;
const GRAVITY_UP = -1;

// Upper limit on the time step for a single frame. If the browser tab is
// paused and resumed, a huge time step could make the player tunnel through
// the floor, so we clamp it.
const MAX_FRAME_SECONDS = 1 / 30;

const COLORS = {
  background: "#1e1e2e",
  solid: "#4a4a6a",
  solidEdge: "#6c6c9a",
  player: "#ffcc4d",
  playerEye: "#1e1e2e",
  // TODO (Phase 2): add colors for keys, the locked/unlocked exit, and spikes.
};
