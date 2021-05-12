const socki = new WebSocket('ws://localhost:8080')

//action, actionType, actionValue
let data = {}

function actionStart() {
  data['action'] = 'start'
  data['actionType'] = document.querySelector('input[name=countertype]:checked').value
  data['actionValue'] = document.getElementById('targetValue').value
  socki.send(JSON.stringify(data))
}

function actionStop() {
  data['action'] = 'stop'
  data['actionType'] = document.querySelector('input[name=countertype]:checked').value
  data['actionValue'] = document.getElementById('targetValue').value
  socki.send(JSON.stringify(data))
}

function actionReset() {
  data['action'] = 'reset'
  data['actionType'] = document.querySelector('input[name=countertype]:checked').value
  data['actionValue'] = document.getElementById('targetValue').value
  socki.send(JSON.stringify(data))
}