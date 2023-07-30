function closeEmptyFieldErrorMessage() {
  backdropOverlayElement.style.display = "none";
  emptyFieldErrorElement.style.display = "none"
}


function updatePlayerName() {
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function resetGameStatus() {
  activePlayer = 0;
  currentRound = 0;
  gameIsOver = false;

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameField.children[gameBoardIndex];
      gameBoardItemElement.textContent = "";
      gameBoardItemElement.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
  
  gameOverElement.firstElementChild.innerHTML =
    'You won <span id="winner-name">PLAYER NAME</span>!';
  gameOverElement.style.display = "none";
  turnIndicatorElement.style.display = "block"
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    namingErrorElement.style.display = "block";
    backdropOverlayElement.style.display = "block";
    // alert("Please set player names for both players!");
    return;
  }

  resetGameStatus();
  updatePlayerName();

  gameAreaElement.style.display = "block";

}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }

  updatePlayerName();
}

function selectGameField(event) {
  const selectedFieldElement = event.target;

  if (selectedFieldElement.tagName !== "LI" || gameIsOver) {
    return;
  }
  const selectedRow = selectedFieldElement.dataset.row - 1;
  const selectedColumn = selectedFieldElement.dataset.col - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    emptyFieldErrorElement.style.display = "block";
    backdropOverlayElement.style.display = "block";
    return;
  }

  selectedFieldElement.textContent = players[activePlayer].symbol;
  selectedFieldElement.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  currentRound++;

  const winnerId = checkForGameOver();

  if (winnerId !== 0) {
    endGame(winnerId);
    return;
  }

  switchPlayer();
  
}

function checkForGameOver() {
  // CHECKING ROWS FOR EQUALITY
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  // CHECKING COLUMNS FOR EQUALITY
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  // TOP LEFT TO BOTTOM RIGHT DIAGONAL
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  // BOTTOM LEFT TO TOP RIGHT DIAGONAL
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  if (currentRound === 9) {
    return -1;
  }

  return 0;
}

function endGame(winnerId) {
  gameIsOver = true;

  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
  } else {
    gameOverElement.firstElementChild.innerHTML = "It's a draw!";
  }

  turnIndicatorElement.style.display = "none";
  gameOverElement.style.display = "block"

}

