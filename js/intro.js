Q.nameInput = document.getElementById("nameInput")
Q.nameSubmit = document.getElementById("nameSubmit")

Q.nameSubmit.onclick = function(e) {
  e.preventDefault()
  console.log(Q.nameInput.value)
  localStorage.setItem("username", Q.nameInput.value)
  Q.nameInput.value = ""
  console.log(localStorage.getItem("username"))
}
