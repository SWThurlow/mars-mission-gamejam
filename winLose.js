// Importing all the fuel controls and elements.
import { fuelTank, fuelControl } from './fuel.js';
// Import question display. 
import { questioning } from './qPicker.js';

// Retrieving DOM elements.
const gameArea = document.querySelector('.gameArea');
const gamePlay = document.querySelector('.game-play');
const fuelDisplay = document.querySelector('.fuel-display');

// Counting up correct/wrong answers wo check for win/loss conditions.
const winLose = (() => {
    let right = 0;
  
    function win() {
      fuelDisplay.removeChild(fuelTank);
      gameArea.style.cssText = 'grid-template-columns: 0% 100%;';
      const winMsg = document.createElement('p');
      winMsg.classList.add("endMsg");
      winMsg.textContent = 'Congratulations! You made it to Mars!';
      gamePlay.appendChild(winMsg);
    }
  
    function lose() {
      fuelDisplay.removeChild(fuelTank);
      gameArea.style.cssText = 'grid-template-columns: 0% 100%;';
      const loseMsg = document.createElement('p'); 
      loseMsg.classList.add("endMsg");
      loseMsg.textContent = "Ohh NO! We've ran out of fuel! ";
      gamePlay.appendChild(loseMsg); 
    }
  
    function winLose(target) {
      if (target.dataset.correct === 'true') {
        right++;
        [...gamePlay.childNodes].forEach(child => gamePlay.removeChild(child));
        if (right === 6) {
          win();
        } else {
          questioning.displayQ();
        }
      } else {
        [...gamePlay.childNodes].forEach(child => gamePlay.removeChild(child));
        if (fuelControl.checkFuelEmpty()) {
          lose();
        } else {
          questioning.displayQ();
        }
      }
    }
  
    return { winLose };
})();

export { winLose }