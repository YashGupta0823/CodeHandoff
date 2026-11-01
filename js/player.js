// player.js
// Creates the player object and handles player-specific actions.
// Movement physics and collisions live in physics.js.

/**
 * Creates a new player at the given position.
 * @param {{x: number, y: number}} startPosition top-left corner
 * @param {number} startGravity GRAVITY_DOWN or GRAVITY_UP
 */
function createPlayer(startPosition, startGravity) {
  return {
    x: startPosition.x,
    y: startPosition.y,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    velocityX: 0,
    velocityY: 0,
    gravityDirection: startGravity,
    // True when standing on a surface in the current gravity direction.
    isGrounded: false,
    // Remembers which way the player last moved, so the eye can face that way.
    facingDirection: 1,
  };
}

/**
 * Reverses the player's gravity. Per SPEC.md the player may switch at any
 * moment, including mid-air, so there is no grounded check here.
 *
 * TODO (Phase 2/3): play a sound and trigger a visual effect here
 * (SPEC.md Priority 3).
 */
function switchPlayerGravity(player) {
  player.gravityDirection = player.gravityDirection === GRAVITY_DOWN ? GRAVITY_UP : GRAVITY_DOWN;
  player.isGrounded = false;
}
