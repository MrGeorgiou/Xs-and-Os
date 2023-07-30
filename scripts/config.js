function updateTheme() {

// for (let themeElement of themeElements) {
//   themeElement.className = "theme-" + currentTheme;
  
// }
// for (let h3ConfigElement of h3ConfigElements) {
//   h3ConfigElement.className = "theme-" + currentTheme;
// }

// for (let gameConfigListItem of gameConfigListItems) {
//   gameConfigListItem.className = "theme-" + currentTheme;
// }

// for (let button of buttons) {
//   button.className = "theme-" + currentTheme;
// }

  for (let altButton of altButtons) {
    altButton.className = "alt-theme-" + currentTheme;
  }

  for (let i = 0; i < 4; i++) {
    for ( let themecomponent of themeComponentsByGroup[i]) {
      themecomponent.className = "theme-" + currentTheme;
    }
  }
 
  for (let gameFieldIndividualSquare of gameFieldIndividualSquares) {
    if (currentTheme === 1) {
      gameFieldIndividualSquare.classList.remove("theme-2");
      gameFieldIndividualSquare.classList.add("theme-" + currentTheme);
    } else {
      gameFieldIndividualSquare.classList.remove("theme-1");
      gameFieldIndividualSquare.classList.add("theme-" + currentTheme);
    }
  }
}

function switchTheme() {
 if (currentTheme === 1) {
    currentTheme++;
 } else {
    currentTheme--;
 }

  updateTheme();
}



function closeErrorMessage() {
  namingErrorElement.style.display = "none";
  backdropOverlayElement.style.display = "none";
}

function openPlayerConfig(event) {
  configOverlayElement.style.display = "block";
  backdropOverlayElement.style.display = "block";
  editedPlayer = +event.target.dataset.playerid;
}

function closePlayerConfig() {
  namingErrorElement.style.display = "none";
  configOverlayElement.style.display = "none";
  backdropOverlayElement.style.display = "none";
  emptyFieldErrorElement.style.display = "none";
  errorsOutputElement.textContent = "";
  formElement.firstElementChild.classList.remove("error");
  formElement.firstElementChild.children[1].value = "";
}

function savePlayerConfig(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const enteredPlayerName = formData.get("playername").trim();

  if (!enteredPlayerName) {
    errorsOutputElement.textContent = "Please enter a valid name!";
    formElement.firstElementChild.classList.add("error");
    return;
  }

  const updatedPlayerDataElement = document.getElementById(
    "player-" + editedPlayer + "-data"
  );
  updatedPlayerDataElement.children[1].textContent = enteredPlayerName;

  players[editedPlayer - 1].name = enteredPlayerName;

  updatePlayerName()

  closePlayerConfig();
}
