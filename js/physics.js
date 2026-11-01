// physics.js
// Moves the player and resolves collisions with the level.
//
// The player is moved one axis at a time (horizontal, then vertical). Doing
// the axes separately makes it easy to tell which side of a solid was hit,
// and it is the usual place to add wall collision later.

/**
 * Returns true if two axis-aligned rectangles overlap.
 * Each rectangle needs x, y, width and height.
 * This will also be useful for keys, exits and spikes in Phase 2.
 */
function rectanglesOverlap(rectA, rectB) {
  return (
    rectA.x < rectB.x + rectB.width &&
    rectA.x + rectA.width > rectB.x &&
    rectA.y < rectB.y + rectB.height &&
    rectA.y + rectA.height > rectB.y
  );
}

/**
 * Advances the player by one time step.
 * @param {object} player from createPlayer()
 * @param {object} level  an entry from LEVELS
 * @param {number} horizontalInput -1, 0 or 1
 * @param {number} deltaSeconds time since the last frame
 */
function updatePlayerPhysics(player, level, horizontalInput, deltaSeconds) {
  // --- Horizontal movement ---
  player.velocityX = horizontalInput * PLAYER_MOVE_SPEED;
  if (horizontalInput !== 0) {
    player.facingDirection = horizontalInput;
  }
  player.x += player.velocityX * deltaSeconds;
  keepPlayerInsideScreen(player);
  // TODO (Phase 2): call resolveHorizontalCollisions(player, level.solids)
  // here so walls and the sides of platforms block the player.

  // --- Vertical movement (gravity) ---
  player.velocityY += GRAVITY_ACCELERATION * player.gravityDirection * deltaSeconds;
  player.velocityY = Math.max(-MAX_FALL_SPEED, Math.min(MAX_FALL_SPEED, player.velocityY));
  player.y += player.velocityY * deltaSeconds;
  resolveVerticalCollisions(player, level.solids);
}

/**
 * Stops the player from walking off the left or right edge of the screen.
 */
function keepPlayerInsideScreen(player) {
  if (player.x < 0) {
    player.x = 0;
  }
  if (player.x + player.width > CANVAS_WIDTH) {
    player.x = CANVAS_WIDTH - player.width;
  }
}

/**
 * Pushes the player out of any solid it moved into vertically, and updates
 * player.isGrounded. Call this right after changing player.y.
 *
 * Phase 1 only needs the floor and ceiling, but this works for any solid
 * rectangle approached from above or below.
 */
function resolveVerticalCollisions(player, solids) {
  player.isGrounded = false;

  for (const solid of solids) {
    if (!rectanglesOverlap(player, solid)) {
      continue;
    }

    if (player.velocityY > 0) {
      // Moving down: land on top of the solid.
      player.y = solid.y - player.height;
    } else if (player.velocityY < 0) {
      // Moving up: land on the underside of the solid.
      player.y = solid.y + solid.height;
    }

    // The player is "grounded" if it was pushed against the surface it is
    // being pulled toward by gravity.
    const movingWithGravity = Math.sign(player.velocityY) === player.gravityDirection;
    if (movingWithGravity) {
      player.isGrounded = true;
    }
    player.velocityY = 0;
  }
}

// TODO (Phase 2): implement resolveHorizontalCollisions(player, solids).
// Same idea as resolveVerticalCollisions, but using player.velocityX to decide
// whether to push the player to the left or right side of the solid.
