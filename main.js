const TicTacToe = (function () {
  const gameBoard = (() => {
    const square = Array.from(document.querySelectorAll(`.square`));
    const winner = document.querySelector(`.winner`);
    const board = [``, ``, ``, ``, ``, ``, ``, ``, ``];
    return { board, square, winner };
  })();

  function gameStart() {
    gameBoard.square.forEach((element, index) => {
      element.dataset.squareID = `${index}`;
      element.addEventListener(`click`, playerClick);
    });

    const nameChangeListener = Array.from(document.querySelectorAll(`input`));
    nameChangeListener.forEach((element) => {
      element.addEventListener(`keyup`, () => {
        displayNames();
        displayBoard(currentPlayer);
      });
    });

    gameBoard.square.forEach((element) => {
      element.classList.remove(`winning-square`);
    });
    gameBoard.board = [``, ``, ``, ``, ``, ``, ``, ``, ``];

    displayNames();
    currentPlayer = playerOne;
    displayBoard(currentPlayer);

    playerOneName.dataset.AI = "NotAI";
    playerTwoName.dataset.AI = "NotAI";
  }

  function getAIChoice() {
    if (checkWinner()) return;
    if (checkFullBoard()) return;

    let emptyBoard = [];

    gameBoard.board.forEach((element, index) => {
      if (element === ``) {
        emptyBoard.push(index);
      }
    });

    function AIChoiceIndex(emptyBoard) {
      return emptyBoard[Math.floor(Math.random() * emptyBoard.length)];
    }

    if (playerOneName.dataset.AI == `IsAI`) {
      gameBoard.board[AIChoiceIndex(emptyBoard)] = `X`;
    } else {
      gameBoard.board[AIChoiceIndex(emptyBoard)] = `O`;
    }

    displayBoard(currentPlayer);

    if (checkWinner()) {
      gameBoard.winner.textContent = `The Winner is: ${checkWinner()}`;
      return;
    }
    if (checkFullBoard()) {
      gameBoard.winner.textContent = `It's a draw !`;
      return;
    }
    changePlayer();
    displayBoard(currentPlayer);
  }

  function displayBoard(currentPlayer) {
    gameBoard.square.forEach((element, index) => {
      element.textContent = gameBoard.board[index];
    });

    gameBoard.winner.textContent = `${currentPlayer.name}'s Turn to Play`;
  }

  const playerFactory = (name, sign) => {
    return { name, sign };
  };

  function changePlayer() {
    if (currentPlayer == playerOne) {
      currentPlayer = playerTwo;
    } else currentPlayer = playerOne;
  }

  function checkWinner() {
    if (
      gameBoard.board[0] != `` &&
      gameBoard.board[0] == gameBoard.board[1] &&
      gameBoard.board[1] == gameBoard.board[2]
    ) {
      gameBoard.square[0].classList.add(`winning-square`);
      gameBoard.square[1].classList.add(`winning-square`);
      gameBoard.square[2].classList.add(`winning-square`);
      if (gameBoard.board[0] == playerOne.sign) return playerOne.name;
      return playerTwo.name;
    }
    if (
      gameBoard.board[3] != `` &&
      gameBoard.board[3] == gameBoard.board[4] &&
      gameBoard.board[4] == gameBoard.board[5]
    ) {
      gameBoard.square[3].classList.add(`winning-square`);
      gameBoard.square[4].classList.add(`winning-square`);
      gameBoard.square[5].classList.add(`winning-square`);
      if (gameBoard.board[3] == playerOne.sign) return playerOne.name;
      return playerTwo.name;
    }
    if (
      gameBoard.board[6] != `` &&
      gameBoard.board[6] == gameBoard.board[7] &&
      gameBoard.board[7] == gameBoard.board[8]
    ) {
      gameBoard.square[6].classList.add(`winning-square`);
      gameBoard.square[7].classList.add(`winning-square`);
      gameBoard.square[8].classList.add(`winning-square`);
      if (gameBoard.board[6] == playerOne.sign) return playerOne.name;
      return playerTwo.name;
    }
    if (
      gameBoard.board[0] != `` &&
      gameBoard.board[0] == gameBoard.board[3] &&
      gameBoard.board[3] == gameBoard.board[6]
    ) {
      gameBoard.square[0].classList.add(`winning-square`);
      gameBoard.square[3].classList.add(`winning-square`);
      gameBoard.square[6].classList.add(`winning-square`);
      if (gameBoard.board[0] == playerOne.sign) return playerOne.name;
      return playerTwo.name;
    }
    if (
      gameBoard.board[1] != `` &&
      gameBoard.board[1] == gameBoard.board[4] &&
      gameBoard.board[4] == gameBoard.board[7]
    ) {
      gameBoard.square[1].classList.add(`winning-square`);
      gameBoard.square[4].classList.add(`winning-square`);
      gameBoard.square[7].classList.add(`winning-square`);
      if (gameBoard.board[1] == playerOne.sign) return playerOne.name;
      return playerTwo.name;
    }
    if (
      gameBoard.board[2] != `` &&
      gameBoard.board[2] == gameBoard.board[5] &&
      gameBoard.board[5] == gameBoard.board[8]
    ) {
      gameBoard.square[2].classList.add(`winning-square`);
      gameBoard.square[5].classList.add(`winning-square`);
      gameBoard.square[8].classList.add(`winning-square`);
      if (gameBoard.board[2] == playerOne.sign) return playerOne.name;
      return playerTwo.name;
    }
    if (
      gameBoard.board[0] != `` &&
      gameBoard.board[0] == gameBoard.board[4] &&
      gameBoard.board[4] == gameBoard.board[8]
    ) {
      gameBoard.square[0].classList.add(`winning-square`);
      gameBoard.square[4].classList.add(`winning-square`);
      gameBoard.square[8].classList.add(`winning-square`);
      if (gameBoard.board[0] == playerOne.sign) return playerOne.name;
      return playerTwo.name;
    }
    if (
      gameBoard.board[2] != `` &&
      gameBoard.board[2] == gameBoard.board[4] &&
      gameBoard.board[4] == gameBoard.board[6]
    ) {
      gameBoard.square[2].classList.add(`winning-square`);
      gameBoard.square[4].classList.add(`winning-square`);
      gameBoard.square[6].classList.add(`winning-square`);
      if (gameBoard.board[2] == playerOne.sign) return playerOne.name;
      return playerTwo.name;
    }
  }

  function checkFullBoard() {
    let hasEmpty = false;
    gameBoard.board.forEach((element) => {
      if (element == ``) hasEmpty = true;
    });
    if (hasEmpty) return false;
    return true;
  }

  const swapPlayersButton = document.querySelector(`.swap-players`);
  swapPlayersButton.addEventListener(`click`, () => {
    let tempInputNameOne = playerOneName.value;
    playerOneName.value = playerTwoName.value;
    playerTwoName.value = tempInputNameOne;

    if (playerOneName.dataset.AI === "IsAI") {
      playerTwoName.dataset.AI = "IsAI";
      playerOneName.dataset.AI = "NotAI";
    } else if (playerTwoName.dataset.AI === "IsAI") {
      playerTwoName.dataset.AI = "NotAI";
      playerOneName.dataset.AI = "IsAI";
    }

    displayNames();

    gameBoard.square.forEach((element) => {
      element.classList.remove(`winning-square`);
    });
    gameBoard.board = [``, ``, ``, ``, ``, ``, ``, ``, ``];

    if (playerOneName.dataset.AI === "IsAI") {
      getAIChoice();
    } else {
      currentPlayer = playerOne;
      displayBoard(currentPlayer);
    }
  });

  let playerOneName = document.querySelector(`.player-one>input`);
  let playerTwoName = document.querySelector(`.player-two>input`);

  let playerOne = playerFactory(playerOneName.value, "X");
  let playerTwo = playerFactory(playerTwoName.value, "O");

  const newTwoPlayerGameButton = document.querySelector(`.new-button`);
  newTwoPlayerGameButton.addEventListener(`click`, newTwoPlayerGame);

  const newPlayerVsAIGameButton = document.querySelector(`.new-ai-button`);
  newPlayerVsAIGameButton.addEventListener(`click`, newPlayerVsAIGame);

  function playerClick(element) {
    if (gameBoard.board[`${element.target.dataset.squareID}`]) return;
    if (checkWinner()) return;
    if (checkFullBoard()) return;

    if (playerOneName.dataset.AI == "IsAI") {
      currentPlayer.sign = "O";
    }
    if (playerTwoName.dataset.AI == "IsAI") {
      currentPlayer.sign = "X";
    }

    gameBoard.board[`${element.target.dataset.squareID}`] = currentPlayer.sign;

    if (
      playerOneName.dataset.AI === "IsAI" ||
      playerTwoName.dataset.AI === "IsAI"
    ) {
      setTimeout(getAIChoice, Math.random() * 300 + 50);
    }

    displayBoard(currentPlayer);

    if (checkWinner()) {
      gameBoard.winner.textContent = `The Winner is: ${checkWinner()}`;
      return;
    }
    if (checkFullBoard()) {
      gameBoard.winner.textContent = `It's a draw !`;
      return;
    }
    changePlayer();
    displayBoard(currentPlayer);
  }

  function displayNames() {
    if (playerOneName.value) playerOne.name = playerOneName.value;
    else playerOne.name = "Player One";

    if (playerTwoName.value) playerTwo.name = playerTwoName.value;
    else playerTwo.name = "Player Two";
  }

  function newTwoPlayerGame() {
    if (playerOneName.dataset.AI === "IsAI") {
      playerOneName.value = ``;
    }
    if (playerTwoName.dataset.AI === "IsAI") {
      playerTwoName.value = ``;
    }

    playerOneName.dataset.AI = "NotAI";
    playerTwoName.dataset.AI = "NotAI";

    displayNames();
    gameBoard.square.forEach((element) => {
      element.classList.remove(`winning-square`);
    });
    gameBoard.board = [``, ``, ``, ``, ``, ``, ``, ``, ``];

    currentPlayer = playerOne;
    currentPlayer.sign = "X";

    displayBoard(currentPlayer);
  }

  function newPlayerVsAIGame() {
    if (
      playerOneName.dataset.AI == "NotAI" &&
      playerTwoName.dataset.AI == "NotAI"
    ) {
      playerTwoName.value = "AI Player";
      playerTwoName.dataset.AI = "IsAI";
    }

    displayNames();
    gameBoard.square.forEach((element) => {
      element.classList.remove(`winning-square`);
    });
    gameBoard.board = [``, ``, ``, ``, ``, ``, ``, ``, ``];

    if (playerOneName.dataset.AI === "IsAI") {
      getAIChoice();

      currentPlayer = playerTwo;
    } else {
      currentPlayer = playerOne;
    }
    displayBoard(currentPlayer);
  }

  gameStart();
})();
