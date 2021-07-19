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

  //Variables for displaying questions needed in multiple functions.
  const questionsBox = document.createElement('div');
  questionsBox.classList.add('questionBox');
  const questionAndDetails = document.createElement("details");
  questionAndDetails.classList.add("questionContainer");
  const qInfo = document.createElement('p');
  qInfo.classList.add("qInfo");
  const questionText = document.createElement('summary'); 
  questionText.classList.add("questionText");
    

  function displayInputQ(question) {
    const answerInput = document.createElement('input'); 
    const answerBtn = document.createElement('button');

    qInfo.textContent = question.info;
    questionText.textContent = question.question;

    questionAndDetails.appendChild(questionText);
    questionAndDetails.appendChild(qInfo);    

    answerInput.classList.add('answer');
    answerBtn.classList.add("submitAnswerBtn");
    answerBtn.textContent = 'Answer';

    answerBtn.addEventListener('click', () => {
      [...questionsBox.childNodes].forEach(child => questionsBox.removeChild(child));
      marking(question, answerInput.value);
    });    

    questionsBox.appendChild(questionAndDetails);
    questionsBox.appendChild(answerInput);    
    questionsBox.appendChild(answerBtn);
  }

  function displayMultipleQ(question) {      
    const answerBtnContainer = document.createElement('div');

    qInfo.textContent = question.info;
    questionText.textContent = question.question;

    questionAndDetails.appendChild(questionText);
    questionAndDetails.appendChild(qInfo); 

    questionsBox.appendChild(questionAndDetails);

    question.choices.forEach(answer => {
      const answerBtn = document.createElement('button');
      answerBtn.classList.add("answerBtn");
      answerBtnContainer.classList.add("answerBtnContainer");

      answerBtn.textContent = answer;
      answerBtn.addEventListener('click', () => {
        [...questionsBox.childNodes].forEach(child => questionsBox.removeChild(child));
        marking(question, answer);
      });
      answerBtnContainer.appendChild(answerBtn);
    });

    questionsBox.appendChild(answerBtnContainer);

  }

  function displayYesNoQ(question) {
    qInfo.textContent = question.info;
    questionText.textContent = question.question;

    questionAndDetails.appendChild(qInfo);
    questionAndDetails.appendChild(questionText);
    questionsBox.appendChild(questionAndDetails);

    const yes = document.createElement('button');
    const no = document.createElement('button');
    yes.classList.add("answerBtn");
    no.classList.add("answerBtn");

    yes.textContent = 'Yes';
    no.textContent = 'No';
    yes.addEventListener('click', () => {
      [...questionsBox.childNodes].forEach(child => questionsBox.removeChild(child));
      marking(question, 'Yes');
    });
    
    no.addEventListener('click', () => {
      [...questionsBox.childNodes].forEach(child => questionsBox.removeChild(child));
      marking(question, 'No');
    });

    questionsBox.appendChild(yes);
    questionsBox.appendChild(no);
  }

  //Switch statment to select the right function to display the question.
  //Is wrapped in a statement to call pickQ() as a default argument and mean it can be called in the global scope (in the game function).
  function displayQ(question = pickQ()) { 
    gameArea.appendChild(questionsBox);
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
    gameArea.removeChild(questionsBox);
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
  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'Captain! What should we call you?';
  nameLabel.setAttribute('for', 'getName');
  gameArea.appendChild(nameLabel);
  const getName = document.createElement('input');
  getName.setAttribute('name', 'getName');
  gameArea.appendChild(getName);

  const shipLabel = document.createElement('label');
  shipLabel.textContent = 'What shall we call our ship Captain?'
  shipLabel.setAttribute('for', 'shipName');
  gameArea.appendChild(shipLabel);
  const shipName = document.createElement('input');
  shipName.setAttribute('name', 'shipName');
  gameArea.appendChild(shipName);

  const launchBtn = document.createElement('button');
  launchBtn.textContent = 'Launch';
  launchBtn.addEventListener('click', () => {
    animations.launch();
    [...gameArea.childNodes].forEach(child => gameArea.removeChild(child));
  });
  gameArea.appendChild(launchBtn);

  const rocket = new Image(50, 50);
  rocket.src = 'img/rocket.svg';
  gameArea.appendChild(rocket);

  const earth = new Image(100, 100);
  earth.src = 'img/earth.svg';
  gameArea.appendChild(earth);
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
});
help.appendChild(backBtn);
