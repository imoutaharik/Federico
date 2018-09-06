//Canvas config
var canvas= document.getElementById("board1");
var score1Txt = document.getElementById("scoreP1")
var score1 = parseInt(document.getElementById("scoreP1").innerHTML)
var ctx;
var playSolo = document.getElementById("playsolo");
var multiplayer = document.getElementById("multiplayer");
var soloScore = document.getElementById("soloScore")
var multiScore = document.getElementById("multiScore")
var soloscoretxt = document.getElementById("scoretxtsolo")
var versustxt = document.getElementById("scoretxtvs")
var multiscoretxt = document.getElementById("scoretxtmulti")

function begin1Player(){
  ctx = canvas.getContext("2d");
  board1.music.play()
  P1level1()
  playSolo.setAttribute("disabled", true)
  soloscoretxt.removeAttribute("class")
  multiplayer.setAttribute("disabled", true)
}
function multiPlayer(){
  ctx = canvas.getContext("2d");
  ctx2 = canvas2.getContext("2d");
  board1.music.play()
  P1level1()
  P2level1()
  multiplayer.setAttribute("disabled", true)
  soloscoretxt.removeAttribute("class")
  multiscoretxt.removeAttribute("class")
  versustxt.removeAttribute("class")
  playSolo.setAttribute("disabled", true)
}

//Variable globales
var interval;
var frames = 0;
var cars = [];
var atoles = [];
var images = {
  bg : "./images/bg02.png",
  player1 : "./images/FEDERICO.png",
  player1B : "./images/FEDERICO2.png",
  player1Hurt : "./images/FEDERICO-hurt.png",
  carRed : "./images/enemy01.png",
  carYellow : "./images/enemy01-b.png",
  atole : "./images/atole.png",
  emptyAtole : "./images/emptyAtole.png"
}

//Clases
class Board1{
  constructor(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.image = new Image()
    this.image.src = images.bg
    this.image.onload = () => {
      this.draw()
    }
    this.music = new Audio()
    this.music.src = "./images/cumbia-8bits.mp3"

    this.winSound = new Audio()
    this.winSound.src = "./images/win-sound.mp3"
  }
    draw(){
      this.x -=10
      if(this.x < -canvas.width) this.x = 0
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
      ctx.drawImage(this.image,this.x + this.width,this.y,this.width,this.height)

      ctx.fillText("Time : " + Math.floor(frames /60)+ " sec",50,50)
      ctx.font="20px Minecraft"
      ctx.fillStyle = "white"
    }
} // Class Board 


class Fede{
  constructor(){
    this.x = 150
    this.y = 255
    this.width = 40
    this.height = 50
    this.image2 = new Image()
    this.image2.src = images.player1B
    this.image1 = new Image()
    this.image1.src = images.player1
    this.theImage = this.image1
    this.gravity = 11
  }
  animate(){
    if(frames % 10 === 0){
        if(this.theImage === this.image1) this.theImage = this.image2
        else if(this.theImage === this.image2) this.theImage = this.image1
    }
  }
  draw(){
    this.animate()
    ctx.drawImage(this.theImage,this.x,this.y,this.width,this.height) 
    if (this.y < canvas.height-70) this.y += this.gravity
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

class Car{
  constructor(carName = "carRed"){
    this.x = canvas.width
    this.y = 255
    this.width = 60
    this.height = 50
    this.image = new Image()
    this.image.src = images[carName]
    this.image.onload = () => {
      this.draw()
    }
    this.crash = new Audio()
    this.crash.src = "./images/collision.mp3"  
  }
  draw(){
    this.x -=15
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}

class Atole{
  constructor(){
    this.x = canvas.width
    this.y = 120
    this.width = 30
    this.height = 30
    this.image = new Image()
    this.image.src = images.atole
    this.image.onload = () => {
      this.draw()
    }  
  }
  draw(){
    this.x -=15
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}


//Instancias
var board1 = new Board1()
var player1 = new Fede()
var car = new Car()
var atole = new Atole()


//Funciones principales
function update(){
  if(frames>0){
    frames --;
    ctx.clearRect(0,0,canvas.width,canvas.height)
    board1.draw()
    player1.draw()
    randomCarY()
    randomCarR()
    drawCars1()
    updateScore1()
    checkCollisions1()
    compareScore()
    randomAtole()
    powerUp()
  }else{
    finishLine1()
  }
}

function P1level1(){
  frames = 3600
  interval = setInterval(update, 1000/60)
  score1=0
}

function updateScore1(){
  if(frames % 300 === 0){
    score1 += 50
    score1Txt.innerHTML = score1
    console.log(score1)
  }
}

function finishLine1(){
  if(frames === 0){
    clearInterval(interval)
    ctx.fillStyle = "#ffe000"
    ctx.font = "60px Minecraft"
    ctx.fillText("Guajolota!!!", 300, 150)
    ctx.font = "20px Minecraft"
    ctx.fillStyle = "white"
    ctx.fillText("Presiona 'Tab' para continuar...",300,200)
    interval = null
    board1.music.pause()
    board1.winSound.play()
    winner()
  }
}

function checkCollisions1(){
  cars.forEach(function(car){
    if (player1.crashWidth(car)){
      if(score1 >0){
        score1 -= 5
        score1Txt.innerHTML= score1
        console.log(score1)
        car.crash.play()
        player1.image1.src = images.player1Hurt
      }else{
        score1 = 0
        score1Txt.innerHTML= score1
        car.crash.play()
        player1.image1.src = images.player1Hurt
      }
    }else{
      player1.image1.src = images.player1
    }
  })
  atoles.forEach(function(atole){
    if (player1.crashWidth(atole)){
      if(score1 >=0){
        score1 += 14
        score1Txt.innerHTML= score1
      }
      atole.image.src = images.emptyAtole
    }
  })
}

//Funciones auxiliares
function randomCarY(){
  if(frames % 100 === 0){
  var y = 255
  var cocheAmarillo = new Car("carYellow")
  cars.push(cocheAmarillo)
  }
}

function randomCarR(){
  if(frames % 95 === 0){
  var y = 255
  var coche = new Car("carRed")
  cars.push(coche)
  }
}

function drawCars1(){
  cars.forEach(function(cars){
    cars.draw()
  })
}

function randomAtole(){
  if(frames % 250 === 0){
    var y = 120
    var atole = new Atole()
    atoles.push(atole)
    }
}

function powerUp(){
  atoles.forEach(function(atole){
    atole.draw()
  })
}

function compareScore(){
  if(score1 > score2){
    score1Txt.style.color = "#ffe000";
    score2Txt.style.color = "#fff";
  }
  else if(score2 > score1){
    score2Txt.style.color = "#ffe000";
    score1Txt.style.color = "#fff";
  }
}

function winner(){
  if(score1 > score2){
    document.getElementById("winner1").removeAttribute("class");
  }
  else if(score2 > score1){
    document.getElementById("winner2").removeAttribute("class");
  }
}



//Observadores
addEventListener("keydown", function(e){
  if(e.keyCode === 32 && player1.y >canvas.height-70){
    this.gravity = 0
    player1.y -= 220
  }
})
