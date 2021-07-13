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
  const qInfo = document.createElement('p');
  const asking = document.createElement('p');
  function displayInputQ() {
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

  function displayMultipleQ() {
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

  function displayYesNoQ() {
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


/*Start screen*/

const startScreen = document.querySelector('.startScreen');
const startBtn = document.getElementById('start-btn');
/*const modalHelpOuter = document.querySelector('.modal-help-outer');
const helpBtn = document.getElementById('help-btn');
const helpCloseBtn = document.getElementById('help-close-btn');*/

startBtn.addEventListener('click', () => {
  displayQ(pickQ());
});
/*
helpBtn.addEventListener('click', () => modalHelpOuter.classList.add('open'));

helpCloseBtn.addEventListener('click', () =>
  modalHelpOuter.classList.remove('open')
);
*/