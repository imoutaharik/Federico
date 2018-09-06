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

class Profe{
  constructor(profeName = "male"){
    this.x = canvas.width
    this.y = 235
    this.width = 60
    this.height = 70
    this.image = new Image()
    this.image.src = images[profeName]
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


//Instancias
var boardlvl2 = new Boardlvl2()


//Funciones principales
function updatelvl2(){
  if(frames>0){
    frames --;
    ctx.clearRect(0,0,canvas.width,canvas.height)
    boardlvl2.draw()
    player1.draw()
    randomProfe1()
    randomProfe2()
    drawProfes1()
    updateScore1()
    checkCollisionslvl2()
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
    board1.winSound.play()
    winner()
  }
}

function checkCollisionslvl2(){
  profes.forEach(function(profe){
    if (player1.crashWidth(profe)){
      if(score1 >0){
        score1 -= 5
        score1Txt.innerHTML= score1
        console.log(score1)
        profe.crash.play()
        player1.image1.src = images.player1Hurt
      }else{
        score1 = 0
        score1Txt.innerHTML= score1
        profe.crash.play()
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

function randomProfe1(){
  if(frames % 70 === 0){
  var y = 255
  var profe1 = new Profe("male")
  profes.push(profe1)
  }
}

function randomProfe2(){
  if(frames % 85 === 0){
  var y = 255
  var profe2 = new Profe("female")
  profes.push(profe2)
  }
}

function drawProfes1(){
  profes.forEach(function(profes){
    profes.draw()
  })
}



