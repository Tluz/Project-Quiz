const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');

}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(0);
    headerScore();
}

const nextBtn = document.querySelector('.next-btn');

let questionCount = 0;
let questionsTotalNumber = questions.length;
let userScore = 0;

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1){
    questionCount++;
    showQuestions(questionCount);
    questionCounter(questionCount);
    nextBtn.classList.remove('active');
    } else {
        console.log("opa");
    }
}
// getting questions and options from array
const questionOption =  document.querySelector('.option-list');

function showQuestions(index){
    const questionText = document.querySelector('.question-text');
    

    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;
    questionOption.replaceChildren();

    for (option in questions[index].options){
        const newDiv = document.createElement("div");
        const newSpan = document.createElement("span");

        newSpan.textContent = `${questions[index].options[option]}`;
        newDiv.className = "option";
        newDiv.setAttribute('onClick', 'optionSelected(this)');

        newDiv.appendChild(newSpan);
        questionOption.appendChild(newDiv);
    }
}

function questionCounter(index){
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index+1} of ${questionsTotalNumber} questions`;
}

function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = questionOption.children.length;


    //answer.classList.add(userAnswer==correctAnswer?"correct":"incorrect");
    if (userAnswer == correctAnswer){
        answer.classList.add('correct')
        userScore +=1;
        headerScore();
    } else {
        answer.classList.add('incorrect')
        for (let i=0; i < allOptions; i++){
            if (questionOption.children[i].textContent == correctAnswer){
                questionOption.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    // if user has selected disable all options
    for (let i=0; i < allOptions; i++){
        questionOption.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');

}

function headerScore(){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `${userScore} / ${questionsTotalNumber}`;
}