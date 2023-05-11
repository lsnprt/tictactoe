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
      marker = playersMarker;
    }
  };

  const getMarker = () => marker ?? 'E';

  return { getMarker, setMarker };
};

const Coordinate = (x, y) => ({ x, y });

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
    console.clear();
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < columns; j++) {
        row += ` ${board[i][j].getMarker()} `;
      }
      console.log(row);
    }
  };

  const fillCell = (coordinate, marker) => {
    board[coordinate.x][coordinate.y].setMarker(marker);
  };

  return { fillCell, getGameBoard, printGameBoard };
})();

const Game = (() => {
  const players = [Player('P1', 'X'), Player('P2', 'O')];

  let activePlayer = players[0];

  const changeActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => console.log(activePlayer.getName());

  const printRound = () => {
    GameBoard.printGameBoard();
    getActivePlayer();
  };

  const playRound = (coordinate) => {
    GameBoard.fillCell(coordinate, activePlayer.getMarker());
    changeActivePlayer();
    printRound();
  };

  printRound();

  return { getActivePlayer, playRound };
})();
