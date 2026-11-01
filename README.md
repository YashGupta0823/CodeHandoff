GravitySwitcher

A game where you flip gravity to walk on the floor or the ceiling.
Phase 1 is a foundation where you can move, flip gravity, and get past one wall, but there is no key, exit or way to win yet.

Run it with open index.html in a browser, or run a local server:
python3 -m http.server 8000   # then visit http://localhost:8000

arrows for moving and space fo Flip gravity (works mid-air)

SPEC acceptance criteria
Arrow keys move the player - Yes
Space reverses gravity - Yes
Can't pass through floors, ceilings, walls - Yes

Not Yet:
Keys remove themselves and unlock the exit 
Locked exit doesn't complete the level 
One level can be finished start to end
Spikes reset the player 
Several levels that progress automatically
R restarts the level 
Level number and controls on screen - Partial with control instructions
Win message after the final level 
Gravity switch has a visible effect - Partial (eye moveemnt)
Sounds on flip and level complete 

index.html - controls text
css/style.css - Page styling 
js/config.js -  Constants like canvas and player size
js/input.js - Keyboard state.
js/levels.js - The LEVELS array and the level format. createFloorAndCeiling() builds the two default solids
js/player.js - createPlayer() builds the player object and switchPlayerGravity() flips it
js/physics.js - updatePlayerPhysics() moves the player along x, then y.
js/renderer.js - renderFrame() draws the background and the player.
js/game.js - game States

Next steps

1. Keys, exit, level completion
2. R to restart and spikes
3. More levels, auto progression, win screen
4. On screen level number
5. Flip effect and sounds

Known issues
- Thin solids can be skipped
