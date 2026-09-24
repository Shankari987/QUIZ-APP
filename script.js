// Main variables to track quiz progress
let currentQuestion = 0;
let score = 0;
 
// Get all the screens
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
 
// Get elements inside the quiz screen
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
 
// Get elements inside the result screen
const scoreText = document.getElementById("score-text");
 
// Buttons
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
 
// Click events
startBtn.onclick = startQuiz;
nextBtn.onclick = nextQuestion;
restartBtn.onclick = restartQuiz;
 
 
function startQuiz() {
    currentQuestion = 0;
    score = 0;
 
    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
 
    loadQuestion();
}
 
function loadQuestion() {
    // Hide the Next button until an answer is selected
    nextBtn.classList.add("hidden");
 
    // Get the current question object
    let question = questions[currentQuestion];
 
    // Show question number and question text
    questionNumber.textContent = "Question " + (currentQuestion + 1) + " of " + questions.length;
    questionText.textContent = question.question;
 
    // Clear old options
    optionsContainer.innerHTML = "";
 
    // Create a button for each option
    question.options.forEach(function (option, index) {
        let button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
 
        button.onclick = function () {
            checkAnswer(index, button);
        };
 
        optionsContainer.appendChild(button);
    });
}
 
function checkAnswer(selectedIndex, selectedButton) {
    let question = questions[currentQuestion];
    let allButtons = optionsContainer.getElementsByTagName("button");
 
    // Disable all option buttons after one is clicked
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].disabled = true;
    }
 
    if (selectedIndex === question.answer) {
        // Correct answer
        selectedButton.classList.add("correct");
        score++;
    } else {
        // Wrong answer
        selectedButton.classList.add("wrong");
        // Highlight the correct answer too
        allButtons[question.answer].classList.add("correct");
    }
 
    // Show the Next button
    nextBtn.classList.remove("hidden");
}
 
function nextQuestion() {
    currentQuestion++;
 
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}
 
function showResult() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
 
    scoreText.textContent = "Your Score: " + score + " / " + questions.length;
}
 
function restartQuiz() {
    startQuiz();
}
