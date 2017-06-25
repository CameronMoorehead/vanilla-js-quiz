/* Start quiz by calling Q.quizInit, which contains 4 constructor functions
 * which dicate the logic of the quiz.
*/
Q.quizInit = function() {

  // Constructor for quiz question objects
  function QuizQuestion(questionData) {
    this.question = questionData.question
    this.answers = questionData.answers
    this.correctAnswer = questionData.correctAnswer
  }

  /* Holds scores, an array of the quiz question objects,
   * init's localStorage and sets up quiz data for consumption by
   * QuizController
  */
  function QuizModel(quizData) {
    this.score = 0
    this.questionArray = []
    this.quizQuestions = this.createQuestions(quizData)
    this.currentQuestionIndex = null
    // Done here in case user refreshes pag during quiz to avoid null's
    localStorage.setItem(Q.SCORE_KEY, this.score)
    localStorage.setItem(Q.POSSIBLE_SCORE_KEY, this.quizQuestions.length)
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
  /* If the quiz has not yet started, change index to 0 from null,
   * otherwise controller cannot start the quiz logic itself
  */
  QuizModel.prototype.modelNextQuestion = function() {
    if (this.currentQuestionIndex === null) {
      this.currentQuestionIndex = 0
    } else if (this.currentQuestionIndex === this.quizQuestions.length - 1) {
      this.endQuiz()
    } else {
      this.currentQuestionIndex++
    }
  }
  QuizModel.prototype.getCurrentQuestion = function() {
    return this.quizQuestions[this.currentQuestionIndex]
  }
  QuizModel.prototype.endQuiz = function() {
    localStorage.setItem(Q.SCORE_KEY, this.score)
    Q.createOutro()
    // Transition from quiz to outro
    Q.fadeTransition(Q.quizCC, Q.outroCC, 0, 1250)
  }

  function QuizView(quizController) {
    this.quizController = quizController
    this.currentAnswer = null
    this.answerLogic()
  }
  // Uses null object for form validation (user checks radio button)
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

  /* Setup controller to have access to/knowledge of
   * QuizModel and QuizView
  */
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

  // Start quiz
  var main = new QuizController(Q.data)

}
