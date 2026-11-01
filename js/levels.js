// levels.js
// Level data. Each level is a plain object, so adding a level means adding
// another object to the LEVELS array; no game code needs to change.
//
// Level format:
//   name          Display name for the level.
//   playerStart   { x, y }: top-left corner where the player spawns.
//   startGravity  GRAVITY_DOWN or GRAVITY_UP.
//   solids        Array of { x, y, width, height } rectangles the player
//                 cannot pass through vertically (floor, ceiling).
//
// TODO (Phase 2): extend the format with:
//   keys:   [{ x, y, width, height }]   collectible keys
//   exit:   { x, y, width, height }     locked until all keys are collected
//   spikes: [{ x, y, width, height }]   touching one resets the level
//   Walls and platforms can go in `solids` once physics.js resolves
//   horizontal collisions (see the TODO there).

const FLOOR_AND_CEILING_THICKNESS = 40;

/**
 * Builds the floor and ceiling rectangles that span the whole canvas.
 * Most levels will start from these and add extra solids on top.
 */
function createFloorAndCeiling() {
  return [
    // Ceiling
    { x: 0, y: 0, width: CANVAS_WIDTH, height: FLOOR_AND_CEILING_THICKNESS },
    // Floor
    {
      x: 0,
      y: CANVAS_HEIGHT - FLOOR_AND_CEILING_THICKNESS,
      width: CANVAS_WIDTH,
      height: FLOOR_AND_CEILING_THICKNESS,
    },
  ];
}

const LEVELS = [
  {
    name: "Level 1: Learn to Flip",
    playerStart: {
      x: 60,
      y: CANVAS_HEIGHT - FLOOR_AND_CEILING_THICKNESS - PLAYER_HEIGHT,
    },
    startGravity: GRAVITY_DOWN,
    solids: createFloorAndCeiling(),
  },
  // TODO (Phase 2): add more levels here. They will be played in array order.
];
