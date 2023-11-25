const questions = [
  {
    question: "How do say Excellence in Portuguese?",
    answers: [
      { text: "Excelência", correct: true },
      { text: "Excelente", correct: false },
      { text: "Diamante", correct: false },
    ],
  },

  {
    question: "How do say Excellence in Portuguese?",
    answers: [
      { text: "Excelência", correct: true },
      { text: "Excelente", correct: false },
      { text: "Diamante", correct: false },
    ],
  },

  {
    question: "How do say Excellence in Portuguese?",
    answers: [
      { text: "Excelência", correct: true },
      { text: "Excelente", correct: false },
      { text: "Diamante", correct: false },
    ],
  },
  {
    question: "How do say Excellence in Portuguese?",
    answers: [
      { text: "Excelência", correct: true },
      { text: "Excelente", correct: false },
      { text: "Diamante", correct: false },
    ],
  },
  {
    question: "How do say Excellence in Portuguese?",
    answers: [
      { text: "Excelência", correct: true },
      { text: "Excelente", correct: false },
      { text: "Diamante", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const showQuizButton = document.getElementById("showQuiz");
const quizDescription = document.getElementById("quiz-description");
const audio = document.getElementById("bgm");
audio.volume = 0.4;

let currentQuestionIndex = 0;
let score = 0;

// Hide the quiz initially
questionElement.style.display = "none";
answerButtons.style.display = "none";
nextButton.style.display = "none";

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showQuizButton.style.display = "none";
  nextButton.innerHTML = "Next Question";
  showQuestion();
  // hide the paragraph when the quiz is started
  quizDescription.style.display = "none";
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });

  // Show the quiz elements
  questionElement.style.display = "block";
  answerButtons.style.display = "block";
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();

  if (score === questions.length) {
    // Player got all questions right
    questionElement.innerHTML = `Congratulations! You scored ${score} out of ${questions.length}! You completed the quiz!`;
    nextButton.innerHTML = "Insert video here";
  } else {
    // Player didn't get all questions right
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} 😔 Retry to get all questions right! There might be a prize if you get all questions correct 🤔`;
    nextButton.innerHTML = "Retry Quiz";
  }

  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// Show the quiz when the "Start Quiz" button is clicked
showQuizButton.addEventListener("click", startQuiz);

// Continue with the next question or restart the quiz on "Next Question" click
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
