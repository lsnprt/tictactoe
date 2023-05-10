// Player object factory

const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;

  return { getName, getMarker };
};

// Game board object
const GameBoard = (() => {
  const gameBoardArray = Array(9);

  const move = (cell, symbol) => {
    if (gameBoardArray[cell] === undefined) {
      gameBoardArray[cell] = symbol;
    }
  };

  return { gameBoardArray, move };
})();

const Game = () => {};
