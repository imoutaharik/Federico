var instructbtn = document.getElementById("instructionsBtn")
//Clases
class Boardlvl2{
  constructor(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.image = new Image()
    this.image.src = images.bglvl2
    this.image.onload = () => {
      this.draw()
    }
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


//Instancias
var boardlvl2 = new Boardlvl2()


//Funciones principales
function updatelvl2(){
  if(frames>0){
    frames --;
    ctx.clearRect(0,0,canvas.width,canvas.height)
    boardlvl2.draw()
    player1.draw()
    updateScore1()
    compareScore()
    randomAtole()
    powerUp()
  }else{
    finishLinelvl2()
  }
}

function P1level2(){
  frames = 5400
  interval = setInterval(updatelvl2, 1000/60)
  score1=0
}

function finishLinelvl2(){
  if(frames === 0){
    clearInterval(interval)
    ctx.fillStyle = "#ffe000"
    ctx.font = "30px Minecraft"
    ctx.fillText("Bien!! No te mandaron a Honores!!!", 200, 150)
    ctx.font = "20px Minecraft"
    ctx.fillStyle = "white"
    ctx.fillText("Es todo por el momento",300,200)
    interval = null
    winner()
  }
}



