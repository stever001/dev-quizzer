document.addEventListener('DOMContentLoaded', function () {
    const questions = [
        {
            question: "What does HTML stand for?",
            options: ["Hyper Text Markup Language", "Hyper Transfer Markup Language", "Home Tool Markup Language", "Hyperion Text Markdown Language"], 
            correctAnswer: "Hyper Text Markup Language"
        },
        {
            question: "Which of the following is a programming language?",
            options: ["HTML", "CSS", "JavaScript","JSON"],
            correctAnswer: "JavaScript"
        },
        {
            question: "In CSS, what prefix identifies a 'class?'",
            options: ["/*", "#", ".", "!"],
            correctAnswer: "."
        },
        {
            question: "What does the HTML tag <em> represent?",
            options: ["External link", "Emphasized text", "Embedded image", "End of document"],
            correctAnswer: "Emphasized text"
        },
        {
            question: "Which of the following keywords is used to define a variable in JavaScript?",
            options: ["var", "let", "Both A and B", "None of the above"],
            correctAnswer: "Both A and B"
        },
        // Add more questions as needed
    ];
    let currentQuestionIndex = 0;
    let time = 60;
    let timerInterval;
    let correctAnswers = 0;
    const questionTextElement = document.getElementById("question-text");
    const answersContainer = document.getElementById("answers-container");
    const feedbackContainer = document.getElementById("feedback-container");
    const timerElement = document.getElementById('time');
    const scoreElement = document.getElementById("score");
    const startButton = document.getElementById("start-btn");
    const saveScoreButton = document.getElementById("save-score-btn");
    const restartButton = document.getElementById("restart-btn");
    const initialsInput = document.getElementById('initials');
    startButton.addEventListener('click', startQuiz);
    saveScoreButton.addEventListener('click', saveScore);
    restartButton.addEventListener('click', restartQuiz);
    function startQuiz() {
        startButton.style.display = 'none';
        timerInterval = setInterval(updateTimer, 1000);
        showQuestion(questions[currentQuestionIndex]);
    }
    function showQuestion(question) {
        questionTextElement.textContent = question.question;
        answersContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.classList.add('answer-btn');
            button.textContent = option;
            button.onclick = () => checkAnswer(index);
            answersContainer.appendChild(button);
        });
    }
    function checkAnswer(answerIndex) {
        const currentQuestion = questions[currentQuestionIndex];
        if (answerIndex === currentQuestion.options.indexOf(currentQuestion.correctAnswer)) {
            feedbackContainer.textContent = 'Correct!';
            correctAnswers++;
        } else {
            feedbackContainer.textContent = 'Incorrect!';
            time -= 10;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
        } else {
            gameOver();
        }
    }
    function updateTimer() {
        timerElement.textContent = time;
        if (time <= 0) {
            gameOver();
        } else {
            time--;
        }
    }
    function gameOver() {
        clearInterval(timerInterval);
        document.getElementById('game-over-container').style.display = 'block';
        scoreElement.textContent = `Your Score: ${(correctAnswers / questions.length * 100).toFixed(2)}%`;
      
        // Remove existing restart button if it exists
        const existingRestartQuizButton = document.getElementById("restartQuizButton");
        if (existingRestartQuizButton !== null) {
          existingRestartQuizButton.parentNode.removeChild(existingRestartQuizButton);
        }
      
        // Add Restart Quiz button under the score
        const restartQuizButton = document.createElement('button');
        restartQuizButton.textContent = 'Restart Quiz';
        restartQuizButton.id = 'restartQuizButton'; // Add an id to the button for easy identification
        restartQuizButton.addEventListener('click', restartQuiz);
        document.getElementById('game-over-container').appendChild(restartQuizButton);
      }
    function saveScore() {
        const initials = initialsInput.value.toUpperCase();
        alert(`Score saved for ${initials}. Your score: ${(correctAnswers / questions.length * 100).toFixed(2)}%`);
    }

    function restartQuiz() {
        console.log('Restarting quiz...');
        currentQuestionIndex = 0;
        time = 60;
        correctAnswers = 0;
        clearInterval(timerInterval);
        // Reset the UI elements
        startButton.style.display = 'block';
        document.getElementById('game-over-container').style.display = 'none';
        initialsInput.value = '';
        feedbackContainer.textContent = '';
        timerElement.textContent = time;
        scoreElement.textContent = ''; // Reset the score display
        // Remove the existing Restart Quiz button
        const existingRestartQuizButton = document.getElementById("restart-btn");
        if (existingRestartQuizButton !== null) {
            existingRestartQuizButton.parentNode.removeChild(existingRestartQuizButton);
        }
    
        // Log the values of relevant variables
        console.log('currentQuestionIndex:', currentQuestionIndex);
        console.log('time:', time);
        // Restart the quiz
        startQuiz();
    
    
    

}})