const Gameboard = (() => {
  const _board = ["", "", "", "", "", "", "", "", ""];

  const setBoard = (mark, index) => {
    _board[index] = mark;
  };

  const getBoard = () => _board;

  return {
    setBoard,
    getBoard,
  };
})();
const Player = (mark, name) => {
  return { mark, name };
};

const Game = (() => {
  const _player1 = Player("X", "player1");
  const _player2 = Player("0", "player2");
  let _currentPlayer = null || _player1;
  const getCurrentPlayer = () => _currentPlayer;
  const nextPlayerTurn = () => {
    _currentPlayer = _currentPlayer === _player2 ? _player1 : _player2;
  };
  // we'll have buttons that let players type in names and show who's move
  const playGame = (player1, player2) => {
    // while(!gameOver)
    {
    }
  };
  return { getCurrentPlayer, nextPlayerTurn };
})();

const DisplayController = (() => {
  const _board = document.querySelector(".game-board");
  const { getCurrentPlayer, nextPlayerTurn } = Game;
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

DisplayController.updateBoard();
