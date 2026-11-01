// game.js
// Entry point: holds the game state, loads levels, and runs the main loop.
// Must be loaded last (see index.html).

const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");

const gameState = {
  currentLevelIndex: 0,
  currentLevel: null,
  player: null,
  // TODO (Phase 2): track collected keys and whether the exit is unlocked,
  // e.g. remainingKeys: [], isExitUnlocked: false, hasWon: false.
};

let lastFrameTimestamp = null;

/**
 * Loads a level by its index in LEVELS and puts the player at its start.
 * Also use this to restart the current level (Phase 2: R key and spikes).
 */
function loadLevel(levelIndex) {
  const level = LEVELS[levelIndex];
  gameState.currentLevelIndex = levelIndex;
  gameState.currentLevel = level;
  gameState.player = createPlayer(level.playerStart, level.startGravity);
  // TODO (Phase 2): copy the level's keys into gameState so collecting one
  // does not change the original level data (needed for restarting).
}

/**
 * Updates the game by one time step.
 */
function updateGame(deltaSeconds) {
  const { player, currentLevel } = gameState;

  if (consumeGravitySwitchPress()) {
    switchPlayerGravity(player);
  }

  updatePlayerPhysics(player, currentLevel, getHorizontalInputDirection(), deltaSeconds);

  // TODO (Phase 2), in roughly this order:
  //   - R pressed            -> loadLevel(gameState.currentLevelIndex)
  //   - touching a spike     -> loadLevel(gameState.currentLevelIndex)
  //   - touching a key       -> remove it; unlock the exit when none remain
  //   - touching open exit   -> loadLevel(next index), or show victory after
  //                             the last level
  // rectanglesOverlap() in physics.js handles the "touching" checks.
}

function gameLoop(timestamp) {
  if (lastFrameTimestamp === null) {
    lastFrameTimestamp = timestamp;
  }
  const deltaSeconds = Math.min((timestamp - lastFrameTimestamp) / 1000, MAX_FRAME_SECONDS);
  lastFrameTimestamp = timestamp;

  updateGame(deltaSeconds);
  renderFrame(context, gameState.currentLevel, gameState.player);

  requestAnimationFrame(gameLoop);
}

loadLevel(0);
requestAnimationFrame(gameLoop);
