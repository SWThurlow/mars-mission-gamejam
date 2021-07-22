// Importing all the fuel controls and elements.
import { fuelTank, fuelControl } from './fuel.js';
// Import question display. 
import { questioning, questionsBox } from './qPicker.js';

// Retrieving DOM elements.
const gameArea = document.querySelector('.gameArea');

// Counting up correct/wrong answers wo check for win/loss conditions.
const winLose = (() => {
    let right = 0;
  
    function win() {
      const winMsg = document.createElement('p');
      winMsg.textContent = 'Congratulations! You made it to Mars!';
      gameArea.appendChild(winMsg);
    }
  
    function lose() {
      const loseMsg = document.createElement('p');
      loseMsg.textContent = "Ohh NO! We've ran out of fuel! ";
      gameArea.appendChild(loseMsg);
    }
  
    function winLose(target) {
      if (target.dataset.correct === 'true') {
        right++;
        [...gameArea.childNodes].forEach(child => gameArea.removeChild(child));
        if (right === 6) {
          win();
        } else {
          questioning.displayQ();
        }
      } else {
        [...gameArea.childNodes].forEach(child => gameArea.removeChild(child));
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