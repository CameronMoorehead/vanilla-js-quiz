/* Provide element to fade out and an element to fade in.
 * Also provides delayOut and delayIn for timing animations
*/
Q.fadeTransition = function(outElement, inElement, delayOut, delayIn) {
  if (!delayOut && !delayIn) {
    Q.fadeOut(outElement)
    Q.fadeIn(inElement)
  } else if (!delayOut && delayIn) {
    Q.fadeOut(outElement)
    setTimeout(function() {
      Q.fadeIn(inElement)
    }, delayIn)
  } else if (delayOut && !delayIn) {
    setTimeout(function() {
      Q.fadeOut(outElement)
    }, delayOut)
    Q.fadeIn(inElement)
  } else {
    setTimeout(function() {
      Q.fadeOut(outElement)
    }, delayOut)
    setTimeout(function() {
      Q.fadeIn(inElement)
    }, delayIn)
  }
}

// Fades element out
Q.fadeOut = function(el) {
  el.style.opactity = 1;
  (function fade() {
    if ((el.style.opacity -= .025) < 0) {
      el.style.display = "none"
      el.classList.add("is-hidden")
    } else {
      requestAnimationFrame(fade)
    }
  })()
}

// Fades element in
Q.fadeIn = function(el, display) {
  if (el.classList.contains("is-hidden")) {
    el.classList.remove("is-hidden")
  }
  el.style.opacity = 0
  el.style.display = display || "block";
  (function fade() {
    var val = parseFloat(el.style.opacity)
    if (!((val += .025) > 1)) {
      el.style.opacity = val
      requestAnimationFrame(fade)
    }
  })()
}
