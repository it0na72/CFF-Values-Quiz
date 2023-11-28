"use strict";
const topImages = [
  "excellence.jpg",
  "centricity.jpg",
  "responsability.jpg",
  "passion.jpg",
  "entre.jpg",
  "onecff.jpg",
];
const questions = [
  {
    question: "How do you say Excellence in French?",
    video: "pictures/excellence.mp4",
    sentence: `“An unwavering commitment to attain the highest standards”`,
    answers: [
      { text: "Excellence", correct: true },
      { text: "Hiranga", correct: false },
      { text: "Excelencia", correct: false },
    ],
  },

  {
    question: "How do you say Customer Centricity in Italian?",
    video: "pictures/centricity.mp4",
    sentence: "“The CUSTOMER at the heart of every decision we make”",
    answers: [
      { text: "Vásárlóközpontú", correct: false },
      { text: "Centricidade no Cliente", correct: false },
      { text: "Centricità del Cliente", correct: true },
    ],
  },

  {
    question: "How do you say Responsibility in Maori?",
    video: "pictures/responsability.mp4",
    sentence: "“Striving to make a difference for a better future”",
    answers: [
      { text: "လိုင်းစင်", correct: false },
      { text: "Responsabilité", correct: false },
      { text: "Whakawhanake", correct: true },
    ],
  },
  {
    question: "How do you say Passion in Burmese?",
    video: "pictures/passion.mp4",
    sentence: "“A culture dedicated to food led by experts in their field”",
    answers: [
      { text: "Paixão", correct: false },
      { text: "ကြောင့် - pronounced as 'kyaung' ", correct: true },
      { text: "Pasión", correct: false },
    ],
  },
  {
    question: "How do say Entrepreneurship in Portuguese?",
    video: "pictures/entrepreneurship.mp4",
    sentence: "“Guided by curiosity and thriving for continuous innovation”",
    answers: [
      { text: "Vállalkozás", correct: false },
      { text: "Empreendedorismo", correct: true },
      { text: "Entrepreneuriat", correct: false },
    ],
  },
  {
    question: "How do you say One CFF in Hungarian?",
    video: "pictures/onecff.mp4",
    sentence: "“The feeling of a united work family”",
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
// audio.volume = 0; // bgm audio

let currentQuestionIndex = 0;
let score = 0;

// show the quiz when the "Start Quiz" button is clicked
showQuizButton.addEventListener("click", startQuiz);

// continue with the next question or restart the quiz on "Next Question" click
nextButton.addEventListener("click", handleNextButton);

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    // Check if it's the last question to change button to "submit instead"
    if (currentQuestionIndex === questions.length - 1) {
      nextButton.innerHTML = "Submit";
    }
    showQuestion();
  } else {
    showScore();
  }
}

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

  const topImage = document.getElementById("top-image");
  topImage.src = topImages[currentQuestionIndex];

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
    selectedBtn.disabled = true;
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
    const congratulatoryMessageElement = document.createElement("p");
    congratulatoryMessageElement.innerText = `Congratulations! You scored ${score} out of ${questions.length} and  completed the quiz!`;

    // container for the congratulatory message, final video, and buttons
    const resultContainer = document.createElement("div");
    resultContainer.style.textAlign = "center";

    const finalVideoElement = document.createElement("video");
    finalVideoElement.src = "/pictures/winning.mp4";
    finalVideoElement.controls = false;
    finalVideoElement.autoplay = true;
    finalVideoElement.loop = true;
    finalVideoElement.style.margin = "auto";
    finalVideoElement.style.display = "block";
    finalVideoElement.width = 600;
    finalVideoElement.height = 400;
    finalVideoElement.volume = 0.4;

    // "Play Again" button
    const retryButton = document.createElement("button");
    retryButton.innerHTML = "Play Again";
    retryButton.id = "next-btn";
    retryButton.addEventListener("click", startQuiz);

    // Creators link
    const creatorsLink = document.createElement("a");
    creatorsLink.href = "creators.html";
    creatorsLink.innerHTML = "Check out the creators of this website!";
    creatorsLink.id = "next-btn";

    resultContainer.appendChild(congratulatoryMessageElement);
    resultContainer.appendChild(finalVideoElement);
    resultContainer.appendChild(retryButton);
    resultContainer.appendChild(document.createElement("br")); // Line break
    resultContainer.appendChild(document.createElement("br")); // Line break
    resultContainer.appendChild(creatorsLink);

    questionElement.innerHTML = ""; // Clear the question content
    questionElement.appendChild(resultContainer);

    // show the retry button after 32 seconds. video is 31 seconds, so slightly after
    setTimeout(() => {
      showRetryButton();
    }, 1);

    // Show the link after 32 seconds
    setTimeout(() => {
      showLinkToNextPage();
    }, 1);
  } else {
    // Player didn't get all questions right
    // const retryMessageElement = document.createElement("p");
    // retryMessageElement.innerText = `You scored ${score} out of ${questions.length} 😔 Retry to get all questions right! There might be a prize if you get all questions correct 🤔`; // not really needed since there's no way to fail this quiz but gonna leave it for now
    // questionElement.appendChild(retryMessageElement);
  }

  function showRetryButton() {
    const retryButton = document.createElement("next-btn");
    retryButton.innerHTML = "Play Again";
    retryButton.classList.add("next-btn");
    retryButton.addEventListener("click", startQuiz);
    questionElement.appendChild(retryButton);
  }

  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }

  function showLinkToNextPage() {
    const linkElement = document.createElement("a");
    linkElement.href = "creators.html";
    linkElement.innerHTML = "Check out the creators of this website!";
    linkElement.classList.add("next-btn");
    questionElement.appendChild(linkElement);
  }
  startConfetti();
}
