//Canvas config
var canvas = document.getElementById("board1");
var canvas1 = document.getElementById("board2"); 
var ctx = canvas.getContext("2d");

//Variable globales
var interval;
var frames = 0;
var cars = []
var images = {
  bg : "./images/road.png",
  player : "./images/FEDERICO.png",
  player2 : "./images/ROLANDO.png",
  carRed : "./images/enemy01.png",
  carYellow : "./images/enemy01-b.png",
  guajolota : "./images/GUAJOLOTA.png"
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
      this.x --
      if(this.x < -canvas.width) this.x = 0
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
      ctx.drawImage(this.image,this.x + this.width,this.y,this.width,this.height)

      ctx.fillText("Time : " + Math.floor(frames /60)+ " sec",50,50)
      ctx.font="20px Avenir"
      ctx.fillStyle = "white"
    }
} // Class Board 

class Fede{
  constructor(){
    this.x = 100
    this.y = 255
    this.width = 40
    this.height = 50
    this.image = new Image()
    this.image.src = images.player
    this.image.onload = () => {
      this.draw()
    }
    this.gravity = 10
  }
  draw(){
    if (this.y < canvas.height-70) this.y += this.gravity
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height) 
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
  }
  draw(){
    this.x -=15
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}


//Instancias
var board1 = new Board1()
var player = new Fede()
var car = new Car()


//Funciones principales
function update(){
  if(frames>0){
    frames --;
    console.log(frames)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    board1.draw()
    player.draw()
    randomCar()
    drawCars()
  }else{
    finishLine()
  }
}

function start(){
  frames = 10800
  interval = setInterval(update, 1000/60)
}

function  finishLine(){
  if(frames === 0){
    clearInterval(interval)
    ctx.font = "60px Minecraft"
    ctx.fillText("Guajolota!!!", 300, 150)
    ctx.font = "20px Minecraft"
    ctx.fillStyle = "red"
    ctx.fillText("Presiona 'Esc' para continuar...",300,200)
    interval = null
    board1.music.pause()
    board1.winSound.play()
  }
}

//Funciones auxiliares
function randomCar(){
  if(frames % 70 === 0){
  var y = 255;
  var coche = new Car("carRed")
  var cocheAmarillo = new Car("carYellow")
  cars.push(coche)
  cars.push(cocheAmarillo)
  }
}

function drawCars(){
  cars.forEach(function(cars){
    cars.draw()
  })
}

//Observadores
addEventListener("keydown", function(e){
  if(e.keyCode === 32 && player.y >canvas.height-70 ){
    player.y -= 200
  }
  if(e.keyCode === 27){
    start()
    board1.music.play()
  }
})