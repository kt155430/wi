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

// Vokabeln-Liste
const vocabList = [
    { english: "Sustainable", german: "Nachhaltig" },
    { english: "Disposable", german: "Wegwerfbar" },
    { english: "Illustrate", german: "Veranschaulichen" },
    { english: "Emphasize", german: "Betonen" },
];

let currentVocab = null;

// Elemente für die Vokabelabfrage
const vocabOverlay = document.getElementById("vocabOverlay");
const vocabQuestion = document.getElementById("vocabQuestion");
const vocabAnswer = document.getElementById("vocabAnswer");

document.addEventListener("keydown", setDirection);

function setDirection(event) {
    if (event.keyCode === 37 && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (event.keyCode === 38 && direction !== "DOWN") {
        direction = "UP";
    } else if (event.keyCode === 39 && direction !== "LEFT") {
        direction = "RIGHT";
    } else if (event.keyCode === 40 && direction !== "UP") {
        direction = "DOWN";
    }
}

function draw() {
    if (vocabOverlay.classList.contains("hidden")) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Score anzeigen
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 10, 20);

        // Zeichne die Schlange
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = (i === 0) ? "green" : "black";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }

        // Zeichne die Frucht
        ctx.fillStyle = "red";
        ctx.fillRect(food.x, food.y, box, box);

        // Bewegung der Schlange
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction === "LEFT") snakeX -= box;
        if (direction === "UP") snakeY -= box;
        if (direction === "RIGHT") snakeX += box;
        if (direction === "DOWN") snakeY += box;

        // Überprüfung, ob die Schlange die Frucht isst
        if (snakeX === food.x && snakeY === food.y) {
            score++;

            // Zeige Vokabelabfrage
            currentVocab = vocabList[Math.floor(Math.random() * vocabList.length)];
            vocabQuestion.textContent = `Was heißt "${currentVocab.english}" auf Deutsch?`;
            vocabAnswer.value = "";
            vocabOverlay.classList.remove("hidden");

            // Neue Frucht generieren
            food = {
                x: Math.floor(Math.random() * 19 + 1) * box,
                y: Math.floor(Math.random() * 19 + 1) * box,
            };
        } else {
            snake.pop(); // Entferne das letzte Element, wenn keine Frucht gegessen wurde
        }

        // Neue Position für den Kopf der Schlange
        let newHead = { x: snakeX, y: snakeY };

        // Überprüfe auf Kollision
        if (
            snakeX < 0 || snakeY < 0 ||
            snakeX >= canvas.width || snakeY >= canvas.height ||
            collision(newHead, snake)
        ) {
            alert("Spiel vorbei!");
            clearInterval(game);
            return;
        }

        snake.unshift(newHead);
    }
}

function collision(head, snakeArray) {
    for (let i = 0; i < snakeArray.length; i++) {
        if (head.x === snakeArray[i].x && head.y === snakeArray[i].y) {
            return true;
        }
    }
    return false;
}

function checkAnswer() {
    const userAnswer = vocabAnswer.value.trim().toLowerCase();
    if (userAnswer === currentVocab.german.toLowerCase()) {
        vocabOverlay.classList.add("hidden"); // Verstecke das Overlay
    } else {
        alert("Falsch! Spiel vorbei.");
        clearInterval(game);
    }
}

let game = setInterval(draw, 100);
