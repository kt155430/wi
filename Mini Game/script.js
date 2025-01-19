const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box,
};
let direction = null;
let score = 0;
let lives = 3; // Lebenssystem
let speed = 100;
let game;

// Vokabeln-Liste
const vocabList = [
    { english: "Sustainable", german: ["Nachhaltig", "Dauerhaft"] },
    { english: "Disposable", german: ["Wegwerfbar", "Einweg"] },
    { english: "Illustrate", german: ["Veranschaulichen", "Illustrieren"] },
    { english: "Emphasize", german: ["Betonen", "Hervorheben"] },
    { english: "Occasionally", german: ["gelegentlich"] },
    { english: "Decade", german: ["Jahrzehnt"] }
];

let currentVocab = null;

const vocabOverlay = document.getElementById("vocabOverlay");
const vocabQuestion = document.getElementById("vocabQuestion");
const vocabAnswer = document.getElementById("vocabAnswer");
const restartOverlay = document.getElementById("restartOverlay");

function setDirection(event) {
    if (event.keyCode === 37 && direction !== "RIGHT") direction = "LEFT";
    else if (event.keyCode === 38 && direction !== "DOWN") direction = "UP";
    else if (event.keyCode === 39 && direction !== "LEFT") direction = "RIGHT";
    else if (event.keyCode === 40 && direction !== "UP") direction = "DOWN";
}

document.addEventListener("keydown", setDirection);

function draw() {
    if (vocabOverlay.classList.contains("hidden")) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = i === 0 ? "green" : "black";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }
        ctx.fillStyle = "red";
        ctx.fillRect(food.x, food.y, box, box);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction === "LEFT") snakeX -= box;
        if (direction === "UP") snakeY -= box;
        if (direction === "RIGHT") snakeX += box;
        if (direction === "DOWN") snakeY += box;

        if (snakeX === food.x && snakeY === food.y) {
            score++;
            speed = Math.max(50, speed - 5);
            currentVocab = vocabList[Math.floor(Math.random() * vocabList.length)];
            vocabQuestion.textContent = `Was heißt "${currentVocab.english}" auf Deutsch?`;
            vocabOverlay.classList.remove("hidden");

            food = {
                x: Math.floor(Math.random() * 19 + 1) * box,
                y: Math.floor(Math.random() * 19 + 1) * box,
            };
        } else snake.pop();

        let newHead = { x: snakeX, y: snakeY };

        if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
            lives--;
            if (lives === 0) {
                clearInterval(game);
                restartOverlay.classList.remove("hidden");
                return;
            }
            snake = [{ x: 9 * box, y: 10 * box }];
            direction = null;
        }

        snake.unshift(newHead);
    }
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) return true;
    }
    return false;
}

function checkAnswer() {
    const userAnswer = vocabAnswer.value.trim().toLowerCase();
    const possibleAnswers = currentVocab.german.map(ans => ans.toLowerCase());

    if (possibleAnswers.includes(userAnswer)) vocabOverlay.classList.add("hidden");
    else {
        lives--;
        vocabOverlay.classList.add("hidden");
        if (lives === 0) clearInterval(game);
    }
}

function restartGame() {
    snake = [{ x: 9 * box, y: 10 * box }];
    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box,
    };
    direction = null;
    score = 0;
    lives = 3;
    speed = 100;
    vocabOverlay.classList.add("hidden");
    restartOverlay.classList.add("hidden");
    clearInterval(game);
    game = setInterval(draw, speed);
}

game = setInterval(draw, speed);
