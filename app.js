const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')

let result = 0
let hitPosition
let currentTime = 60
let timerId = null

window.addEventListener("keyup", ev => {
  if (ev.key === 38) {
    startGame()
  }
});

function endGame(){
  document.getElementById("startScreen").style.display = "block";
  document.getElementById("game").style.display = "none";
}

function startGame() {
  result = 0;
  currentTime = 60;
  timeLeft.textContent = currentTime;
  score.textContent = result;

  document.getElementById("startScreen").style.display = "none";
  document.getElementById("game").style.display = "block";

  function randomSquare() {
    squares.forEach(square => {
      square.classList.remove('mole');
      square.classList.remove('hit');
    });

    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('mole');

    hitPosition = randomSquare.id;
  }

  squares.forEach(square => {
    square.addEventListener('mousedown', () => {
      if (square.id == hitPosition) {
        result++;
        score.textContent = result;
        hitPosition = null;
        square.classList.add('hit')
        square.classList.remove('mole')
        var audio = new Audio("whack.mp3");
        audio.play();
      }
    });
  });

  function moveMole() {
    timerId = setInterval(randomSquare, 500);
  }

  moveMole();

  function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime == 0) {
      clearInterval(countDownTimerId);
      clearInterval(timerId);
      alert('GAME OVER! Your final score is ' + result);
      endGame();
    }
  }

  let countDownTimerId = setInterval(countDown, 1000);
}
