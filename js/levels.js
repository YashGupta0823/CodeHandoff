// levels.js
// Level data. Each level is a plain object, so adding a level means adding
// another object to the LEVELS array; no game code needs to change.
//
// Level format:
//   name          Display name for the level.
//   playerStart   { x, y }: top-left corner where the player spawns.
//   startGravity  GRAVITY_DOWN or GRAVITY_UP.
//   solids        Array of { x, y, width, height } rectangles the player
//                 cannot pass through from any side: floor, ceiling, walls
//                 and platforms. Add an obstacle by adding a rectangle here.
//                 Keep solids at least ~20 px thick (see README "Known
//                 limitations").
//
// TODO (Phase 2): extend the format with:
//   keys:   [{ x, y, width, height }]   collectible keys
//   exit:   { x, y, width, height }     locked until all keys are collected
//   spikes: [{ x, y, width, height }]   touching one resets the level

const FLOOR_AND_CEILING_THICKNESS = 40;

// The wall in level 1 leaves this much room below the ceiling, so the player
// fits through only while walking on the ceiling.
const LEVEL_1_WALL_GAP_BELOW_CEILING = 110;

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
    solids: [
      ...createFloorAndCeiling(),
      // Wall rising from the floor. It is too tall to get past on the floor,
      // so the player has to flip to the ceiling and walk over it.
      {
        x: 380,
        y: FLOOR_AND_CEILING_THICKNESS + LEVEL_1_WALL_GAP_BELOW_CEILING,
        width: 40,
        height:
          CANVAS_HEIGHT - 2 * FLOOR_AND_CEILING_THICKNESS - LEVEL_1_WALL_GAP_BELOW_CEILING,
      },
      // TODO (Phase 2): put the exit on the far side of the wall so getting
      // past it completes the level.
    ],
  },
  // TODO (Phase 2): add more levels here. They will be played in array order.
];
