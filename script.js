// Import questions array.
import { questions } from './questions.js';
// Importing all the fuel controls and elements.
import { fuelTank, fuelControl } from './fuel.js';
// Import the player name and ship name.
import { playerName, shipName } from './playerStart.js';
// Import start screen.
import { start } from './startScreen.js';
// Import win lose logic.
import { winLose } from './winLose.js';
// Import question display. 
import { questioning, questionsBox } from './qPicker.js';

// Retrieving DOM elements.
const gamePlay = document.querySelector('.game-play');

// For on page load.
gamePlay.appendChild(start);