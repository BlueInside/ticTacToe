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
  return { mark, name, addScore, getScore };
};

const Game = (() => {
  const _player1 = Player("X", "player1");
  const _player2 = Player("O", "player2");
  let _currentPlayer = null || _player1;
  let _gameOver = false;

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
      _gameOver = true;
    }
  };

  const startGameBtn = document.querySelector(".start-game-btn");
  startGameBtn.addEventListener("click", startGame);
  const endGame = () => {
    const { updateScoreBoard } = DisplayController;
    if (_gameOver) {
      updateScoreBoard(_currentPlayer);
    }
  };

  function startGame() {
    const { resetBoard } = Gameboard;
    if (_gameOver) _gameOver = false;
    if (_currentPlayer) _currentPlayer = _player1;
    resetBoard();
    DisplayController.updateBoard();
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
  } = Game;
  const { setBoard, getBoard } = Gameboard;
  let _currentPlayer = null;
  let _isWinner = null;
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
          if (isGameOver()) {
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

  function updateScoreBoard(player) {
    const playerScore = document.querySelector(`.${player.name}-score`);
    player.addScore(1);
    playerScore.textContent += ` ${"X"}`;
  }

  const updateBoard = () => {
    const board = Gameboard.getBoard();
    board.forEach((e, i) => _populateBoard(e, i));
    _listenOnTiles();
  };

  return { updateBoard, updateScoreBoard };
})();
