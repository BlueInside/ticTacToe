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
  const setScore = (point) => (_score += point);
  const getScore = () => _score;
  return { mark, name, setScore, getScore };
};

const Game = (() => {
  const _player1 = Player("X", "player1");
  const _player2 = Player("0", "player2");
  let _currentPlayer = null || _player1;
  let _gameOver = false;
  const checkBoardState = () => {
    board = Gameboard.getBoard();
    const isEveryTileMarked = board.every((tile) => {
      return tile;
    });

    const isWinner = () => {
      //Check for winner in tic tac toe game;
      //-- 3 same symbols in row vertical horizontal or diagonally
    };

    if (isEveryTileMarked) {
      _gameOver = true;
    }
  };

  const startGameBtn = document.querySelector(".start-game-btn");

  const endGame = () => {
    if (_gameOver) {
    }
  };

  function startGame() {
    Gameboard.resetBoard();
    DisplayController.updateBoard();
  }
  startGameBtn.addEventListener("click", startGame);

  const getCurrentPlayer = () => _currentPlayer;
  const nextPlayerTurn = () => {
    _currentPlayer = _currentPlayer === _player2 ? _player1 : _player2;
  };

  return { getCurrentPlayer, nextPlayerTurn, checkBoardState };
})();

const DisplayController = (() => {
  const _board = document.querySelector(".game-board");
  const { getCurrentPlayer, nextPlayerTurn, checkBoardState } = Game;
  const { setBoard, getBoard } = Gameboard;
  let _currentPlayer = null;
  const _listenOnTiles = () => {
    const tiles = document.querySelectorAll(".square");
    tiles.forEach((tile, index) =>
      tile.addEventListener("click", function onTileClick() {
        const board = getBoard();
        _currentPlayer = getCurrentPlayer();
        //if tile has not been marked update
        if (!board[index]) {
          setBoard(_currentPlayer.mark, index);
          updateBoard();
          nextPlayerTurn();
          checkBoardState();
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

  const updateBoard = () => {
    const board = Gameboard.getBoard();
    board.forEach((e, i) => _populateBoard(e, i));
    _listenOnTiles();
  };

  return { updateBoard };
})();
