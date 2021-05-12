const socki = new WebSocket('ws://localhost:8080')
console.log("bumms")

socki.onmessage = (e) => {
  console.log(e.data)
  document.getElementById("counter").innerText = e.data
}

