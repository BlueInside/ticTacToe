const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  return {
    board,
  };
})();

const DisplayController = (() => {
  const _board = document.querySelector(".game-board");

  function _addTilesToBoard(element, index) {
    const tile = document.createElement("div");
    tile.classList.add("square");
    tile.dataset.index = index;
    tile.innerHTML = `${element}`;
    _board.appendChild(tile);
  }

  const renderBoardContent = (arr) => {
    arr.forEach((e, i) => _addTilesToBoard(e, i));
  };
  return { renderBoardContent };
})();

const Player = () => {
  return {};
};

DisplayController.renderBoardContent(Gameboard.board);
