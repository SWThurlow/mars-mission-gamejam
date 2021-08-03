// Import questions array.
import { questions } from './questions.js';
// Import win lose logic.
import { winLose } from './winLose.js';
// Importing all the fuel controls and elements.
import { fuelControl } from './fuel.js';

// Retrieving DOM elements.
const gamePlay = document.querySelector('.game-play');

// Global variables
const qsAsked = [];
const questionsBox = document.createElement('div');

// Picking and displaying a random question.
// Done as an IFFE as most of these fuunctions are just called by each other.
const questioning = (() => {
  // Picking a random question and checking it hasn't already been picked.
  function pickQ() {
    let selected = questions[Math.floor(Math.random() * questions.length)];
    if (qsAsked.indexOf(selected) !== -1) {
      selected = pickQ();
    } else {
      qsAsked.push(selected);
    }
    return selected;
  }

  // Variables for displaying questions needed in multiple functions.
  questionsBox.classList.add('questionBox');
  const questionAndDetails = document.createElement('details');
  questionAndDetails.classList.add('questionContainer');
  const qInfo = document.createElement('p');
  qInfo.classList.add('qInfo');
  const questionText = document.createElement('summary');
  questionText.classList.add('questionText');

  function displayInputQ(question) {
    const answerInput = document.createElement('input');
    const answerBtn = document.createElement('button');

    qInfo.textContent = question.info;
    questionText.textContent = question.question;

    questionAndDetails.appendChild(questionText);
    questionAndDetails.appendChild(qInfo);

    answerInput.classList.add('answer');
    answerBtn.classList.add('submitAnswerBtn');
    answerBtn.textContent = 'Answer';

    answerBtn.addEventListener('click', () => {
      if(answerInput.value === "") {
        return;
      } else {
        [...questionsBox.childNodes].forEach(child =>
          questionsBox.removeChild(child)
        );
        marking(question, answerInput.value);
      }
    });

    //Listening for the enter key so that answer can be given without the mouse.
    window.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){
        if(answerInput.value === "") {
          return;
        } else {
          [...questionsBox.childNodes].forEach(child => questionsBox.removeChild(child));
        marking(question, answerInput.value);
        }
      }
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
      answerBtn.classList.add('answerBtn');
      answerBtnContainer.classList.add('answerBtnContainer');

      answerBtn.textContent = answer;
      answerBtn.addEventListener('click', () => {
        [...questionsBox.childNodes].forEach(child =>
          questionsBox.removeChild(child)
        );
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
    yes.classList.add('answerBtn');
    no.classList.add('answerBtn');

    yes.textContent = 'Yes';
    no.textContent = 'No';
    yes.addEventListener('click', () => {
      [...questionsBox.childNodes].forEach(child =>
        questionsBox.removeChild(child)
      );
      marking(question, 'Yes');
    });

    no.addEventListener('click', () => {
      [...questionsBox.childNodes].forEach(child =>
        questionsBox.removeChild(child)
      );
      marking(question, 'No');
    });

    questionsBox.appendChild(yes);
    questionsBox.appendChild(no);
  }

  // Switch statment to select the right function to display the question.
  // Is wrapped in a statement to call pickQ() as a default argument 
  // and mean it can be called in the global scope (in the game function).
  function displayQ(question = pickQ()) {
    gamePlay.appendChild(questionsBox);
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
      default:
        alert('You hit the switch statement default case!');
        break;
    }
  }

  // Checking answers.
  function marking(question, answer) {
    const expected = question.expectedAnswer;
    if (answer === expected) {
      wellDone();
      fuelControl.fuelDecCorrect();
    } else {
      keepTrying(question);
      fuelControl.fuelDecIncorrect();
    }
  }

  // If answer is correct.
  function wellDone() {
    const wellDoneMsg = document.createElement('p');
    wellDoneMsg.textContent = "That's Correct! Well Done!";
    questionsBox.appendChild(wellDoneMsg);
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Onwards!';
    nextBtn.setAttribute('data-correct', 'true');
    nextBtn.addEventListener('click', e => {
      [...questionsBox.childNodes].forEach(child => questionsBox.removeChild(child));
      winLose.winLose(e.target);
    });
    questionsBox.appendChild(nextBtn);
  }

  // If answer is wrong.
  function keepTrying(question) {
    const keepTrying = document.createElement('p');
    keepTrying.textContent =
      "Unfortunately that's not right. Hopefully this explanation can help you understand more.";
      questionsBox.appendChild(keepTrying);
    const explanation = document.createElement('p');
    explanation.textContent = question.explanation;
    questionsBox.appendChild(explanation);
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Onwards!';
    nextBtn.setAttribute('data-correct', 'false');
    nextBtn.addEventListener('click', e => {
      [...questionsBox.childNodes].forEach(child => questionsBox.removeChild(child));
      winLose.winLose(e.target);
    });
    questionsBox.appendChild(nextBtn);
  }
  return { displayQ };
})();

export { questioning, questionsBox, qsAsked }