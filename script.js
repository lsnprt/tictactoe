// Player object factory

const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;

  return { getName, getMarker };
};

// Cell object factory
const Cell = () => {
  let marker = null;

  const setMarker = (playersMarker) => {
    if (marker === null) {
      marker = ` ${playersMarker} `;
    }
  };

  const getMarker = () => marker;

  return { getMarker, setMarker };
};

// Game board module
const GameBoard = (() => {
  const board = [];
  const rows = 3;
  const columns = 3;

  // Initialize gameboard
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getGameBoard = () => board;

  const printGameBoard = () => {
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < columns; j++) {
        row = row.concat(board[i][j].getMarker() ?? ' E ');
      }
      console.log(row);
    }
  };

  const fillCell = (x, y, marker) => {
    board[x][y].setMarker(marker);
  };

  return { fillCell, getGameBoard, printGameBoard };
})();

const Game = () => {};
