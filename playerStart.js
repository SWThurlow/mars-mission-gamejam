//Importing the fuel tank so that it can be attached to the game area.
import { fuelTank } from './fuel.js';
// Import question display. 
import { questioning } from './qPicker.js';

// Retrieving DOM elements.
const gameArea = document.querySelector('.gameArea');
const gamePlay = document.querySelector('.game-play');
const fuelDisplay = document.querySelector('.fuel-display');

// Declaring global variables here so they can be exported and 
//used once playerStart has set values to them.
let playerName;
let shipName;

// Getting player and ship name before starting game.
function playerStart() {
    const launch = document.createElement('div');
    launch.classList.add('launch');
  
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Captain! What should we call you?';
    nameLabel.setAttribute('for', 'getName');
    launch.appendChild(nameLabel);
    const getName = document.createElement('input');
    getName.setAttribute('name', 'getName');
    launch.appendChild(getName);
  
    const shipLabel = document.createElement('label');
    shipLabel.textContent = 'What shall we call our ship Captain?'
    shipLabel.setAttribute('for', 'shipName');
    launch.appendChild(shipLabel);
    const getShip = document.createElement('input');
    getShip.setAttribute('name', 'shipName');
    launch.appendChild(getShip);
  
    const launchBtn = document.createElement('button');
    launchBtn.textContent = 'Launch';
    launch.appendChild(launchBtn);

    launchBtn.setAttribute('disabled', '');
    document.addEventListener('input', function(event) {
      const nameTest = getName.value.length;
      const shipTest = getShip.value.length;
      if (nameTest >= 2 && shipTest >= 2) {
        launchBtn.removeAttribute('disabled');
        } else {
          launchBtn.setAttribute('disabled', '');
        }
     })
  
    const rocket = new Image(50, 50);
    rocket.src = 'img/rocket.svg';
    launch.appendChild(rocket);
  
    const earth = new Image(100, 100);
    earth.src = 'img/earth.svg';
    launch.appendChild(earth);
  
    launchBtn.addEventListener('click', () => {
      playerName = getName.value;
      shipName = getShip.value;
      launch.removeChild(nameLabel);
      launch.removeChild(getName);
      launch.removeChild(shipLabel);
      launch.removeChild(getShip);
      launch.removeChild(launchBtn);
      rocket.classList.add('takeOff');

      let rocketLaunch = new Audio('./audio/SFB-rocket.mp3');
      rocketLaunch.play();

      setTimeout(() => {
        gamePlay.removeChild(launch);
        gameArea.style.cssText = 'grid-template-columns: 10% 90%;';
        fuelDisplay.appendChild(fuelTank);
        questioning.displayQ();
      }, 3000);
    });
  
    gamePlay.appendChild(launch);
}

export { playerStart, playerName, shipName }