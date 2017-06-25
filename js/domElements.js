// DOM elements and other globals, to cut down on vanilla-js verbosity

// Intro CacheDom
Q.introCC = document.getElementById("intro-cc")
Q.introPrompt = document.getElementById("intro-prompt")
Q.introTransition = document.getElementById("intro-transition")
Q.introTransitionText = document.getElementById("intro-transition-text")
Q.nameInput = document.getElementById("nameInput")
Q.nameSubmit = document.getElementById("nameSubmit")
Q.username = localStorage.getItem("username")
Q.USERNAME_KEY = "username"

// Quiz CacheDom
Q.quizCC = document.getElementById("quiz-cc")
Q.quizQuestionCC = document.getElementById("quiz-question-cc")
Q.quizQuestion = document.getElementById("quiz-question")
Q.quizAnswers = document.getElementById("quiz-answers")
Q.nextQuestionButton = document.getElementById("next-question-btn")
Q.score = localStorage.getItem("score")
Q.SCORE_KEY = "score"
Q.POSSIBLE_SCORE_KEY = "possibleScore"

// Outro CacheDom
Q.outroCC = document.getElementById("outro-cc")
Q.outroText = document.getElementById("outro-text")
Q.outroTransition = document.getElementById("outroTransition")
