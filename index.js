const Gameboard = (() => {
  const board = ["x", "x", "x", "x", "x", "x", "x", "x", "x"];
  return {
    board,
  };
})();

const DisplayController = (() => {
  const renderBoard = (arr) => {
    const board = document.querySelector(".game-board");
    arr.forEach(function addTilesToBoard(element, index) {
      const tile = document.createElement("div");
      tile.classList.add("square");
      tile.dataset.index = index;
      tile.innerHTML = `${element}`;
      board.appendChild(tile);
    });
  };
  return { renderBoard };
})();

const Player = () => {
  return {};
};

DisplayController.renderBoard(Gameboard.board);
