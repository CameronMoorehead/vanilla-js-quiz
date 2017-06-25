/* Handles logic for the intro content container.
 * Stores a username in localStorage and provides a
 * smooth transition to the quiz-cc
*/
Q.nameSubmit.onclick = function(e) {
  e.preventDefault()
  localStorage.setItem(Q.USERNAME_KEY, Q.nameInput.value)
  Q.nameInput.value = ""

  var transitionText = Q.getTransitionText()

  Q.fadeTransition(Q.introPrompt, Q.introTransition)
  Q.fadeTransition(Q.introCC, Q.quizCC, 3000, 4000)
}

Q.getTransitionText = function() {
  var username = localStorage.getItem(Q.USERNAME_KEY)
  var text = "Okay " + username + ". Here is your quiz"
  Q.introTransitionText.innerHTML = text
  return Q.introTransitionText
}
