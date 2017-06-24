/* Provide element to fade out and an element to fade in */
Q.fadeTransition = function(outElement, inElement) {
  Q.fadeOut(outElement)
  Q.fadeIn(inElement)
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
