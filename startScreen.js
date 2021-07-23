//Import the player start screen function.
import { playerStart} from './playerStart.js';

// Retrieving DOM elements.
const gamePlay = document.querySelector('.game-play');

//Start screen.
const start = document.createElement('div');
start.classList.add('start');
const startH2 = document.createElement('h2');
startH2.textContent = 'Mission: Mars';
start.appendChild(startH2);
const startH3 = document.createElement('h3');
startH3.textContent = 'Can you command a rocket to Mars?';
start.appendChild(startH3);

const startBtn = document.createElement('button');
startBtn.textContent = 'Start';
startBtn.addEventListener('click', () => {
  gamePlay.removeChild(start);
  playerStart();
});
start.appendChild(startBtn);

const helpBtn = document.createElement('button');
helpBtn.textContent = 'Help';
helpBtn.addEventListener('click', () => {
  gamePlay.removeChild(start);
  gamePlay.appendChild(help);
});
start.appendChild(helpBtn);


// Help screen.
const help = document.createElement('div');
help.classList.add('help');
const helpH2 = document.createElement('h2');
helpH2.textContent = 'Mission: Mars';
help.appendChild(helpH2);
const helpH3 = document.createElement('h3');
helpH3.textContent = 'How To Play The Game';
help.appendChild(helpH3);
const gameInstructions = document.createElement('p');
gameInstructions.textContent =
  "You've been selected to be the captain of the first manned space mission to Mars! As the captain of the mission you will need to help the crew answer questions that will help power the ship and make sure you make it to mars in one piece.";
help.appendChild(gameInstructions);
const backBtn = document.createElement('button');
backBtn.textContent = 'Close';
backBtn.addEventListener('click', () => {
  gamePlay.removeChild(help);
  gamePlay.appendChild(start);
});
help.appendChild(backBtn);

export { start }