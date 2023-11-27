const questions = [
  {
    question: "How do you say Excellence in French?",
    video: "/pictures/excellence.mp4",
    sentence:
      "Nothing less than excellence is our goal in the pursuit of perfection. This value pushes us to pursue the extraordinary in all of our endeavours and to go above and beyond the ordinary.",
    answers: [
      { text: "Excellence", correct: false },
      { text: "Hiranga", correct: false },
      { text: "Excelencia", correct: true },
    ],
  },

  {
    question: "How do you say Customer Centricity in Italian?",
    video: "/pictures/centricity.mp4",
    sentence:
      "Our dedication to customer centricity is characterised by putting our clients at the centre of all we do. It's a connection based on comprehension, responsiveness, and going above and beyond expectations rather than just a service.",
    answers: [
      { text: "Vásárlóközpontú", correct: false },
      { text: "Centricidade no Cliente", correct: false },
      { text: "Centricità del Cliente", correct: true },
    ],
  },

  {
    question: "How do you say Responsibility in Maori?",
    video: "/pictures/responsability.mp4",
    sentence:
      "Our actions are founded on responsibility. To ensure a morally and sustainably sound future, we hold ourselves accountable for the choices we make and the effects they have on the society at large as well as inside our own organisation.",
    answers: [
      { text: "လိုင်းစင်", correct: true },
      { text: "Responsabilité", correct: false },
      { text: "Whakawhanake", correct: false },
    ],
  },
  {
    question: "How do you say Passion in Burmese?",
    video: "/pictures/passion.mp4",
    sentence:
      "Our enthusiasm is what propels us on this path. It's the inner fire that propels us to succeed, develop, and create. The core of our energetic and dynamic workplace is passion.",
    answers: [
      { text: "Paixão", correct: false },
      { text: "ကြောင့်", correct: true },
      { text: "Pasión", correct: false },
    ],
  },
  {
    question: "How do say Entrepreneurship in Portuguese?",
    video: "/pictures/entrepreneurship.mp4",
    sentence:
      "Embracing entrepreneurship necessitates the promotion of a creative and risk-taking culture. It's about searching for new opportunities where others see roadblocks and never giving up on changing for the better.",
    answers: [
      { text: "Vállalkozás", correct: false },
      { text: "Empreendedorismo", correct: true },
      { text: "Entrepreneuriat", correct: false },
    ],
  },
  {
    question: "How do you say One CFF in Hungarian?",
    video: "/pictures/onecff.mp4",
    sentence:
      "United under the banner of One CFF, we are committed to all these values as One.",
    answers: [
      { text: "Egy CFF", correct: true },
      { text: "Un CFF", correct: false },
      { text: "Tahi CFF", correct: false },
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

// hide the quiz on the first page
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

  // show the quiz elements
  questionElement.style.display = "block";
  answerButtons.style.display = "block";
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// ** ONCE A QUESTION IS ANSWERED WRONG, MOVE TO THE NEXT ONE WITHOUT LETTING THE PLAYER PICK ANOTHER ONE**

// function selectAnswer(e) {
//   const selectedBtn = e.target;
//   const isCorrect = selectedBtn.dataset.correct === "true";
//   if (isCorrect) {
//     selectedBtn.classList.add("correct");
//     score++;
//   } else {
//     selectedBtn.classList.add("incorrect");
//   }

//   Array.from(answerButtons.children).forEach((button) => {
//     if (button.dataset.correct === "true") {
//       button.classList.add("correct");
//     }
//     button.disabled = true;
//   });
//   nextButton.style.display = "block";
// }

// ** FUNCTION THAT ALLOWS THE PLAYER TO KEEP PLAYING UNTIL THEY GET THE RIGHT ANSWER **
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;

    // for the video
    const videoElement = document.createElement("video");
    const currentQuestion = questions[currentQuestionIndex];
    videoElement.src = currentQuestion.video;
    videoElement.controls = false;
    videoElement.style.margin = "auto"; // center the video
    videoElement.style.display = "block";
    videoElement.width = 600;
    videoElement.height = 400;
    videoElement.volume = 0; // just in case i want to add volume to the videos
    questionElement.innerHTML = " ";
    questionElement.appendChild(videoElement);

    // display sentence + the video
    const sentenceElement = document.createElement("p");
    sentenceElement.innerText = currentQuestion.sentence;

    questionElement.innerHTML = ""; // Clear the question content
    questionElement.appendChild(videoElement);
    questionElement.appendChild(sentenceElement);

    // auto-play the video
    videoElement.autoplay = true;

    // video to show the next question button after it ends
    videoElement.addEventListener("ended", showNextQuestionButton);
  } else {
    selectedBtn.classList.add("incorrect");
    selectedBtn.disabled = true; // disable only the clicked incorrect answer button
  }
}

function showNextQuestionButton() {
  this.removeEventListener("ended", showNextQuestionButton);
  nextButton.style.display = "block";
}

function handleNextQuestionAfterVideo() {
  this.removeEventListener("click", handleNextQuestionAfterVideo);

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();

  if (score === questions.length) {
    // player got all questions right
    questionElement.innerHTML = `Congratulations! You scored ${score} out of ${questions.length}! You completed the quiz!`;
    nextButton.innerHTML = "Insert video here";
  } else {
    // player didn't get all questions right
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} 😔 Retry to get all questions right! There might be a prize if you get all questions correct 🤔`;
    nextButton.innerHTML = "Retry Quiz"; // this might be useless since theres no way to fail the quiz but let's just leave it for future reference i guess
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

// show the quiz when the "Start Quiz" button is clicked
showQuizButton.addEventListener("click", startQuiz);

// Continue with the next question or restart the quiz on "Next Question" click. will remove this later
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
