const gameArea = document.getElementById("gameArea");
const coin = document.getElementById("coin");
const basket = document.getElementById("basket");

const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const levelDisplay = document.getElementById("level");
const highScoreDisplay = document.getElementById("highScore");

const restartBtn = document.getElementById("restartBtn");
const pauseBtn = document.getElementById("pauseBtn");

let score = 0;
let level = 1;
let time = 30;

let highScore = localStorage.getItem("highScore") || 0;

let coinX = 220;
let coinY = 20;
let basketX = 220;

let gameRunning = true;
let paused = false;

highScoreDisplay.textContent = highScore;

function moveBasket(direction) {
    if (!gameRunning || paused) return;

    basketX += direction * 25;

    if (basketX < 0) {
        basketX = 0;
    }

    if (basketX > 440) {
        basketX = 440;
    }

    basket.style.left = basketX + "px";
}

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
        moveBasket(-1);
    }

    if (event.key === "ArrowRight") {
        moveBasket(1);
    }
});

function moveCoin() {
    if (!gameRunning || paused) return;

    coinY += 5 + (level - 1) * 1;
    coin.style.top = coinY + "px";

    if (
        coinY >= 430 &&
        coinX > basketX - 20 &&
        coinX < basketX + 60
    ) {
        score++;
        scoreDisplay.textContent = score;

        level = Math.floor(score / 5) + 1;
        levelDisplay.textContent = level;

        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            highScoreDisplay.textContent = highScore;
        }

        resetCoin();
    }

    if (coinY > 500) {
        resetCoin();
    }
}

function resetCoin() {
    coinY = 20;
    coinX = Math.floor(Math.random() * 440);

    coin.style.top = coinY + "px";
    coin.style.left = coinX + "px";
}

function startTimer() {
    const timer = setInterval(function() {

        if (!gameRunning) {
            clearInterval(timer);
            return;
        }

        if (paused) {
            return;
        }

        time--;
        timeDisplay.textContent = time;

        if (time <= 0) {
            gameRunning = false;
            clearInterval(timer);

            pauseBtn.disabled = true;

            alert("GAME OVER! Your Score: " + score);
        }

    }, 1000);
}

pauseBtn.addEventListener("click", function() {

    if (!gameRunning) return;

    paused = !paused;

    if (paused) {
        pauseBtn.textContent = "Resume";
    } else {
        pauseBtn.textContent = "Pause";
    }

});

restartBtn.addEventListener("click", function() {
    location.reload();
});

startTimer();

setInterval(moveCoin, 50);