import * as SETTINGS from "./settings.js";
import * as utils from "./utils.js"
import {Field} from "./Field.js"

let username = localStorage.getItem("tetris.username");

if(username === null){
    window.location.replace("https://localhost/auth");
}

const usernameLabel = document.getElementById('usernameLabel');
usernameLabel.innerHTML = username


function updateScoreLabel(){
    const scoreLabel = document.getElementById('scoreLabel');
    scoreLabel.innerHTML = score
    const levelLabel = document.getElementById('levelLabel');
    levelLabel.innerHTML = level
}


function updateRecord(){
    let leaderboard = new Map(JSON.parse(localStorage["tetris.leaderboard"]));
    let prevRecord = 0;
    if(leaderboard.has(username)) prevRecord = Number(leaderboard.get(username));
    leaderboard.set(username, Math.max(prevRecord, score));
    localStorage.setItem("tetris.leaderboard", JSON.stringify(Array.from(leaderboard.entries())));
}


if (localStorage.getItem("tetris.leaderboard") === null) {
    localStorage.setItem("tetris.leaderboard", JSON.stringify(Array.from((new Map()).entries())));
}


let canvas = document.getElementById('gameCanvas');
canvas.setAttribute("width", SETTINGS.SQUARE_SIZE * SETTINGS.COLS);
canvas.setAttribute("height", SETTINGS.SQUARE_SIZE * SETTINGS.ROWS);
const context = canvas.getContext('2d');
let nextFigureCanvas = document.getElementById('nextFigureCanvas');
nextFigureCanvas.setAttribute("width", SETTINGS.SQUARE_SIZE * 6);
nextFigureCanvas.setAttribute("height", SETTINGS.SQUARE_SIZE * 4);
const nextFigureContext = nextFigureCanvas.getContext('2d');
var figureSequence = [];
let field = new Field(SETTINGS.COLS, SETTINGS.ROWS);
let framesCount = 0;
let figure = getNextFigure();
let nextFigure = getNextFigure();
let rAF = null;  
let gameOver = false;
let score = 0;
let level = 0;
let speed = SETTINGS.LEVELS[level]["speed"];


function generateSequence() {
    const sequence = Object.keys(SETTINGS.FIGURES);
    while (sequence.length) {
        const rand = utils.getRandomInt(0, sequence.length - 1);
        const name = sequence.splice(rand, 1)[0];
        figureSequence.push(name);
    }
}


function getNextFigure() {
    if (figureSequence.length === 0) {
        generateSequence();
    }
    const name = figureSequence.pop();
    const matrix = SETTINGS.FIGURES[name];
    const col = SETTINGS.COLS / 2 - Math.ceil(matrix[0].length / 2);
    const row = name === 'I' ? -1 : -2;
    return {
        name: name,
        matrix: matrix,
        row: row,
        col: col
    };
}


function drawNextFigure(){
    nextFigureContext.clearRect(0,0,nextFigureCanvas.width,nextFigureCanvas.height);
    for (let row = 0; row < nextFigure.matrix.length; row++) {
        for (let col = 0; col < nextFigure.matrix[row].length; col++) {
            if (nextFigure.matrix[row][col]) {
                nextFigureContext.fillStyle = SETTINGS.COLORS[nextFigure.name];
                nextFigureContext.fillRect((col + 1) * SETTINGS.SQUARE_SIZE, (row + 1) * SETTINGS.SQUARE_SIZE, SETTINGS.SQUARE_SIZE-1, SETTINGS.SQUARE_SIZE-1);
            }
        } 
    }
}

function showGameOver() {
    cancelAnimationFrame(rAF);
    gameOver = true;
    context.fillStyle = 'black';
    context.globalAlpha = 0.75;
    context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
    context.globalAlpha = 1;
    context.fillStyle = 'white';
    context.font = '36px monospace';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
}


function drawField(){
    for (let row = 0; row < SETTINGS.ROWS; row++) {
        for (let col = 0; col < SETTINGS.COLS; col++) {
            if (field.get(row, col)) {
            const name = field.get(row, col);
            context.fillStyle = SETTINGS.COLORS[name];
            context.fillRect(col * SETTINGS.SQUARE_SIZE, row * SETTINGS.SQUARE_SIZE, SETTINGS.SQUARE_SIZE-1, SETTINGS.SQUARE_SIZE-1);
            }
        }
    }
}


function drawFigure(){
    context.fillStyle = SETTINGS.COLORS[figure.name];
    for (let row = 0; row < figure.matrix.length; row++) {
        for (let col = 0; col < figure.matrix[row].length; col++) {
            if (figure.matrix[row][col]) {
                context.fillRect((figure.col + col) * SETTINGS.SQUARE_SIZE, (figure.row + row) * SETTINGS.SQUARE_SIZE, SETTINGS.SQUARE_SIZE-1, SETTINGS.SQUARE_SIZE-1);
            }
        }
    }
}


function placeFigure(){
    let clearedRows = field.placeFigure(figure);
    if(clearedRows == -1){
        updateRecord();
        showGameOver();
        return;
    }
    score += SETTINGS.SCORING[clearedRows];
    while(level + 1 < SETTINGS.LEVELS.length){
        if(score >= SETTINGS.LEVELS[level + 1]["score"]){
            speed = SETTINGS.LEVELS[level++]["speed"];
        }else break;
    }
    updateScoreLabel();
    figure = nextFigure;
    nextFigure = getNextFigure();
    drawNextFigure();
}


function loop() {
    rAF = requestAnimationFrame(loop);
    context.clearRect(0,0,canvas.width,canvas.height);
    drawField();
    // фигура сдвигается вниз каждые speed кадров
    if (++framesCount > speed) {
        figure.row++;
        framesCount = 0;
        if (!field.checkCollision(figure)) {
            figure.row--;
            placeFigure();
        }
    }
    drawFigure();
}

document.addEventListener('keydown', function(e) {
    if (gameOver) return;
    switch(e.key){
        case "ArrowLeft":
            figure.col--;
            if(!field.checkCollision(figure)) figure.col++;
            break;
        case "ArrowRight":
            figure.col++;
            if(!field.checkCollision(figure)) figure.col--;
            break;
        case "ArrowUp":
            const prevMatrix = figure.matrix;
            figure.matrix = utils.rotate(figure.matrix);
            if (!field.checkCollision(figure)) figure.matrix = prevMatrix;
            break;
        case "ArrowDown":
            figure.row++;
            if (!field.checkCollision(figure)) {
                figure.row--;
                placeFigure();
            }
    }
});

drawNextFigure();
rAF = requestAnimationFrame(loop);