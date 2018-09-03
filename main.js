//Canvas config
var canvas = document.getElementById("board1");
var ctx = canvas.getContext("2d");

//Variable globales
var cars = []
var interval;
var frames = 0;
var images = {
  bg : "./images/road.png",
  player : "./images/FEDERICO.png",
  carRed : "./images/enemy01.png",
  carYellow : "./images/enemy01-b.png"
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
  }
    draw(){
      this.x --
      if(this.x < -canvas.width) this.x = 0
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
      ctx.drawImage(this.image,this.x + this.width,this.y,this.width,this.height)
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
  constructor(){
    this.x
    this.y
    this.width
    this.height
    
  }
}


//Instancias
var board1 = new Board1()
board1.draw()

var player = new Fede()
player.draw()

//Funciones principales
function update(){
  frames ++;
  ctx.clearRect(0,0,canvas.width,canvas.height)
  board1.draw()
  player.draw()
}

function start(){
  frames = 0
  interval = setInterval(update, 1000/60)
}

//Funciones auxiliares

//Observadores
addEventListener("keydown", function(e){
  if(e.keyCode === 32 && player.y >canvas.height-70 ){
    player.y -= 200
  }
})
start()