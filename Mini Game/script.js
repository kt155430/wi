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
let lives = 3; // Hinzugefügt: Lebenssystem
let speed = 100; // Initialgeschwindigkeit
let game; // Spielintervall

// Vokabeln-Liste
const vocabList = [
    { english: "Sustainable", german: ["Nachhaltig", "Dauerhaft"] },
    { english: "Disposable", german: ["Wegwerfbar", "Einweg"] },
    { english: "Illustrate", german: ["Veranschaulichen", "Illustrieren", "Darstellen"] },
    { english: "Emphasize", german: ["Betonen", "Hervorheben", "Unterstreichen"] },
    { english: "Occasionally", german: ["hin und wieder", "gelegentlich"] },
    { english: "Decade", german: ["Jahrzehnt"] },
    { english: "aisle", german: ["Gang"] },
    { english: "Column", german: ["Spalte"] },
    { english: "increase", german: ["erhöhen", "ansteigen", "steigen"] },
    { english: "delay", german: ["verschieben", "Verspätung"] },
    { english: "refund", german: ["Rückerstattung"] },
    { english: "tax", german: ["Steuer"] },
    { english: "interest", german: ["Zins", "Zinsen"] },
    { english: "mortgage", german: ["Hypothek"] },
    { english: "loan", german: ["Darlehen", "Kredit", "Anleihe"] }
];

let currentVocab = null;

// Elemente für die Vokabelabfrage
const vocabOverlay = document.getElementById("vocabOverlay");
const vocabQuestion = document.getElementById("vocabQuestion");
const vocabAnswer = document.getElementById("vocabAnswer");

// Hinzugefügt: Pop-up-Feedback
const feedbackElement = document.createElement("div");
feedbackElement.classList.add("feedback");
document.body.appendChild(feedbackElement);

function showFeedback(message, success = true) {
    feedbackElement.textContent = message;
    feedbackElement.style.backgroundColor = success ? "green" : "red";
    feedbackElement.style.display = "block";
    setTimeout(() => (feedbackElement.style.display = "none"), 2000);
}

// Steuerung
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

        // Score und Leben anzeigen
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 10, 20);
        ctx.fillText("Lives: " + lives, 10, 40);

        // Schlange zeichnen
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = i === 0 ? "green" : "black";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }

        // Frucht zeichnen
        ctx.fillStyle = "red";
        ctx.fillRect(food.x, food.y, box, box);

        // Bewegung
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction === "LEFT") snakeX -= box;
        if (direction === "UP") snakeY -= box;
        if (direction === "RIGHT") snakeX += box;
        if (direction === "DOWN") snakeY += box;

        // Frucht essen
        if (snakeX === food.x && snakeY === food.y) {
            score++;
            speed = Math.max(50, speed - 5); // Geschwindigkeit erhöhen
            clearInterval(game);
            game = setInterval(draw, speed);

            // Vokabelabfrage starten
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
            snake.pop();
        }

        // Neue Position
        let newHead = { x: snakeX, y: snakeY };

        // Kollision prüfen
        if (
            snakeX < 0 ||
            snakeY < 0 ||
            snakeX >= canvas.width ||
            snakeY >= canvas.height ||
            collision(newHead, snake)
        ) {
            lives--;
            if (lives === 0) {
                alert("Spiel vorbei!");
                clearInterval(game);
                return;
            }
            snake = [{ x: 9 * box, y: 10 * box }];
            direction = null;
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
    const possibleAnswers = currentVocab.german.map((ans) => ans.toLowerCase());

    if (possibleAnswers.includes(userAnswer)) {
        vocabOverlay.classList.add("hidden");
        showFeedback("Richtig!", true);
    } else {
        showFeedback(
            `Falsch! Richtig wäre: ${currentVocab.german.join(", ")}`,
            false
        );
        lives--;
        if (lives === 0) {
            clearInterval(game);
        }
    }
}

// Spiel starten
game = setInterval(draw, speed);
