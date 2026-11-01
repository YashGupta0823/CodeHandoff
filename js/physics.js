// physics.js
// Moves the player and resolves collisions with the level.
//
// The player is moved one axis at a time (horizontal, then vertical). Doing
// the axes separately makes it easy to tell which side of a solid was hit:
// the horizontal pass handles walls and platform sides, the vertical pass
// handles floors, ceilings, and platform tops and undersides.

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
  resolveHorizontalCollisions(player, level.solids);

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
 * Works for any solid approached from above or below: the floor, the
 * ceiling, and the top of a wall the player lands on after flipping.
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

/**
 * Pushes the player out of any solid it walked into from the side. Call this
 * right after changing player.x.
 *
 * A player standing on a surface touches it but does not overlap it (see
 * rectanglesOverlap), so the floor and ceiling never block walking.
 */
function resolveHorizontalCollisions(player, solids) {
  for (const solid of solids) {
    if (!rectanglesOverlap(player, solid)) {
      continue;
    }

    if (player.velocityX > 0) {
      // Moving right: stop against the solid's left side.
      player.x = solid.x - player.width;
    } else if (player.velocityX < 0) {
      // Moving left: stop against the solid's right side.
      player.x = solid.x + solid.width;
    }
    player.velocityX = 0;
  }
  // TODO (Phase 2+): moving platforms would also need to push the player here,
  // since then the solid moves into the player rather than the other way round.
}
