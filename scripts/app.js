let gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

const players = [
    { 
        name: "", 
        symbol: "X" 
    }, 
    {
        name: "",
        symbol: "O"
    }
];

let currentTheme = 1
let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 0;
let gameIsOver = false;

const toggleThemeBtnElement = document.getElementById("toggle-button");
const mainHeaderElement = document.getElementById("main-header");
const bodyElement = document.querySelector("body");;
const gameConfigListItems = document.querySelectorAll("#game-config li");
const h3ConfigElements = document.querySelectorAll("#game-config h3");

const editPlayer1BtnElement = document.getElementById("edit-player-1-btn");
const editPlayer2BtnElement = document.getElementById("edit-player-2-btn");
const namingErrorBtnElement = document.getElementById("error-btn");
const cancelFormBtnElement = document.getElementById("cancel-config-btn");
const startNewGameBtnElement = document.getElementById("start-game-btn");
const emptyFieldErrorBtnElement = document.getElementById("field-empty-btn");
const submitBtnElement = document.getElementById("submit-config-btn");

const currentThemeDisplayName = document.getElementById("current-theme-name");
const namingErrorElement = document.getElementById("naming-error");
const emptyFieldErrorElement = document.getElementById("empty-field-error");
const configOverlayElement = document.getElementById("config-overlay");
const backdropOverlayElement = document.getElementById("backdrop");
const formElement = document.querySelector("form");
const errorsOutputElement = document.getElementById("config-errors");
const playerNameElement = document.getElementById("player-" + editedPlayer + "-data");
const gameAreaElement = document.getElementById("active-game");
const activePlayerNameElement = document.getElementById("active-player-name");
const gameField = document.getElementById("game-board");
const gameOverElement = document.getElementById("game-over");
const turnIndicatorElement = document.getElementById("turn-wrapper");
const gameFieldIndividualSquares = document.querySelectorAll("#game-board li");

toggleThemeBtnElement.addEventListener("click", switchTheme);
namingErrorBtnElement.addEventListener("click", closeErrorMessage);
emptyFieldErrorBtnElement.addEventListener("click", closeEmptyFieldErrorMessage);
editPlayer1BtnElement.addEventListener("click", openPlayerConfig);
editPlayer2BtnElement.addEventListener("click", openPlayerConfig);
cancelFormBtnElement.addEventListener("click", closePlayerConfig);
backdropOverlayElement.addEventListener("click", closePlayerConfig);
formElement.addEventListener("submit", savePlayerConfig);
startNewGameBtnElement.addEventListener("click", startNewGame);

gameField.addEventListener("click", selectGameField);

const themeElements = [bodyElement, mainHeaderElement, toggleThemeBtnElement, backdropOverlayElement, namingErrorElement, emptyFieldErrorElement, configOverlayElement, gameOverElement, activePlayerNameElement];
const buttons = [namingErrorBtnElement, emptyFieldErrorBtnElement, submitBtnElement, startNewGameBtnElement];
const altButtons = [cancelFormBtnElement, editPlayer1BtnElement, editPlayer2BtnElement];

const themeComponentsByGroup = [themeElements, buttons, h3ConfigElements, gameConfigListItems];