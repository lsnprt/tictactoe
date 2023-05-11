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

  const getMarker = () => marker;

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
  let roundCounter = 0;
  let gameOver = false;

  const getGameOver = () => gameOver;

  const changeActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const endGame = (winnerFound) => {
    gameOver = true;
    activePlayer = winnerFound ? activePlayer : null;
  };

  const playRound = (coordinate) => {
    roundCounter++;

    GameBoard.fillCell(coordinate, activePlayer.getMarker());
    const winnerFound = GameBoard.lookForThree(
      coordinate,
      activePlayer.getMarker()
    );

    if (winnerFound || roundCounter === 9) {
      endGame(winnerFound);
      return;
    }

    changeActivePlayer();
  };

  return { getGameOver, getActivePlayer, playRound };
})();

const BoardController = (() => {
  const turnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');

  const displayWinner = () => {
    if (Game.getActivePlayer() !== null) {
      turnDiv.innerText = `${Game.getActivePlayer().getName()} wins!`;
    } else {
      turnDiv.innerText = `It's a tie!`;
    }
  };

  const updateDisplay = () => {
    boardDiv.textContent = '';

    const board = GameBoard.getBoard();

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const button = document.createElement('button');
        button.innerText = board[i][j].getMarker();
        button.dataset.x = i;
        button.dataset.y = j;
        boardDiv.appendChild(button);
      }
    }

    if (Game.getGameOver()) {
      // eslint-disable-next-line no-use-before-define
      boardDiv.removeEventListener('click', clickHandler);
      displayWinner();
      return;
    }
    turnDiv.textContent = `${Game.getActivePlayer().getName()}'s turn `;
  };

  // eslint-disable-next-line no-use-before-define
  boardDiv.addEventListener('click', clickHandler);

  function clickHandler(e) {
    if (e.target.innerText === '' && e.target.nodeName === 'BUTTON') {
      const eventCoordinates = Coordinate(
        e.target.dataset.x,
        e.target.dataset.y
      );
      Game.playRound(eventCoordinates);
      updateDisplay();
    }
  }

  return { updateDisplay };
})();

window.addEventListener('load', BoardController.updateDisplay);
