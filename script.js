let increase = true
let decrease = false
let flowerSize = 1
let flowerX = 100
let flowerY = 100
let flowerClicked = false
let pollen = 0
const SPACE_BAR = 32
const keyR = 82
let hiveBank = 0
let speedFactor = 100
let gameStarted = false
let timer = 60
let countdown = false

function preload() {
  bee = loadImage("bee.png")
  hive = loadImage("hive.png")
  whiteFlower1 = loadImage("whiteFlower1.png")
  whiteFlower2 = loadImage("whiteFlower2.png")
  whiteFlower3 = loadImage("whiteFlower3.png")
  redFlower = loadImage("redFlower.png")
  burgundyFlower = loadImage("burgundyFlower.png")
  pinkFlower1 = loadImage("pinkFlower1.png")
  pinkFlower2 = loadImage("pinkFlower2.png")
  purpleFlower1 = loadImage("purpleFlower1.png")     
  purpleFlower2 = loadImage("purpleFlower2.png")  
  purpleFlower3 = loadImage("purpleFlower3.png")     
  yellowFlower1 = loadImage("yellowFlower1.png")
  yellowFlower2 = loadImage("yellowFlower2.png")
  currentFlower = whiteFlower1
  titleFont = loadFont("Honey.ttf")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER)
  rectMode(CENTER)
  textStyle(BOLD)
  
  // start game button
  button = createButton('START GAME');
  button.position(width/2, height/3*2)
  button.style('background-color', "wheat");
  button.style('border', 0)
  button.mousePressed(startGame)
  button.style('width', '40%');
  button.style('height', '40px');
  button.style('margin-left', '-20%');
  button.style('color', 'black');
  button.style('font-weight', '700')

  // flowers array
  flowers = [whiteFlower1, whiteFlower2, whiteFlower3, redFlower, pinkFlower1, pinkFlower2, burgundyFlower, purpleFlower1, purpleFlower2, purpleFlower3, yellowFlower1, yellowFlower2]
}


function draw() {
  // beehive
  stroke(1)
  background(263, 223, 155)
  fill(255, 255, 255, 100)
  ellipse(width/2, height/2, 180, 180)
  image(hive, width/2 - 5, height/2, 150, 150)

  // flowers increase/decrease
  if (increase) {
    flowerSize += 3
  }
  if (flowerSize >= 150) {
    increase = false
    decrease = true
  }
  if (decrease) {
    flowerSize -= 3
  }
  if (flowerSize == 0) {
    decrease = false
  }
  
  // highlights flower when selected
  noFill()
  noStroke()
  if (flowerClicked) {
    fill(255, 255, 255, 100)
  }

  // bee
  image(bee, mouseX, mouseY, 80, 80)

  // draws flowers
  ellipse(flowerX, flowerY, Math.min(180, flowerSize))
  image(currentFlower, flowerX, flowerY, Math.min(180, flowerSize), Math.min(180, flowerSize))


  // resetting flower data
  if (frameCount % speedFactor == 0) {
    flowerClicked = false
    decrease = false
    increase = true
    flowerSize = 1
    flowerX = random(width)
    if ((flowerX < width/3) ||
      (flowerX > (2* width/3))) {
      flowerY = random(height)
    } else {
      flowerY = random(height/3) }
    currentFlower = random(flowers)
  }

  // pollen increases when flower is clicked and space bar is pressed
  if (flowerClicked && keyIsDown(SPACE_BAR) && pollen < 100) {
    pollen++
  }

  // game restarts when r key is pressed
  if (keyIsDown(keyR)) {
    gameStarted = false
    countdown = false
    button.show()
    timer = 60
    hiveBank = 0
  }

  // displays honey amount/score on beehive
  fill(1)
  textSize(42)
  textAlign(CENTER)
  text(hiveBank, width/2, height/2)

  // name on bottom corner
  textAlign(LEFT)
  fill(1) 
  text("MERYAM AKHUNDOVA", 20, height - 20)

  // start page
  textAlign(CENTER)
  if (!gameStarted) {
    fill(255, 255, 255, 0)
    rect(width/2, height/2, width, height)
    fill(256)
    stroke(1)
    strokeWeight(5)
    drawingContext.setLineDash([15, 15]);
    rect(width/2, height/2, width/2, height/2)
    noStroke()
    fill(1)
    textFont(titleFont, 100)
    // title
    text("HONEYCOMB HEROES", width/2, height/2-100)
    // instructions
    textSize(30)
    textStyle(BOLD)
    text("collect pollen: click to select flower + hold spacebar", width/2, height/2-50)
    text("deliver nectar: double click on the beehive", width/2, height/2)
    text("click r key to restart game", width/2, height/2+50)
    text("collect as much honey as you can before the timer runs out!", width/2, height/2+100)
    } else {
      stroke(1)
      fill(256)
      rect(width/2, height/2 + 150 + 50, 200, 30)
      noStroke()
      fill(235, 175, 76)
      // pollen bar
      rect(width/2, height/2 + 150 + 50, pollen*2, 30)
      fill(1)
    textSize(30)
      text("pollen", width/2, height/2+170)
      countdown = true     
    }
  
  if (countdown) {
    // timer
    fill(1)
    textSize(40)
    text("TIMER", width/2, height/16)
    text(timer, width/2, height/10);
    if (frameCount % 60 == 0 && timer > 0) {
    timer --;
    }
    if (timer == 0) {
    fill(243, 203, 135, 120)
    rect(width/2, height/2, width, height)
    stroke(1)
    strokeWeight(5)
    drawingContext.setLineDash([15, 15]);
    fill(256)
    rect(width/2, height/2, width/2, height/2)
    noStroke()
    fill(1)
      textSize(200)
    text("GAME OVER", width/2, height/3+100);
      textSize(50)
      textStyle(BOLD)
    text("your final score was " + hiveBank, width/2, height/2+50)
    text("click r key to play again! ", width/2, height/2+100)
    }
  }
}

function startGame() {
  gameStarted = true
  button.hide()
}


function mousePressed() {
  // defines when flower is clicked
  if (gameStarted) {
    let a = mouseX - flowerX
    let b = mouseY - flowerY
    let distance = Math.sqrt(a**2 + b**2)
    if (distance < flowerSize/2) {
      flowerClicked = true
    }
  }
}

function doubleClicked() {
  // defines when hive is clicked
  let xMin = width/2 - 80
  let xMax = width/2 + 80
  let yMin = height/2 - 80
  let yMax = height/2 + 80

  if (mouseX > xMin && mouseX < xMax && mouseY > yMin && mouseY < yMax) {
    hiveBank += pollen
    pollen = 0

    // increases speed of flowers as score increases
    if (hiveBank > 600) {
      speedFactor = 70
    } else if (hiveBank > 400) {
      speedFactor = 80
    } else if (hiveBank > 200) {
      speedFactor = 90
    }
  }
}


  