// Import questions array.
import { questions } from './questions.js';

// Retrieving DOM elements.
const gameArea = document.querySelector('.gameArea');
const qBox = document.querySelector('.questionBox');

// To keep track of asked questions.
const qsAsked = [];

// Picking and displaying a random question.
function pickQ() {
  let selected = questions[Math.floor(Math.random() * questions.length)];
  if (qsAsked.indexOf(selected) !== -1) {
    selected = pickQ();
  } else {
    qsAsked.push(selected);
  }
  return selected;
}

function displayQ(question) {
  const questionAndDetails = document.createElement("details");
  const qInfo = document.createElement('p');
  const questionText = document.createElement('summary'); 

  qInfo.classList.add("qInfo");
  questionText.classList.add("questionText");
  questionAndDetails.classList.add("questionContainer");

  function displayInputQ() {
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
      marking(question, answerInput.value);
    });    

    qBox.appendChild(questionAndDetails);
    qBox.appendChild(answerInput);    
    qBox.appendChild(answerBtn);
  }

  function displayMultipleQ() {      
    const answerBtnContainer = document.createElement('div');

    qInfo.textContent = question.info;
    questionText.textContent = question.question;

    questionAndDetails.appendChild(questionText);
    questionAndDetails.appendChild(qInfo); 

    qBox.appendChild(questionAndDetails);

    question.choices.forEach(answer => {
      const answerBtn = document.createElement('button');
      answerBtn.classList.add("answerBtn");
      answerBtnContainer.classList.add("answerBtnContainer");

      answerBtn.textContent = answer;
      answerBtn.addEventListener('click', () => {
        marking(question, answer);
      });
      answerBtnContainer.appendChild(answerBtn);
    });

    qBox.appendChild(answerBtnContainer);

  }

  function displayYesNoQ() {
    qInfo.textContent = question.info;
    questionText.textContent = question.question;

    questionAndDetails.appendChild(qInfo);
    questionAndDetails.appendChild(questionText);
    qBox.appendChild(questionAndDetails);

    const yes = document.createElement('button');
    const no = document.createElement('button');
    yes.classList.add("answerBtn");
    no.classList.add("answerBtn");

    yes.textContent = 'Yes';
    no.textContent = 'No';
    yes.addEventListener('click', () => {
      marking(question, 'Yes');
    });
    
    no.addEventListener('click', () => {
      marking(question, 'No');
    });

    qBox.appendChild(yes);
    qBox.appendChild(no);
  }

  switch (question.questionType) {
    case 'input':
      return displayInputQ();
    case 'multiple':
      return displayMultipleQ();
    case 'yes/no':
      return displayYesNoQ();
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
}

displayQ(pickQ());

/* =================================
   =  HANDLE START MODAL           =
   ================================= */

const modalStartOuter = document.querySelector('.modal-start-outer');
const startBtn = document.querySelector('#start-btn');
const modalHelpOuter = document.querySelector('.modal-help-outer');
const helpBtn = document.querySelector('#help-btn');
const helpCloseBtn = document.querySelector('#help-close-btn');

modalStartOuter.classList.add('open');

startBtn.addEventListener('click', () =>
  modalStartOuter.classList.remove('open')
);

helpBtn.addEventListener('click', () => modalHelpOuter.classList.add('open'));

helpCloseBtn.addEventListener('click', () =>
  modalHelpOuter.classList.remove('open')
);
