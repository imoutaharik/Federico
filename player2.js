//Canvas config
var canvas2 = document.getElementById("board2");
var score2Txt = document.getElementById("scoreP2")
var score2 = parseInt(document.getElementById("scoreP2").innerHTML)
var ctx2 = canvas2.getContext("2d");


var interval2;
var frames2 = 0;
var cars2 = [];
var atoles2 = [];
var images2 = {
  bg : "./images/bg02.png",
  player2 : "./images/ROLANDO.png",
  player2Hurt : "./images/ROLANDO-hurt.png",
  carRed2 : "./images/enemy01.png",
  carYellow2 : "./images/enemy01-b.png",
  atole2 : "./images/atole.png",
  emptyAtole2 : "./images/emptyAtole.png"
}

//Clases
class Board2{
  constructor(){
    this.x = 0
    this.y = 0
    this.width = canvas2.width
    this.height = canvas2.height
    this.image = new Image()
    this.image.src = images2.bg
    this.image.onload = () => {
      this.draw()
    }

    this.winSound = new Audio()
    this.winSound.src = "./images/win-sound.mp3"
  }
    draw(){
      this.x -=10
      if(this.x < -canvas2.width) this.x = 0
      ctx2.drawImage(this.image,this.x,this.y,this.width,this.height)
      ctx2.drawImage(this.image,this.x + this.width,this.y,this.width,this.height)

      ctx2.fillText("Time : " + Math.floor(frames2 /60)+ " sec",50,50)
      ctx2.font="20px Minecraft"
      ctx2.fillStyle = "white"
    }
} // Class Board 


class Rolando{
  constructor(){
    this.x = 150
    this.y = 255
    this.width = 40
    this.height = 50
    this.image = new Image()
    this.image.src = images2.player2
    this.image.onload = () => {
      this.draw()
    }
    this.gravity = 8
  }
  draw(){
    if (this.y < canvas2.height-70) this.y += this.gravity
    ctx2.drawImage(this.image,this.x,this.y,this.width,this.height) 
  }  
  crashWidth(item){
    var crash =  (this.x < item.x + item.width) &&
           (this.x + this.width > item.x) &&
           (this. y < item.y + item.height) &&
           (this.y + this.height > item.y);
    if(crash){
      return crash
    } 
  }
}

class Car2{
  constructor(carName = "carRed2"){
    this.x = canvas2.width
    this.y = 255
    this.width = 60
    this.height = 50
    this.image = new Image()
    this.image.src = images2[carName]
    this.image.onload = () => {
      this.draw()
    }
    this.crash = new Audio()
    this.crash.src = "./images/collision.mp3"  
  }
  draw(){
    this.x -=15
    ctx2.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}

class Atole2{
  constructor(){
    this.x = canvas2.width
    this.y = 120
    this.width = 30
    this.height = 30
    this.image = new Image()
    this.image.src = images2.atole2
    this.image.onload = () => {
      this.draw()
    }  
  }
  draw(){
    this.x -=15
    ctx2.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}


//Instancias
var board2 = new Board2()
var player2 = new Rolando()
var car2 = new Car2()
var atole2 = new Atole2()


//Funciones principales
function update2(){
  if(frames2>0){
    frames2 --;
    ctx2.clearRect(0,0,canvas2.width,canvas2.height)
    board2.draw()
    player2.draw()
    randomCarY2()
    randomCarR2()
    drawCars2()
    updateScore2()
    checkCollisions2()
    compareScore()
    randomAtole2()
    powerUp2()
  }else{
    finishLine2()
  }
}

function P2level1(){
  frames2 = 3600
  interval2 = setInterval(update2, 1000/60)
  score2=0
}

function updateScore2(){
  if(frames2 % 300 === 0){
    score2 += 50
    score2Txt.innerHTML = score2
    console.log(score2)
  }
}

function finishLine2(){
  if(frames2 === 0){
    clearInterval(interval2)
    ctx2.fillStyle = "white"
    ctx2.font = "60px Minecraft"
    ctx2.fillText("Guajolota!!!", 300, 150)
    ctx2.font = "20px Minecraft"
    ctx2.fillStyle = "red"
    ctx2.fillText("Presiona 'Tab' para continuar...",300,200)
    interval2 = null
    board2.winSound.play()
    winner()
  }
}

function checkCollisions2(){
  cars2.forEach(function(car2){
    if (player2.crashWidth(car2)){
      if(score2 >0){
        score2 -= 5
        score2Txt.innerHTML= score2
        console.log(score2)
        car2.crash.play()
      }else{
        score2 = 0
        score2Txt.innerHTML= score2
        car2.crash.play()
        player2.image.src = images2.player2Hurt
      }
    }else{
      player2.image.src = images2.player2
    }
  })
  atoles2.forEach(function(atole2){
    if (player2.crashWidth(atole2)){
      if(score2 >=0){
        score2 += 14
        score2Txt.innerHTML= score2
      }
      atole2.image.src = images2.emptyAtole2
    }
  })
}

//Funciones auxiliares
function randomCarY2(){
  if(frames2 % 100 === 0){
  var y = 255
  var cocheAmarillo = new Car2("carYellow2")
  cars2.push(cocheAmarillo)
  }
}

function randomCarR2(){
  if(frames2 % 95 === 0){
  var y = 255
  var coche = new Car2("carRed2")
  cars2.push(coche)
  }
}

function drawCars2(){
  cars2.forEach(function(cars2){
    cars2.draw()
  })
}

function randomAtole2(){
  if(frames2 % 250 === 0){
    var y = 120
    var atole2 = new Atole2()
    atoles2.push(atole2)
    }
}

function powerUp2(){
  atoles2.forEach(function(atoles2){
    atoles2.draw()
  })
}

//Observadores
addEventListener("keydown", function(e){
  if(e.keyCode === 16 && player2.y >canvas2.height-70){
    this.gravity = 0
    player2.y -= 220
  }
})
