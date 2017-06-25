Q.quizInit = function() {

  // Model
  function QuizQuestion(questionData) {
    this.question = questionData.question
    this.answers = questionData.answers
    this.correctAnswer = questionData.correctAnswer
  }

  function QuizModel(quizData) {
    this.score = 0
    this.questionArray = []
    this.quizQuestions = this.createQuestions(quizData)
    this.currentQuestionIndex = 0
  }
  QuizModel.prototype.createQuestions = function(quizData) {
    quizData.forEach(function(questionData) {
      this.questionArray.push(new QuizQuestion(questionData))
    }.bind(this))
    return this.questionArray
  }
  QuizModel.prototype.checkAnswer = function(answer) {
    if (this.getCurrentQuestion.correctAnswer === answer) {
      this.score++
    }
  }
  QuizModel.prototype.modelNextQuestion = function() {
    this.currentQuestionIndex++
  }
  QuizModel.prototype.getCurrentQuestion = function() {
    return this.quizQuestions[this.currentQuestionIndex]
  }

  // View
  function QuizView(quizController) {
    this.quizController = quizController
    this.quizQuestionCC = document.getElementById("quiz-question-cc")
    this.quizQuestion = document.getElementById("quiz-question")
    this.quizAnswers = document.getElementById("quiz-answers")
    this.nextQuestionButton = document.getElementById("next-question-btn")
    this.nextQuestionButton.onclick = function(e) {
      e.preventDefault()
      this.quizController.controlNextQuestion()
    }.bind(this)
  }
  QuizView.prototype.bindDom = function() {
  }
  QuizView.prototype.renderQuestion = function(currentQuestion) {
    this.quizQuestion.innerHTML = currentQuestion.question
    var quizAnswers = ""
    currentQuestion.answers.forEach(function(answer, i) {
      quizAnswers +=
        "<input type='radio' name='answer' value='" + i + "' id='answer" + i + "'>" + answer + "<br />"
    })
    this.quizAnswers.innerHTML = quizAnswers
  }

  // Controller
  function QuizController(quizData) {
    this.quizModel = new QuizModel(quizData)
    this.quizView = new QuizView(this)
    this.controlNextQuestion()
  }
  QuizController.prototype.controlNextQuestion = function() {
    console.log(this.quizModel.getCurrentQuestion())
    this.quizView.renderQuestion(this.quizModel.getCurrentQuestion())
    this.quizModel.modelNextQuestion()
  }

  var test = new QuizController(Q.data)
  console.log(test)

}
