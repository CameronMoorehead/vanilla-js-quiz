/* Manages display by determining if the username key exists
 * in localStorage. If it does, the displayManager will return
 * the outr-cc. If username is null, the intro content container
 * is displayed instead.
*/
Q.manageDisplay = function() {
  if (Q.username === null) {
    Q.fadeIn(Q.introCC)
  } else {
    Q.fadeIn(Q.outroCC)
  }
  console.log(localStorage.getItem("aa"))
}
