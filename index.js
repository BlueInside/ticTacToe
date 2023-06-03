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
  const _gameOver = false;
  let currentPlayer = _player1;
  // we'll have buttons that let players type in names and show who's move
  const playGame = (player1, player2) => {
    // while(!gameOver)
    {
    }
  };
  return { currentPlayer };
})();

const DisplayController = (() => {
  const _board = document.querySelector(".game-board");
  const player = Game.currentPlayer;
  const _listenOnTiles = () => {
    const tiles = document.querySelectorAll(".square");
    tiles.forEach((tile, index) =>
      tile.addEventListener("click", function onTileClick() {
        Gameboard.setBoard(player.mark, index);
        updateBoard();
        console.log(Gameboard.getBoard());
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
