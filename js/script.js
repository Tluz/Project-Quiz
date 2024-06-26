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

tryAgainBtn.onclick = () => {
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    quizBox.classList.add('active');

    questionCount = 0;
    questionsTotalNumber = questions.length;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionCount);

    headerScore();
}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');

    questionCount = 0;
    questionsTotalNumber = questions.length;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionCount);

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
        showResulBox();
    }
}
// getting questions and options from array
const questionOption =  document.querySelector('.option-list');

function showQuestions(index){
    const questionText = document.querySelector('.question-text');
    

    questionText.textContent = `${index+1}. ${questions[index].question}`;
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
    questionTotal.textContent = `${index+1} de ${questionsTotalNumber} perguntas`;
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

function showResulBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Você acertou ${userScore} de ${questionsTotalNumber} questões`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    
    let progressStartValue = -1;
    let progressEndValue = Math.round((userScore/questionsTotalNumber)*100);
    let speed = 20

    const resultEvaluation = document.querySelector('.result-evaluation');
    
    switch (true) {
        case (progressEndValue == 100):
            resultEvaluation.textContent = 'Uau! Você acertou todas as questões do quiz. Parece até que está dentro do relacionamento!';
            break;
        case (progressEndValue > 90):
            resultEvaluation.textContent = 'Parabéns! Você realmente é um especialista no relacionamento dos dois pombinhos. Impressionante!';
            break;
        case (progressEndValue >= 80):
            resultEvaluation.textContent = 'Parabéns! Você passo no teste do quiz e mostrou que conhece o casal. Sinta-se orgulhoso!';
            break;
        case (progressEndValue > 50):
            resultEvaluation.textContent = 'Você acertou mais da metade das questões. Está no caminho para se tornar um verdadeiro fã do casal.';
            break;
        case (progressEndValue > 0):
            resultEvaluation.textContent = 'É... O importante é participar né. A menos que você seja a Luiza, aí sinta-se decepcionada.';
            break;
        case (progressEndValue == 0):
            resultEvaluation.textContent = 'Zero? Sério mesmo?';
            break;
    }

    let progress = setInterval(()=>{
        progressStartValue++;

        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue*3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

        if (progressStartValue == progressEndValue){
            clearInterval(progress)
        }
    }, speed)

}