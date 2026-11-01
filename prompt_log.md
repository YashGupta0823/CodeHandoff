Claude Code used in VS Code so no Ai output in words.

1) Read the SPEC.md file in this repository and understand what GravitySwitcher is supposed to be.
I only have about 45 minutes for the initial implementation, and another student will be finishing the game afterward.
Before writing code, understand what the basic foundation should include, what files we should create, and which features should be left for Phase 2.
Keep the project simple and avoid unnecessary complexity.

Create a basic game screen with a dark background, a player character, and solid floor and ceiling boundaries. Add left and right movement using the arrow keys.
Keep the code organized into separate files

2) Now implement the main gravity switching mechanic.
When the player presses Space, gravity should reverse, causing the character to fall toward the ceiling instead of the floor. Pressing Space again should return gravity to normal.

3)Make gravity switching feel responsive, including when the player is already falling and stop the player from falling outside the game screen.


4) Fix the gravity code for collision issues, the gravity cancels out when the player fits a wall so have the gravity continue as is until space is pressed again.
Make sure the player lands correctly on both the floor and ceiling without passing through them or getting stuck.


5) Add one simple obstacle to the game, such as a wall rising from the floor that forces the player to switch gravity to get past it.
The player should not be able to pass through the wall.
Do not add spikes, keys, exits, additional completed levels yet as shown in the spec.

6) 
Make sure functions and variables have clear names and that different responsibilities are separated. Add useful comments explaining anything that might be confusing to someone looking at the project.
Add todo comments showing where the next person should implement key collection, hazards, locked exits, and additional levels.
Do not implement these features or change the spec
