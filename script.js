//Import questions array.
import {questions} from'./questions.js';

//Retrieving DOM elements.
const gameArea = document.querySelector('.gameArea');
const qBox = document.querySelector('.questionBox');

//To keep track of asked questions.
let qsAsked = [];

//Picking and displaying a random question.
function pickQ(){
    let selected = questions[Math.floor(Math.random() * questions.length)];
    if(qsAsked.indexOf(selected) !== -1){
        selected = pickQ();
    } else {
        qsAsked.push(selected);
    } 
    return selected;
}

function displayQ(question) {
    const qInfo = document.createElement('p');
    const asking = document.createElement('p');
    function  displayInputQ() {
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
            marking(question, answerInput.value)
        });
        qBox.appendChild(answerBtn);
    }

    function displayMultipleQ() {
        //function to display multiple choice questions.
    }

    function displayYesNoQ() {
        //function to display yes or no questions.
    }

    switch(question.questionType) {
        case 'input':
            return displayInputQ();
        case 'multiple':
            return displayMultipleQ();
        case 'yes/no':
            return displayYesNoQ();
    }

};

//Checking answers.
function marking(question, answer) {
    let expected = question.expectedAnswer;
    if(answer === expected) {
        wellDone();
    } else {
        keepTrying(question);
    }
}

//If answer is correct.
function wellDone() {
    const wellDoneMsg = document.createElement('p');
    wellDoneMsg.textContent = "That's Correct! Well Done!";
    qBox.appendChild(wellDoneMsg);
}

//If answer is wrong. 
function keepTrying(question) {
    const keepTrying = document.createElement('p');
    keepTrying.textContent = "Unfortunately that's not right. Hopefully this explination can help you understand more.";
    qBox.appendChild(keepTrying);
    const explination = document.createElement('p');
    explination.textContent= question.explination;
    qBox.appendChild(explination);
}

displayQ(questions[0]);