/* Handles logic for the outro content container.
 * Fetches username and score from localStorage
*/
Q.createOutro = function() {
  // Create outro text with userame and score
  var username = localStorage.getItem(Q.USERNAME_KEY)
  var score = localStorage.getItem(Q.SCORE_KEY)
  var possibleScore = localStorage.getItem(Q.POSSIBLE_SCORE_KEY)
  var text = username + ". You scored " + score  + " out of " + possibleScore + " on your quiz. Would you like to try again?"
  Q.outroText.innerHTML = text

  var btnText = "I'm not " + localStorage.getItem(Q.USERNAME_KEY)
  Q.notUser.innerHTML = btnText
}
// Allows user to try quiz again. Loops back to intro animations
Q.tryAgain.addEventListener("click", function(e) {
  // e.preventDefault()
  localStorage.setItem("score", 0)

  Q.getTransitionText()

  Q.introPrompt.classList.add("is-hidden")
  Q.introTransition.classList.remove("is-hidden")
  // Allows transition text to be shown before quiz restarts
  Q.fadeTransition(Q.outroCC, Q.introCC, 0, 1250)
  // Redeclare quiz object
  Q.quizInit()
  // Fade in Quiz Content Container
  Q.fadeTransition(Q.introCC, Q.quizCC, 4000, 5000)
})

/* Allows user to change username. Goes to outro transition
 * and then refreshes app state
*/
Q.notUser.addEventListener("click", function(e) {
  // e.preventDefault()
  localStorage.clear()
  Q.fadeTransition(Q.outroPrompt, Q.outroTransition, 0, 1250)
  setTimeout(function() {
    location.reload()
  }, 5000)
})
