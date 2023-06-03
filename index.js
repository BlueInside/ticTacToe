const Gameboard = (() => {
  const _board = ["", "", "", "", "", "", "", "", ""];
  const markTile = (mark, index) => {
    _board[index] = mark;
  };
  const getBoard = () => _board;
  return {
    markTile,
    getBoard,
  };
})();

const DisplayController = (() => {
  const _board = document.querySelector(".game-board");

  let _tiles = null;

  const _listenOnTiles = () => {
    if (!_tiles) _tiles = document.querySelectorAll(".square");
    _tiles.forEach((tile, index) =>
      tile.addEventListener("click", function onTileClick(e) {
        console.log(index);
      })
    );
  };
  function _populateBoard(element, index) {
    const tile = document.createElement("div");
    tile.classList.add("square");
    tile.dataset.index = index;
    tile.innerHTML = `${element}`;
    _board.appendChild(tile);
  }
  const setUpBoard = () => {
    renderBoardContent(Gameboard.getBoard());
    _listenOnTiles();
  };
  const renderBoardContent = (arr) => {
    arr.forEach((e, i) => _populateBoard(e, i));
  };
  return { renderBoardContent, setUpBoard };
})();

const Player = (mark, name) => {
  return { mark, name };
};

const Game = (() => {
  const _player1 = Player("X", "player1");
  const _player2 = Player("0", "player2");

  const playRound = [];
  return { playRound };
})();

DisplayController.setUpBoard();
