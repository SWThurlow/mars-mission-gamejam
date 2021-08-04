// Importing all the fuel controls and elements.
import { fuelTank, fuelControl } from './fuel.js';
// Import question display. 
import { questioning, qsAsked } from './qPicker.js';
//Importing player and ship names.
import { shipName, playerName } from './playerStart.js';
// Import start screen.
import { start } from './startScreen.js';

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
      winMsg.setAttribute('class', 'winMsg');
      winMsg.textContent = `Congratulations, Captain ${playerName}! You managed to get the ${shipName} and its crew to Mars!`;
      gamePlay.appendChild(winMsg);

      //Mars Landing animation
      gamePlay.classList.add('landing');
      const mars = new Image(100, 100);
      mars.src =  "img/mars.svg";
      gamePlay.appendChild(mars);
      const rocket = new Image(50,50);
      rocket.src = "img/rocket.svg";
      gamePlay.appendChild(rocket);
      rocket.classList.add('rocketLanding');

      let rocketLanding = new Audio('./audio/landing-jet-dreamstime.mp3');
      rocketLanding.play();
      
      setTimeout(() => {
        const playAgain = document.createElement('button');
        playAgain.textContent = 'Play Again';
        playAgain.addEventListener('click', () => {
          [...gamePlay.childNodes].forEach(child => gamePlay.removeChild(child));
          gamePlay.appendChild(start);
          right = 0;
          qsAsked.splice(0);
        });
        gamePlay.appendChild(playAgain);
      }, 5000)
    }
    //originally 2000

  
    function lose() {
      fuelDisplay.removeChild(fuelTank);
      gameArea.style.cssText = 'grid-template-columns: 0% 100%;';
      const loseMsg = document.createElement('p');
      loseMsg.setAttribute('class', 'loseMsg');
      loseMsg.textContent = `Ohh NO! Captain ${playerName}, we've ran out of fuel! A crew from Earth should come and get the ${shipName} and its crew. Then, we will be able to try again.`;
      gamePlay.appendChild(loseMsg);

      //rocket spiralling animation
      gamePlay.classList.add('landing');
      const rocket = new Image(50,50);
      rocket.src = "img/rocket.svg";
      gamePlay.appendChild(rocket);
      rocket.classList.add('rocketSpiral');
      
      setTimeout(() => {
        const playAgain = document.createElement('button');
        playAgain.textContent = 'Play Again';
        playAgain.addEventListener('click', () => {
          [...gamePlay.childNodes].forEach(child => gamePlay.removeChild(child));
          gamePlay.appendChild(start);
          right = 0;
          qsAsked.splice(0);
        });
        gamePlay.appendChild(playAgain);
      }, 8000)
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