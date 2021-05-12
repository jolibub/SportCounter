const ws = require('ws')

const server = new ws.Server({
  port: 8080
})

let webSockets = []
let timer

server.on("connection", ws => {
  console.log("Client connected")
  ws.send('Ready')

  webSockets.push(ws)

  ws.on("message", msg => {
    let data = JSON.parse(msg)
    console.log(data)
    switch(data.action) {
      case 'start': 
        clearInterval(timer)
        actionValue = data.actionValue
        actionSelector(data.actionType)
        break
      case 'stop': 
        clearInterval(timer)
        break
      case 'reset':
        clearInterval(timer)
        webSockets.forEach(ws => {
          ws.send(data.actionType == 'countdown' ? data.actionValue : 0)
        });
        break
      default:
        console.log("no such case")
    }
  })
})



//Functions
let actionValue
let outputValue

function actionSelector(actionType) {
  switch(actionType) {
    case 'countdown': 
      outputValue = actionValue
      timer = setInterval(countdown(webSockets), 1000)
      break
    case 'counter':
      outputValue = 0
      timer = setInterval(counter(webSockets), 1000)
      break
  }
}

function counter(webSockets) {
  return ()=>{
    if(outputValue >= actionValue){
      clearInterval(timer)
    }
    webSockets.forEach(ws => {
      ws.send(outputValue)
    });
    outputValue += 1
  }
}

function countdown(webSockets) {
  return ()=>{
    if(outputValue <= 0){
      clearInterval(timer)
    }
    webSockets.forEach(ws => {
      ws.send(outputValue)
    });
    outputValue -= 1
  }
}