const game = (function () {
  const gameBoard = (() => {
    const square = Array.from(document.querySelectorAll(`.square`));
    const winner = document.querySelector(`.winner`);
    const board = [``, ``, ``, ``, ``, ``, ``, ``, ``];
    return { board, square, winner };
  })();

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

  const newTwoPlayerGameButton = document.querySelector(`.new-button`);
  newTwoPlayerGameButton.addEventListener(`click`, newTwoPlayerGame);

  function playerClick(element) {
    if (gameBoard.board[`${element.target.dataset.squareID}`]) return;
    if (checkWinner()) return;
    if (checkFullBoard()) return;
    gameBoard.board[`${element.target.dataset.squareID}`] = currentPlayer.sign;
    display();
    if (checkWinner()) {
      gameBoard.winner.textContent = `The Winner is: ${checkWinner()}`;
      return;
    }
    if (checkFullBoard()) {
      gameBoard.winner.textContent = `It's a draw !`;
      return;
    }
    changePlayer();
  }

  function newTwoPlayerGame() {
    gameBoard.square.forEach((element) => {
      element.classList.remove(`winning-square`);
    });
    gameBoard.board = [``, ``, ``, ``, ``, ``, ``, ``, ``];
    display();
    currentPlayer = playerOne;
    gameBoard.winner.textContent = "Who will win ?";
    gameBoard.square.forEach((element, index) => {
      element.dataset.squareID = `${index}`;
      element.addEventListener(`click`, playerClick);
    });
  }

  const playerOneName = document.querySelector(`.player-one>input`);
  const playerTwoName = document.querySelector(`.player-two>input`);

  const playerOne = playerFactory(playerOneName.value, "X");
  const playerTwo = playerFactory(playerTwoName.value, "O");

  newTwoPlayerGame();
})();
