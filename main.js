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
    if (currentPlayer == player1) {
      currentPlayer = player2;
    } else currentPlayer = player1;
  }

  function checkWinner() {
    if (
      (gameBoard.board[0], gameBoard.board[1], gameBoard.board[2]) != `` &&
      gameBoard.board[0] == gameBoard.board[1] &&
      gameBoard.board[1] == gameBoard.board[2]
    ) {
      if (gameBoard.board[0] == player1.sign) return player1.name;
      return player2.name;
    }
    if (
      (gameBoard.board[3], gameBoard.board[4], gameBoard.board[5]) != `` &&
      gameBoard.board[3] == gameBoard.board[4] &&
      gameBoard.board[4] == gameBoard.board[5]
    ) {
      if (gameBoard.board[3] == player1.sign) return player1.name;
      return player2.name;
    }
    if (
      (gameBoard.board[6], gameBoard.board[7], gameBoard.board[8]) != `` &&
      gameBoard.board[6] == gameBoard.board[7] &&
      gameBoard.board[7] == gameBoard.board[8]
    ) {
      if (gameBoard.board[6] == player1.sign) return player1.name;
      return player2.name;
    }
    if (
      (gameBoard.board[0], gameBoard.board[3], gameBoard.board[6]) != `` &&
      gameBoard.board[0] == gameBoard.board[3] &&
      gameBoard.board[3] == gameBoard.board[6]
    ) {
      if (gameBoard.board[0] == player1.sign) return player1.name;
      return player2.name;
    }
    if (
      (gameBoard.board[1], gameBoard.board[4], gameBoard.board[7]) != `` &&
      gameBoard.board[1] == gameBoard.board[4] &&
      gameBoard.board[4] == gameBoard.board[7]
    ) {
      if (gameBoard.board[1] == player1.sign) return player1.name;
      return player2.name;
    }
    if (
      (gameBoard.board[2], gameBoard.board[5], gameBoard.board[8]) != `` &&
      gameBoard.board[2] == gameBoard.board[5] &&
      gameBoard.board[5] == gameBoard.board[8]
    ) {
      if (gameBoard.board[2] == player1.sign) return player1.name;
      return player2.name;
    }
    if (
      (gameBoard.board[0], gameBoard.board[4], gameBoard.board[8]) != `` &&
      gameBoard.board[0] == gameBoard.board[4] &&
      gameBoard.board[4] == gameBoard.board[8]
    ) {
      if (gameBoard.board[0] == player1.sign) return player1.name;
      return player2.name;
    }
    if (
      (gameBoard.board[2], gameBoard.board[4], gameBoard.board[6]) != `` &&
      gameBoard.board[2] == gameBoard.board[4] &&
      gameBoard.board[4] == gameBoard.board[6]
    ) {
      if (gameBoard.board[2] == player1.sign) return player1.name;
      return player2.name;
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

  const stopGameButton = document.querySelector(`.stop-button`); //
  stopGameButton.addEventListener(`click`, stopGame); //

  function stopGame() {
    gameBoard.square.forEach((element, index) => {
      element.removeEventListener(`click`, () => {});
    });
  }

  function newGame() {
    gameBoard.board = [``, ``, ``, ``, ``, ``, ``, ``, ``];
    display();
    currentPlayer = player1;
    gameBoard.winner.textContent = "Ko ce pobediti?";
    gameBoard.square.forEach((element, index) => {
      element.classList.add(`${index}`);
      element.addEventListener(`click`, () => {
        if (gameBoard.board[`${element.className}`]) return;
        gameBoard.board[`${element.className}`] = currentPlayer.sign;
        display();

        if (checkWinner()) {
          gameBoard.winner.textContent = `Pobjednik je ${checkWinner()}`;
          stopGame();
        }
        if (checkFullBoard()) {
          gameBoard.winner.textContent = `Nereseno`;
          stopGame();
        }
        changePlayer();
      });
    });
  }
  const player1 = playerFactory("Batman", "X");
  const player2 = playerFactory("Robin", "O");

  let currentPlayer = player1;

  newGame();
})();
