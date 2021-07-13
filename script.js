// Import questions array.
import { questions } from './questions.js';

// Retrieving DOM elements.
const gameArea = document.querySelector('.gameArea');
const qBox = document.querySelector('.questionBox');

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
    qBox.appendChild(qInfo);
    
    asking.textContent = question.question;
    qBox.appendChild(asking);
    
    const answerInput = document.createElement('input');
    answerInput.classList.add('answer');
    qBox.appendChild(answerInput);

    const answerBtn = document.createElement('button');
    answerBtn.textContent = 'Answer';
    answerBtn.addEventListener('click', () => {
      marking(question, answerInput.value);
    });
    qBox.appendChild(answerBtn);
  }
  
  function displayMultipleQ(question) {
    qInfo.textContent = question.info;
    qBox.appendChild(qInfo);
    
    asking.textContent = question.question;
    qBox.appendChild(asking);
    
    question.choices.forEach(answer => {
      const answerBtn = document.createElement('button');
      answerBtn.textContent = answer;
      answerBtn.addEventListener('click', () => {
        marking(question, answer);
      });
      qBox.appendChild(answerBtn);
    });
  }

  function displayYesNoQ(question) {
    qInfo.textContent = question.info;
    qBox.appendChild(qInfo);

    asking.textContent = question.question;
    qBox.appendChild(asking);

    const yes = document.createElement('button');
    yes.textContent = 'Yes';
    yes.addEventListener('click', () => {
      marking(question, 'Yes');
    });
    qBox.appendChild(yes);

    const no = document.createElement('button');
    no.textContent = 'No';
    no.addEventListener('click', () => {
      marking(question, 'No');
    });
    qBox.appendChild(no);
  }

  //Switch statment to select the right function to display the question.
  //Is wrapped in a statement to call pickQ() as a default argument and mean it can be called in the global scope (in the game function).
  function displayQ(question = pickQ()) { 
    switch (question.questionType) {
      case 'input':
      return displayInputQ(question);
      case 'multiple':
      return displayMultipleQ(question);
      case 'yes/no':
      return displayYesNoQ(question);
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
    const wellDoneMsg = document.createElement('p');
    wellDoneMsg.textContent = "That's Correct! Well Done!";
    qBox.appendChild(wellDoneMsg);
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Onwards!'
    qBox.appendChild(nextBtn);
  }

  // If answer is wrong.
  function keepTrying(question) {
    const keepTrying = document.createElement('p');
    keepTrying.textContent =
    "Unfortunately that's not right. Hopefully this explanation can help you understand more.";
    qBox.appendChild(keepTrying);
    const explanation = document.createElement('p');
    explanation.textContent = question.explanation;
    qBox.appendChild(explanation);
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Onwards!'
    qBox.appendChild(nextBtn);
  }
  return {displayQ}
})();

/*Start screen*/
const startScreen = document.querySelector('.startScreen');
const startBtn = document.getElementById('start-btn');
/*const modalHelpOuter = document.querySelector('.modal-help-outer');
const helpBtn = document.getElementById('help-btn');
const helpCloseBtn = document.getElementById('help-close-btn');*/

startBtn.addEventListener('click', () => {
  gameArea.removeChild(startScreen);
  questioning.displayQ();
});
/*
helpBtn.addEventListener('click', () => modalHelpOuter.classList.add('open'));

helpCloseBtn.addEventListener('click', () =>
modalHelpOuter.classList.remove('open')
);
*/