const Gameboard = (() => {
  let _board = ["", "", "", "", "", "", "", "", ""];

  const setBoard = (mark, index) => {
    _board[index] = mark;
  };

  const getBoard = () => _board;
  const resetBoard = () => {
    _board = ["", "", "", "", "", "", "", "", ""];
  };
  return {
    setBoard,
    getBoard,
    resetBoard,
  };
})();

const Player = (mark, name) => {
  let _score = 0;
  const addScore = (point) => (_score += point);
  const getScore = () => _score;
  const resetScore = () => (_score = 0);
  return { mark, name, addScore, getScore, resetScore };
};

const Game = (() => {
  const _player1 = Player("X", "player1");
  const _player2 = Player("O", "player2");
  let _currentPlayer = null || _player1;
  let _gameOver = false;
  let _isTie = false;

  function _checkAllRows(arrays, symbol) {
    for (let array of arrays) {
      const isWinner = array.every((mark) => mark === symbol);
      if (isWinner) {
        console.log(
          `yes there's match in ARRAY:${array} Player ${_currentPlayer}`
        );
        _gameOver = true;
      }
    }
  }
  function isGameOver() {
    return _gameOver;
  }
  function isTie() {
    return _isTie;
  }
  const checkForWinner = () => {
    const board = Gameboard.getBoard();
    //Check for winner in tic tac toe game;
    //-- 3 same symbols in row vertical horizontal or diagonally
    const topRow = board.slice(0, 3);
    const middleRow = board.slice(3, 6);
    const bottomRow = board.slice(6, 9);
    const diagonallyUP = [board[2], board[4], board[6]];
    const diagonallyDown = [board[0], board[4], board[8]];
    const firstCol = [board[0], board[3], board[6]];
    const secondCol = [board[1], board[4], board[7]];
    const thirdCol = [board[2], board[5], board[8]];
    const allRows = [
      topRow,
      middleRow,
      bottomRow,
      diagonallyUP,
      diagonallyDown,
      firstCol,
      secondCol,
      thirdCol,
    ];
    _checkAllRows(allRows, "X");
    _checkAllRows(allRows, "O");
  };

  const checkBoardState = () => {
    const board = Gameboard.getBoard();
    const isEveryTileMarked = board.every((tile) => {
      return tile;
    });

    if (isEveryTileMarked) {
      console.log(`all tiles are marked!`);
      _isTie = true;
    }
  };

  const startGameBtn = document.querySelector(".start-game-btn");
  startGameBtn.addEventListener("click", newGame);
  const nextRoundBtn = document.querySelector(".next-round");
  nextRoundBtn.addEventListener("click", playNextRound);

  const endGame = () => {
    const { updateScoreBoard } = DisplayController;
    if (_gameOver) {
      updateScoreBoard(_currentPlayer);
    } else if (_isTie) {
      updateScoreBoard();
    }
  };

  function startGame() {
    const { resetBoard } = Gameboard;
    const { resetScoreBoard, updateBoard, hideDisplay, showHideNextRndBtn } =
      DisplayController;

    if (_gameOver) _gameOver = false;
    if (_isTie) _isTie = false;
    if (_currentPlayer) _currentPlayer = _player1;
    resetBoard();
    updateBoard();
    hideDisplay();
  }
  function playNextRound() {
    const { showHideNextRndBtn } = DisplayController;
    startGame();
    showHideNextRndBtn();
  }
  function newGame() {
    const { resetScoreBoard, showHideNextRndBtn } = DisplayController;
    const isNextRoundBtnHidden = document
      .querySelector(".next-round")
      .classList.contains("hidden");
    if (!isNextRoundBtnHidden) {
      showHideNextRndBtn();
    }
    startGame();
    resetScoreBoard(_player1, _player2);
  }
  const getCurrentPlayer = () => _currentPlayer;
  const nextPlayerTurn = () => {
    _currentPlayer = _currentPlayer === _player2 ? _player1 : _player2;
  };

  return {
    getCurrentPlayer,
    nextPlayerTurn,
    checkBoardState,
    checkForWinner,
    endGame,
    isGameOver,
    isTie,
  };
})();

const DisplayController = (() => {
  const _board = document.querySelector(".game-board");
  const {
    getCurrentPlayer,
    nextPlayerTurn,
    checkBoardState,
    checkForWinner,
    endGame,
    isGameOver,
    isTie,
  } = Game;
  const { setBoard, getBoard } = Gameboard;
  let _currentPlayer = null;
  // let _isWinner = null;
  const _display = document.querySelector(".display");
  const _listenOnTiles = () => {
    const tiles = document.querySelectorAll(".square");
    tiles.forEach((tile, index) =>
      tile.addEventListener("click", function onTileClick() {
        const board = getBoard();
        _currentPlayer = getCurrentPlayer();
        //prevent user from playing if there's winner
        if (isGameOver()) {
          return;
        }
        //if tile has not been marked update
        if (!board[index]) {
          setBoard(_currentPlayer.mark, index);
          updateBoard();
          checkForWinner();
          checkBoardState();
          if (isGameOver() || isTie()) {
            endGame();
          } else {
            nextPlayerTurn();
          }
        }
      })
    );
  };

  function _populateBoard(element, index) {
    //clean board on first iteration
    if (index === 0) _board.innerHTML = "";
    const tile = document.createElement("div");
    tile.classList.add("square");
    tile.dataset.index = index;
    tile.innerHTML = `${element}`;
    _board.appendChild(tile);
  }
  function hideDisplay() {
    _display.textContent = ``;
  }
  function showHideNextRndBtn() {
    const nextRoundBtn = document.querySelector(".next-round");
    nextRoundBtn.classList.toggle("hidden");
  }
  function updateScoreBoard(player) {
    if (!player) {
      _display.textContent = `It's a tie`;
      showHideNextRndBtn();
    } else {
      const playerScore = document.querySelector(`.${player.name}-score`);
      player.addScore(1);
      playerScore.textContent += ` ${"X"}`;
      if (player.getScore() === 3) {
        displayWinner(player);
        return;
      }
      _display.textContent = `${player.name.toUpperCase()} wins this round!`;
      showHideNextRndBtn();
    }
  }
  function displayWinner(player) {
    _display.textContent = `${player.name.toUpperCase()} WON the game`;
  }
  function resetScoreBoard(player1, player2) {
    const player1Score = document.querySelector(`.player1-score`);
    const player2Score = document.querySelector(`.player2-score`);
    player1Score.innerText = "Player1 Score:";
    player2Score.innerText = "Player2 Score:";
    _display.innerText = "";
    player1.resetScore();
    player2.resetScore();
  }
  const updateBoard = () => {
    const board = Gameboard.getBoard();
    board.forEach((e, i) => _populateBoard(e, i));
    _listenOnTiles();
  };

  return {
    updateBoard,
    updateScoreBoard,
    hideDisplay,
    showHideNextRndBtn,
    resetScoreBoard,
  };
})();

//display next round button, last thing i done
//TODO
// tie when it's draw (no scores) display message it's tie
// when any player reach 3 points stop game completely display winner
