// renderer.js
// All drawing code. These functions only read game state and never change it.

/**
 * Draws one full frame.
 * @param {CanvasRenderingContext2D} context
 * @param {object} level  an entry from LEVELS
 * @param {object} player from createPlayer()
 */
function renderFrame(context, level, player) {
  drawBackground(context);
  drawSolids(context, level.solids);
  // TODO (Phase 2): drawKeys, drawExit, drawSpikes.
  drawPlayer(context, player);
  // TODO (Phase 2): drawHud (level number, controls), drawVictoryScreen.
}

function drawBackground(context) {
  context.fillStyle = COLORS.background;
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function drawSolids(context, solids) {
  for (const solid of solids) {
    context.fillStyle = COLORS.solid;
    context.fillRect(solid.x, solid.y, solid.width, solid.height);
    context.strokeStyle = COLORS.solidEdge;
    context.lineWidth = 2;
    context.strokeRect(solid.x + 1, solid.y + 1, solid.width - 2, solid.height - 2);
  }
}

/**
 * Draws the player as a rectangle with an eye. The eye sits on the side of the
 * body facing away from gravity (the "head"), so you can see at a glance
 * whether the player is on the floor or the ceiling.
 */
function drawPlayer(context, player) {
  context.fillStyle = COLORS.player;
  context.fillRect(player.x, player.y, player.width, player.height);

  const eyeSize = 6;
  const eyeOffsetFromEdge = 8;
  const eyeX =
    player.facingDirection > 0
      ? player.x + player.width - eyeOffsetFromEdge - eyeSize
      : player.x + eyeOffsetFromEdge;
  const eyeY =
    player.gravityDirection === GRAVITY_DOWN
      ? player.y + eyeOffsetFromEdge
      : player.y + player.height - eyeOffsetFromEdge - eyeSize;

  context.fillStyle = COLORS.playerEye;
  context.fillRect(eyeX, eyeY, eyeSize, eyeSize);
}
