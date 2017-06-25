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
    this.currentQuestionIndex = null
  }
  QuizModel.prototype.createQuestions = function(quizData) {
    quizData.forEach(function(questionData) {
      this.questionArray.push(new QuizQuestion(questionData))
    }.bind(this))
    return this.questionArray
  }
  QuizModel.prototype.checkAnswer = function(answer) {
    var currentQuestion = this.getCurrentQuestion()
    if (currentQuestion.correctAnswer === parseInt(answer, 10)) {
      this.score++
    }
  }
  QuizModel.prototype.modelNextQuestion = function() {
    if (this.currentQuestionIndex === null) {
      this.currentQuestionIndex = 0
    } else if (this.currentQuestionIndex === this.quizQuestions.length - 1) {
      this.endQuiz()
    } else {
      this.currentQuestionIndex++
      console.log(this.currentQuestionIndex)
    }
  }
  QuizModel.prototype.getCurrentQuestion = function() {
    return this.quizQuestions[this.currentQuestionIndex]
  }
  QuizModel.prototype.endQuiz = function() {
    localStorage.setItem(Q.SCORE_KEY, this.score)
    localStorage.setItem(Q.POSSIBLE_SCORE_KEY, this.quizQuestions.length)
    Q.createOutro()
    Q.fadeTransition(Q.quizCC, Q.outroCC, 0, 1250)
  }

  // View
  function QuizView(quizController) {
    this.quizController = quizController
    this.currentAnswer = null
    this.answerLogic()
  }
  QuizView.prototype.answerLogic = function() {
    Q.nextQuestionButton.onclick = function(e) {
      e.preventDefault()
      if (this.getCurrentAnswer() !== null) {
        this.quizController.checkAnswer(this.currentAnswer)
        this.quizController.controlNextQuestion()
        this.currentAnswer = null
      } else {
        alert('answer first please')
      }
    }.bind(this)
  }
  QuizView.prototype.renderQuestion = function(currentQuestion) {
    Q.quizQuestion.innerHTML = currentQuestion.question
    var quizAnswers = ""
    currentQuestion.answers.forEach(function(answer, i) {
      quizAnswers +=
        "<input type='radio' name='answer' value='" + i + "' id='answer" + i + "'>" + answer + "<br />"
    })
    Q.quizAnswers.innerHTML = quizAnswers
  }
  QuizView.prototype.getCurrentAnswer = function() {
    var inputsNodeList = document.getElementsByTagName("input")
    var inputsArray = Array.prototype.slice.call(inputsNodeList)
    inputsArray.forEach(function(input) {
      if (input.checked) {
        this.currentAnswer = input.value
      }
    }.bind(this))
    return this.currentAnswer
  }

  // Controller
  function QuizController(quizData) {
    this.quizModel = new QuizModel(quizData)
    this.quizView = new QuizView(this)
    this.controlNextQuestion()
  }
  QuizController.prototype.controlNextQuestion = function() {
    this.quizModel.modelNextQuestion()
    this.quizView.renderQuestion(this.quizModel.getCurrentQuestion())
  }
  QuizController.prototype.checkAnswer = function(answer) {
    this.quizModel.checkAnswer(answer)
  }

  var test = new QuizController(Q.data)

}
