const game = (function () {
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

    gameBoard.square.forEach((element) => {
      element.classList.remove(`winning-square`);
    });
    gameBoard.board = [``, ``, ``, ``, ``, ``, ``, ``, ``];
    display();
    currentPlayer = playerOne;
    gameBoard.winner.textContent = `${currentPlayer.name}'s Turn to Play`;
  }

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

  const swapPlayersButton = document.querySelector(`.swap-players`);
  swapPlayersButton.addEventListener(`click`, () => {
    let tempNameOne = playerOne.name;
    let tempInputNameOne = playerOneName.value;

    playerOneName.value = playerTwoName.value;
    playerOne.name = playerTwo.name;

    playerTwoName.value = tempInputNameOne;
    playerTwo.name = tempNameOne;

    newTwoPlayerGame();
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
    gameBoard.winner.textContent = `${currentPlayer.name}'s Turn to Play`;
  }

  function newTwoPlayerGame() {
    gameBoard.square.forEach((element) => {
      element.classList.remove(`winning-square`);
    });
    gameBoard.board = [``, ``, ``, ``, ``, ``, ``, ``, ``];
    display();
    currentPlayer = playerOne;
    gameBoard.winner.textContent = `${currentPlayer.name}'s Turn to Play`;
  }

  function newPlayerVsAIGame() {
    gameBoard.square.forEach((element) => {
      element.classList.remove(`winning-square`);
    });
    gameBoard.board = [``, ``, ``, ``, ``, ``, ``, ``, ``];
    display();
    currentPlayer = playerOne;
    gameBoard.winner.textContent = `${currentPlayer.name}'s Turn to Play`;
  }

  gameStart();
})();
