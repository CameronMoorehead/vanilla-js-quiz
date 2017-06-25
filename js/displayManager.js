/* Manages display by determining if the username key exists
 * in localStorage. If it does, the displayManager will return
 * the outro-cc. If username is null, the intro content container
 * is displayed instead.
*/
Q.manageDisplay = function() {
  if (Q.username === null && Q.score === null) {
    Q.fadeIn(Q.introCC)
  } else {
    Q.createOutro()
    Q.fadeIn(Q.outroCC)
  }
}
