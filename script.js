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

  return { marker, getMarker, setMarker };
};

// Coordinate object factory
const Coordinate = (x, y) => ({ x, y });

// Game board module
const GameBoard = (() => {
  const board = [];
  const rows = 3;
  const columns = rows;

  // Initialize game board
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const printBoard = () => {
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

  const lookForThree = (coordinate, marker) => {
    // Check row
    for (let i = 0; i < columns; i++) {
      if (board[coordinate.x][i].getMarker() !== marker) {
        break;
      } else if (i === columns - 1) {
        return true;
      }
    }

    // Check column
    for (let i = 0; i < rows; i++) {
      if (board[i][coordinate.y].getMarker() !== marker) {
        break;
      } else if (i === rows - 1) {
        return true;
      }
    }

    // Check diagonal 1
    if (coordinate.x === coordinate.y) {
      for (let i = 0; i < rows; i++) {
        if (board[i][i].getMarker() !== marker) {
          break;
        } else if (i === rows - 1) {
          return true;
        }
      }
    }

    // Check diagonal 2
    if (coordinate.x === rows - 1 - coordinate.y) {
      for (let i = 0; i < rows; i++) {
        if (board[i][rows - 1 - i].getMarker() !== marker) {
          break;
        } else if (i === rows - 1) {
          return true;
        }
      }
    }

    return false;
  };

  return { fillCell, getBoard, printBoard, lookForThree };
})();

const Game = (() => {
  const players = [Player('P1', 'X'), Player('P2', 'O')];

  let activePlayer = players[0];

  const changeActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => console.log(activePlayer.getName());

  const printRound = () => {
    GameBoard.printBoard();
    getActivePlayer();
  };

  const checkForWinner = (coordinate, marker) =>
    GameBoard.lookForThree(coordinate, marker);

  const playRound = (coordinate) => {
    GameBoard.fillCell(coordinate, activePlayer.getMarker());

    const winner = checkForWinner(coordinate, activePlayer.getMarker());
    changeActivePlayer();
    printRound();
    console.log(winner);
  };

  printRound();

  return { getActivePlayer, playRound };
})();
