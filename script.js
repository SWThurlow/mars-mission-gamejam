//Retrieving DOM elements.
const gameArea = document.querySelector('.gameArea');
const qBox = document.querySelector('.questionBox');

/*Generating and displaying question - To be revisited
when we have our space questions sorted out.*/
//Generating random numbers, wont be needed for space questions.
function getNum() {
    return Math.floor(Math.random() * 10);
}

//Checking answers will need altering for space questions.
function checkAnswer(num1, num2, answer) {
    //A switch statment to check if multiple choice or input type
    //question could be good.
    if(!(Number(answer) > 0 && Number(answer) < 20)){
        return;
    } else {
        if(num1 + num2 === Number(answer)) {
            [...qBox.childNodes].forEach(child => qBox.removeChild(child));
            const congratsMsg = document.createElement('p');
            congratsMsg.innerHTML = "That's Right <br> Well Done!";
            qBox.appendChild(congratsMsg);

            setTimeout(() => {
                qBox.removeChild(congratsMsg);
                newQuestion();
            }, 2000);
        }
    }
}

//Displaying generated numbers as a question. 
//Will need changing for space questions.
function displayQ(num1, num2) {
    //Another switch statement to check question type?
    const qDisplay = document.createElement('p');
    qDisplay.textContent = `${num1} + ${num2} = `
    qBox.appendChild(qDisplay);

    const answerInput = document.createElement('input');
    qBox.appendChild(answerInput);

    const answerBtn = document.createElement('button');
    answerBtn.textContent = 'Answer';
    answerBtn.addEventListener('click', () => {
        checkAnswer(num1, num2, answerInput.value);
    });
    qBox.appendChild(answerBtn);
}

//Bringing all the other functions together. 
function newQuestion() {
    const num1 = getNum();
    const num2 = getNum();
    displayQ(num1, num2);
}

newQuestion();
/*End of section that should need revisiting once we have space questions. 
It would be better to not have it all just as functions in the long run.
I'm thinking that newQuestion should be an IFFE and that returns displayQ and
checkAnswer. That way the set timeout for the congratsMsg could be moved 
out of checkAnswer so that the game is less recursive.*/