/* Handles logic for the outro content container.
 * Fetches usename and score from localStorage
*/
Q.createOutro = function() {
  var username = localStorage.getItem(Q.USERNAME_KEY)
  var score = localStorage.getItem(Q.SCORE_KEY)
  var possibleScore = localStorage.getItem(Q.POSSIBLE_SCORE_KEY)
  var text = username + ". You scored " + score  + " out of " + possibleScore + " on your quiz. Would you like to try again?"
  Q.outroText.innerHTML = text
}
