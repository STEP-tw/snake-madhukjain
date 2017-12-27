let snake=undefined;
let food=undefined;
let numberOfRows=60;
let numberOfCols=120;

let animator=undefined;
let check=undefined;
let anotherCheck=undefined;

const animateSnake=function() {
  let oldHead=snake.getHead();
  let oldTail=snake.move();
  let head=snake.getHead();
  console.log(snake.body);
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if(head.isSameCoordAs(food)) {
    snake.grow();
    createFood(numberOfRows,numberOfCols);
    drawFood(food);
  }
}

const changeSnakeDirection=function(event) {
  switch (event.code) {
    case "KeyA":
      snake.turnLeft();
      break;
    case "KeyD":
      snake.turnRight();
      break;
    case "KeyC":
      snake.grow();
      break;
    default:
  }
}

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
}

const createSnake=function() {
  check=setInterval(isSnakeAtBorder,100);
  anotherCheck = setInterval (snakeStrikeItself,100);
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();
  snake=new Snake(head,body);
}

const createFood=function(numberOfRows,numberOfCols) {
  food=generateRandomPosition(numberOfCols,numberOfRows);
}

const startGame=function() {
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows,numberOfCols);
  drawFood(food);
  addKeyListener();

  animator=setInterval(animateSnake,140);
}

const snakeStrikeItself = function(){
  for (var index=0; index<snake.body.length;index++){
    let snakeHead= snake.head.x;
    let snakeBody = snake.head.y;
    if (snakeHead == snake.body[index].x) {
      if (snakeBody == snake.body[index].y) {
        alert("Game Over");
        return stopGame();
      }
    }
  }
}

const isSnakeAtBorder= function(){
  if(snake.head.x >= numberOfCols || snake.head.x < 0){
    return stopGame();
  }
  if (snake.head.y < 0 || snake.head.y >= numberOfRows) {
    return stopGame();
  }
}

const stopGame = function(){
  location.reload();
}
window.onload=startGame;
