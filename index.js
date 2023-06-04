const Gameboard = (() => {
  let _board = ["", "", "", "", "", "", "", "", ""];

  const setBoard = (mark, index) => {
    _board[index] = mark;
  };

  const getBoard = () => _board;
  const restartBoard = () => {
    _board = ["", "", "", "", "", "", "", "", ""];
  };
  return {
    setBoard,
    getBoard,
    restartBoard,
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
  let _board = null;
  const checkBoardState = () => {
    _board = Gameboard.getBoard();
    const isEveryTileMarked = _board.every((tile) => {
      return tile;
    });

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
    Gameboard.restartBoard();
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
  const { setBoard } = Gameboard;
  let _currentPlayer = null;
  const _listenOnTiles = () => {
    const tiles = document.querySelectorAll(".square");
    tiles.forEach((tile, index) =>
      tile.addEventListener("click", function onTileClick() {
        _currentPlayer = getCurrentPlayer();
        setBoard(_currentPlayer.mark, index);
        updateBoard();
        nextPlayerTurn();
        checkBoardState();
      })
    );
  };

  function _populateBoard(element, index) {
    //refresh board on first iteration
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
