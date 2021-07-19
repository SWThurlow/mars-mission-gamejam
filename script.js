// Import questions array.
import { questions } from './questions.js';

// Retrieving DOM elements.
const gameArea = document.querySelector('.gameArea');

// To keep track of asked questions. 
//In global scope to make it easier to use throughout game.
const qsAsked = [];

// Picking and displaying a random question.
//Done as an IFFE as most of these fuunctions are just called by each other.
const questioning = (() => {
  //Picking a random question and checking it hasn't already been picked.
  function pickQ() {
  let selected = questions[Math.floor(Math.random() * questions.length)];
  if (qsAsked.indexOf(selected) !== -1) {
  selected = pickQ();
  } else {
  qsAsked.push(selected);
  }
  return selected;
  }
  
  //Elements used to display question.
  const qInfo = document.createElement('p');
  const asking = document.createElement('p');
  
  //Functions for displaying different types of questions.
  function displayInputQ(question) {
    qInfo.textContent = question.info;
    gameArea.appendChild(qInfo);
    
    asking.textContent = question.question;
    gameArea.appendChild(asking);
    
    const answerInput = document.createElement('input');
    answerInput.classList.add('answer');
    gameArea.appendChild(answerInput);

    const answerBtn = document.createElement('button');
    answerBtn.textContent = 'Answer';
    answerBtn.addEventListener('click', () => {
      marking(question, answerInput.value);
    });
    gameArea.appendChild(answerBtn);
  }
  
  function displayMultipleQ(question) {
    qInfo.textContent = question.info;
    gameArea.appendChild(qInfo);
    
    asking.textContent = question.question;
    gameArea.appendChild(asking);
    
    question.choices.forEach(answer => {
      const answerBtn = document.createElement('button');
      answerBtn.textContent = answer;
      answerBtn.addEventListener('click', () => {
        marking(question, answer);
      });
      gameArea.appendChild(answerBtn);
    });
  }

  function displayYesNoQ(question) {
    qInfo.textContent = question.info;
    gameArea.appendChild(qInfo);

    asking.textContent = question.question;
    gameArea.appendChild(asking);

    const yes = document.createElement('button');
    yes.textContent = 'Yes';
    yes.addEventListener('click', () => {
      marking(question, 'Yes');
    });
    gameArea.appendChild(yes);

    const no = document.createElement('button');
    no.textContent = 'No';
    no.addEventListener('click', () => {
      marking(question, 'No');
    });
    gameArea.appendChild(no);
  }

  //Switch statment to select the right function to display the question.
  //Is wrapped in a statement to call pickQ() as a default argument and mean it can be called in the global scope (in the game function).
  function displayQ(question = pickQ()) { 
    switch (question.questionType) {
      case 'input':
        displayInputQ(question);
        break;
      case 'multiple':
        displayMultipleQ(question);
        break;
      case 'yes/no':
        displayYesNoQ(question);
        break;
    }
  }

  // Checking answers.
  function marking(question, answer) {
    const expected = question.expectedAnswer;
    if (answer === expected) {
      wellDone();
    } else {
      keepTrying(question);
    }
  }

  // If answer is correct.
  function wellDone() {
    [...gameArea.childNodes].forEach(child => gameArea.removeChild(child));
    const wellDoneMsg = document.createElement('p');
    wellDoneMsg.textContent = "That's Correct! Well Done!";
    gameArea.appendChild(wellDoneMsg);
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Onwards!'
    nextBtn.setAttribute('data-correct', 'true');
    nextBtn.addEventListener('click', (e) => {
      winLose.winLose(e.target);
    });
    gameArea.appendChild(nextBtn);
  }

  // If answer is wrong.
  function keepTrying(question) {
    [...gameArea.childNodes].forEach(child => gameArea.removeChild(child));
    const keepTrying = document.createElement('p');
    keepTrying.textContent =
    "Unfortunately that's not right. Hopefully this explanation can help you understand more.";
    gameArea.appendChild(keepTrying);
    const explanation = document.createElement('p');
    explanation.textContent = question.explanation;
    gameArea.appendChild(explanation);
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Onwards!'
    nextBtn.setAttribute('data-correct', 'false');
    nextBtn.addEventListener('click', (e) => {
      winLose.winLose(e.target);
    });
    gameArea.appendChild(nextBtn);
  }
  return {displayQ}
})();

//Counting up correct/wrong answers wo check for win/loss conditions.
const winLose = (() => {
  let right = 0;
  let wrong = 0;

  function win() {
    const winMsg = document.createElement('p');
    winMsg.textContent = 'Congratulations! You made it to Mars!'
    gameArea.appendChild(winMsg);
  }

  function loss() {
    const loseMsg = document.createElement('p');
    loseMsg.textContent = "Ohh NO! We've ran out of fuel! ";
    gameArea.appendChild(loseMsg);
  }

  function winLose(target){
    if(target.dataset.correct === 'true'){
      right++;
      [...gameArea.childNodes].forEach(child => gameArea.removeChild(child));
      if(right === 2) {
        win();
      } else {
        questioning.displayQ()
      }
    } else {
      wrong++;
      [...gameArea.childNodes].forEach(child => gameArea.removeChild(child));
      if(wrong === 2) {
        loss();
      } else {
        questioning.displayQ()
      }
    }
  }

  return {winLose}
})();

//Getting player and ship name before starting game.
function playerStart() {
  const getName = document.createElement('input');
}

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
  gameArea.removeChild(start);
  playerStart();
});
start.appendChild(startBtn);

const helpBtn = document.createElement('button');
helpBtn.textContent = 'Help';helpBtn.addEventListener('click', () => {
  gameArea.removeChild(start);
  gameArea.appendChild(help);
});
start.appendChild(helpBtn);

//For on page load.
gameArea.appendChild(start);

//Help screen.
const help = document.createElement('div');
help.classList.add('help');
const helpH2 = document.createElement('h2');
helpH2.textContent = 'Mission: Mars';
help.appendChild(helpH2);
const helpH3 = document.createElement('h3');
helpH3.textContent = 'How To Play The Game';
help.appendChild(helpH3);
const gameInstructions = document.createElement('p');
gameInstructions.textContent = "You've been selected to be the captain of the first manned space mission to Mars! As the captain of the mission you will need to help the crew answer questions that will help power the ship and make sure you make it to mars in one piece."
help.appendChild(gameInstructions);
const backBtn = document.createElement('button');
backBtn.textContent = 'Close';
backBtn.addEventListener('click', () => {
  gameArea.removeChild(help);
  gameArea.appendChild(start);
})
help.appendChild(backBtn);
