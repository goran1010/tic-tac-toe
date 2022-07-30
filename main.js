const gameBoard = (() => {
  const square = Array.from(document.querySelectorAll(`.container>div`));
  const winner = document.querySelector(`.winner`);
  const board = [``, ``, ``, ``, ``, ``, ``, ``, ``];
  return { board, square, winner };
})();

const game = (function () {
  function display() {
    gameBoard.square.forEach((element, index) => {
      element.textContent = gameBoard.board[index];
    });
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
      (gameBoard.board[0], gameBoard.board[1], gameBoard.board[2]) != `` &&
      gameBoard.board[0] == gameBoard.board[1] &&
      gameBoard.board[1] == gameBoard.board[2]
    ) {
      if (gameBoard.board[0] == playerOne.sign) return playerOne.name;
      return playerTwo.name;
    }
    if (
      (gameBoard.board[3], gameBoard.board[4], gameBoard.board[5]) != `` &&
      gameBoard.board[3] == gameBoard.board[4] &&
      gameBoard.board[4] == gameBoard.board[5]
    ) {
      if (gameBoard.board[3] == playerOne.sign) return playerOne.name;
      return playerTwo.name;
    }
    if (
      (gameBoard.board[6], gameBoard.board[7], gameBoard.board[8]) != `` &&
      gameBoard.board[6] == gameBoard.board[7] &&
      gameBoard.board[7] == gameBoard.board[8]
    ) {
      if (gameBoard.board[6] == playerOne.sign) return playerOne.name;
      return playerTwo.name;
    }
    if (
      (gameBoard.board[0], gameBoard.board[3], gameBoard.board[6]) != `` &&
      gameBoard.board[0] == gameBoard.board[3] &&
      gameBoard.board[3] == gameBoard.board[6]
    ) {
      if (gameBoard.board[0] == playerOne.sign) return playerOne.name;
      return playerTwo.name;
    }
    if (
      (gameBoard.board[1], gameBoard.board[4], gameBoard.board[7]) != `` &&
      gameBoard.board[1] == gameBoard.board[4] &&
      gameBoard.board[4] == gameBoard.board[7]
    ) {
      if (gameBoard.board[1] == playerOne.sign) return playerOne.name;
      return playerTwo.name;
    }
    if (
      (gameBoard.board[2], gameBoard.board[5], gameBoard.board[8]) != `` &&
      gameBoard.board[2] == gameBoard.board[5] &&
      gameBoard.board[5] == gameBoard.board[8]
    ) {
      if (gameBoard.board[2] == playerOne.sign) return playerOne.name;
      return playerTwo.name;
    }
    if (
      (gameBoard.board[0], gameBoard.board[4], gameBoard.board[8]) != `` &&
      gameBoard.board[0] == gameBoard.board[4] &&
      gameBoard.board[4] == gameBoard.board[8]
    ) {
      if (gameBoard.board[0] == playerOne.sign) return playerOne.name;
      return playerTwo.name;
    }
    if (
      (gameBoard.board[2], gameBoard.board[4], gameBoard.board[6]) != `` &&
      gameBoard.board[2] == gameBoard.board[4] &&
      gameBoard.board[4] == gameBoard.board[6]
    ) {
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

  const newGameButton = document.querySelector(`.new-button`);
  newGameButton.addEventListener(`click`, newGame);

  function newGame() {
    gameBoard.board = [``, ``, ``, ``, ``, ``, ``, ``, ``];
    display();
    currentPlayer = playerOne;
    gameBoard.winner.textContent = "Ko ce pobediti?";
    gameBoard.square.forEach((element, index) => {
      element.classList.add(`${index}`);
      element.addEventListener(`click`, () => {
        if (gameBoard.board[`${element.className}`]) return;
        if (checkWinner()) return;
        if (checkFullBoard()) return;
        gameBoard.board[`${element.className}`] = currentPlayer.sign;
        display();

        if (checkWinner()) {
          gameBoard.winner.textContent = `Pobjednik je ${checkWinner()}`;
        }
        if (checkFullBoard()) {
          gameBoard.winner.textContent = `Nereseno`;
        }
        changePlayer();
      });
    });
  }

  const playerOneName = document.querySelector(`.player-one>input`);
  const playerTwoName = document.querySelector(`.player-two>input`);

  const playerOne = playerFactory(playerOneName.value, "X");
  const playerTwo = playerFactory(playerTwoName.value, "O");

  newGame();
})();
