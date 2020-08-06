/* All PIECES in the game with their rotated positions */
const PIECES = [
  {
    name: "Red Z-Piece",
    color: Color.Red,
    currPos: 0,
    pos: [
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ],
    ],
  },
  {
    name: "Blue J-Piece",
    color: Color.Blue,
    currPos: 0,
    pos: [
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ],
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ],
      [
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
      ],
    ],
  },
  {
    name: "Green Z-Piece",
    color: Color.Green,
    currPos: 0,
    pos: [
      [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ],
    ],
  },
  {
    name: "Yellow Square Piece",
    color: Color.Yellow,
    currPos: 0,
    pos: [
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
      ],
    ],
  },
  {
    name: "Indigo I-Piece",
    color: Color.Indigo,
    currPos: 0,
    pos: [
      [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 3 },
      ],
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
      ],
    ],
  },
  {
    name: "Orange L-Piece",
    color: Color.Orange,
    currPos: 0,
    pos: [
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 1 },
      ],
      [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 0, y: 2 },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ],
    ],
  },
  {
    name: "Pink T-Piece",
    color: Color.Violet,
    currPos: 0,
    pos: [
      [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 1 },
      ],
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 1, y: 1 },
      ],
      [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 0, y: 1 },
      ],
    ],
  },
];

/* Highest score of plays during this session */
let highScore = 0;
/* Renders score, piece, and highscore info */
let gameText;
/* Contains all data about current game */
let gameState = {};
/* The time in milliseconds the each piece descends */
let intervalTime = 600;
/* The id of the timer that moves pieces down */
let interval = setInterval(movePieceDown, intervalTime);
/* The id of the timer that increases the speed of the game */
let increaseInterval = setInterval(speedUpGame, 12000);
/* A boolean of whether challenge mode is on */
let challengeModeOn = false;
/* A number for multiplier to completeing a row bonus */
let combo = 1;
/* A boolean of whether tutorial is in progress. */
let tutorialOn = true;

/* Initializes the gameState */
function init() {
  gameState = {
    active: true,
    score: 0,
    player1: {
      piece: getRandomPiece(0, false),
    },
    placedDots: [],
  };
  if (challengeModeOn) {
    gameState.player2 = {
      piece: getRandomPiece(12, false),
    };
  }
  tutorialOn = false;
  clearInterval(interval);
  clearInterval(increaseInterval);
  intervalTime = 600;
  interval = setInterval(movePieceDown, intervalTime);
  increaseInterval = setInterval(speedUpGame, 12000);
  challengeModeOn = false;
}

/* Creates a game */
function create(game) {
  tutorial();
  //init();
}

/* Continuously runs to update the game by reprinting dots */
function update(game) {
  const piece1 = gameState.player1.piece;
  const placedDots = gameState.placedDots;
  const color1 = piece1.color;

  if (buttonText && !tutorialOn) {
    buttonText.innerText = "Restart";
  }
  if (buttonText && tutorialOn) {
    buttonText.innerText = "Skip tutorial";
  }

  if (gameText && !tutorialOn) {
    gameText.innerText = `Score: ${gameState.score} // ${piece1.name} // Highscore: ${highScore}`;
  }
  const shadowPiece = dropPiece(piece1);
  for (dot of shadowPiece.pos) {
    game.setDot(dot.x, dot.y, Color.Black);
  }
  for (dot of piece1.pos[piece1.currPos]) {
    game.setDot(dot.x, dot.y, color1);
  }
  if (challengeModeOn) {
    const piece2 = gameState.player2.piece;
    const color2 = piece2.color;
    for (dot of piece2.pos[piece2.currPos]) {
      game.setDot(dot.x, dot.y, color2);
    }
  }
  for (dot of placedDots) {
    game.setDot(dot.x, dot.y, dot.color);
  }
  for (var i = 0; i < 24; i++) {
    if (rowIsFilled(i)) {
      deleteRow(i);
    }
  }
  combo = 1;
  if (!gameState.active) {
    if (gameState.score > highScore) {
      highScore = gameState.score;
    }
    gameText.innerText = `GAME OVER // Score: ${gameState.score} // Highscore: ${highScore}`;
    clearInterval(interval);
    clearInterval(increaseInterval);
    return;
  }
}

/* Handler for arrow key presses */
function onKeyPress(direction) {
  const piece1 = gameState.player1.piece;
  if (gameState.active) {
    if (
      direction === Direction.Left &&
      piece1.pos[piece1.currPos].every((dot) => leftIsOpen(dot))
    ) {
      for (pos of piece1.pos) {
        for (dot of pos) {
          dot.x--;
        }
      }
    } else if (
      direction === Direction.Right &&
      piece1.pos[piece1.currPos].every((dot) => rightIsOpen(dot))
    ) {
      for (pos of piece1.pos) {
        for (dot of pos) {
          dot.x++;
        }
      }
    } else if (
      direction === Direction.Down &&
      piece1.pos[piece1.currPos].every((dot) => nextIsOpen(dot, "player2"))
    ) {
      const newPiece = dropPiece(piece1);
      const color = newPiece.color;
      for (dot of newPiece.pos) {
        gameState.placedDots.push({ ...dot, color });
        gameState.score++;
      }
      gameState.player1.piece = getRandomPiece(0);
    } else if (direction === Direction.Up) {
      gameState.player1.piece.currPos = rotate(gameState.player1.piece);
    }
  }
}

/* Handler for clicks */
function onDotClicked() {
  if (challengeModeOn) {
    switchPlayer();
  }
}

/* Sends PIECE to the bottom-most dot */
function dropPiece(piece) {
  const newPiece = { color: piece.color };
  const posList = [];
  for (dot of piece.pos[piece.currPos]) {
    posList.push({ x: dot.x, y: dot.y });
  }
  function pieceFits(pos) {
    for (dot of pos) {
      if (dot.y > 23 || dot.y < 0) {
        return false;
      } else if (
        gameState.placedDots.some((d) => d.x === dot.x && d.y === dot.y)
      ) {
        return false;
      } else if (challengeModeOn) {
        const piece2 = gameState.player2.piece;
        if (
          piece2.pos[piece2.currPos].some((d) => d.x === dot.x && d.y === dot.y)
        ) {
          return false;
        }
      }
    }
    return true;
  }
  let pieceChanged = false;
  while (pieceFits(posList)) {
    for (pos of posList) {
      pos.y++;
    }
    pieceChanged = true;
  }
  if (pieceChanged) {
    for (pos of posList) {
      pos.y--;
    }
  }
  newPiece.pos = posList;
  return newPiece;
}

/* Moves both pieces down one space on the board */
function movePieceDown() {
  const piece1 = gameState.player1.piece;
  const color1 = piece1.color;
  const placedDots = gameState.placedDots;
  var canMoveDown1 = piece1.pos[piece1.currPos].every((dot) =>
    nextIsOpen(dot, "player2")
  );
  if (challengeModeOn) {
    const piece2 = gameState.player2.piece;
    var canMoveDown2 = piece2.pos[piece2.currPos].every((dot) =>
      nextIsOpen(dot, "player1")
    );
  }
  if (canMoveDown1) {
    for (pos of piece1.pos) {
      for (dot of pos) {
        dot.y++;
      }
    }
  } else {
    for (dot of piece1.pos[piece1.currPos]) {
      placedDots.push({ ...dot, color: color1 });
      gameState.score++;
    }
  }
  if (challengeModeOn) {
    const piece2 = gameState.player2.piece;
    const color2 = piece2.color;
    if (canMoveDown2) {
      for (pos of piece2.pos) {
        for (dot of pos) {
          dot.y++;
        }
      }
    } else {
      for (dot of piece2.pos[piece2.currPos]) {
        placedDots.push({ ...dot, color: color2 });
        gameState.score++;
      }
    }
    if (!canMoveDown2) {
      gameState.player2.piece = getRandomPiece(12);
    }
  }
  if (!canMoveDown1) {
    gameState.player1.piece = getRandomPiece(0);
  }
  if (gameState.score > highScore) {
    highScore = gameState.score;
  }
}

/* Returns whether the next space below DOT is open */
function nextIsOpen(dot, otherPlayer) {
  let dotExists = gameState.placedDots.some((d) => {
    return d.x === dot.x && d.y === dot.y + 1;
  });
  if (challengeModeOn) {
    const piece = gameState[otherPlayer].piece;
    dotExists =
      dotExists ||
      piece.pos[piece.currPos].some((d) => {
        return d.x === dot.x && d.y === dot.y + 1;
      });
  }
  return dot.y < 23 && !dotExists;
}

/* Returns whether the space to the right of DOT is open */
function rightIsOpen(dot) {
  let dotExists = gameState.placedDots.some((d) => {
    return d.x === dot.x + 1 && d.y === dot.y;
  });
  if (challengeModeOn) {
    const piece = gameState.player2.piece;
    dotExists =
      dotExists ||
      piece.pos[piece.currPos].some((d) => {
        return d.x === dot.x + 1 && d.y === dot.y;
      });
  }

  return dot.x < 23 && !dotExists;
}

/* Returns whether the space to the left of DOT is open */
function leftIsOpen(dot) {
  let dotExists = gameState.placedDots.some((d) => {
    return d.x === dot.x - 1 && d.y === dot.y;
  });
  if (challengeModeOn) {
    const piece = gameState.player2.piece;
    dotExists =
      dotExists ||
      piece.pos[piece.currPos].some((d) => {
        return d.x === dot.x - 1 && d.y === dot.y;
      });
  }
  return dot.x > 0 && !dotExists;
}

/* Returns whether the row of Y is filled with dots */
function rowIsFilled(y) {
  return gameState.placedDots.filter((dot) => dot.y === y).length === 24;
}

/* Deletes the row of Y and moves all dots above it down */
function deleteRow(y) {
  const newDots = gameState.placedDots.filter((dot) => dot.y !== y);
  for (dot of newDots) {
    if (dot.y < y && dot.y < 23) {
      dot.y++;
    }
  }
  gameState.placedDots = newDots;
  gameState.score += 400 * combo;
  combo++;
}

/* Rotates PIECE to its next position */
function rotate(piece) {
  let newCurrPos = piece.currPos + 1;
  if (newCurrPos === piece.pos.length) {
    newCurrPos = 0;
  }
  const newPos = piece.pos[newCurrPos];
  let noConflict = true;
  for (dot of newPos) {
    if (gameState.placedDots.some((d) => d.y === dot.y && d.x === dot.x)) {
      noConflict = false;
      break;
    } else if (
      challengeModeOn &&
      gameState.player2.piece.pos[gameState.player2.piece.currPos].some(
        (d) => d.y === dot.y && d.x === dot.x
      )
    ) {
      noConflict = false;
      break;
    } else if (dot.x < 0 || dot.x > 23 || dot.y < 0 || dot.y > 23) {
      noConflict = false;
      break;
    }
  }
  if (noConflict) {
    return newCurrPos;
  }
  return piece.currPos;
}

/* Displays the tutorial */
function tutorial() {
  gameState = {
    active: true,
    score: 0,
    player1: {
      piece: getRandomPiece(0, false),
    },
    placedDots: [],
  };
  gameText.innerText = "Use the left and right arrows to move pieces";
  setTimeout(function () {
    if (gameState.active && tutorialOn) {
      gameText.innerText = "Use the up arrow to rotate piece";
    }
  }, 7000);
  setTimeout(function () {
    if (gameState.active && tutorialOn) {
      gameText.innerText = "Use the down arrow to drop piece to its shadow";
    }
  }, 14000);
  setTimeout(function () {
    if (gameState.active && tutorialOn) {
      gameText.innerText =
        "Fill an entire row to clear it, clear multiple rows at once for more points";
      const newPlacedDots = [];
      for (var i = 0; i < 24; i++) {
        if (i != 12) {
          newPlacedDots.push({ x: i, y: 23, color: randomColor() });
          newPlacedDots.push({ x: i, y: 22, color: randomColor() });
          newPlacedDots.push({ x: i, y: 21, color: randomColor() });
          newPlacedDots.push({ x: i, y: 20, color: randomColor() });
        }
      }
      gameState.placedDots = newPlacedDots;
      const newPiece = clone(PIECES[4]);
      for (pos of newPiece.pos) {
        for (dot of pos) {
          dot.x += 12;
        }
      }
      gameState.player1.piece = newPiece;
    }
  }, 21000);
  setTimeout(function () {
    challengeModeOn = true;
    gameState.player1 = {
      piece: getRandomPiece(0, false),
    };
    gameState.player2 = {
      piece: getRandomPiece(12, false),
    };
    gameText.innerText =
      "On challenge mode click the game to switch between pieces";
  }, 30000);
  setTimeout(function () {
    if (gameState.active && tutorialOn) {
      challengeModeOn = false;
      gameText.innerText = "Beginning game...";
    }
  }, 40000);
  setTimeout(function () {
    if (gameState.active && tutorialOn) {
      highScore = 0;
      init();
    }
  }, 42000);
}

/* Returns a random color that is not black or gray */
function randomColor() {
  const rand = Math.floor(Math.random() * 6);
  switch (rand) {
    case 0:
      return Color.Red;
    case 1:
      return Color.Orange;
    case 2:
      return Color.Yellow;
    case 3:
      return Color.Green;
    case 4:
      return Color.Blue;
    case 5:
      return Color.Violet;
    default:
      return Color.Indigo;
  }
}

/* Clones OBJ */
function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/* Returns a randomPiece that is shifted to the right by OFFSET */
function getRandomPiece(offset, gameStarted = true) {
  let multiplier = 21;
  if (challengeModeOn) {
    multiplier = 8;
  }
  const addToX = Math.floor(Math.random() * multiplier) + offset;
  const n = PIECES.length;
  const piece = clone(PIECES[Math.floor(Math.random() * n)]);
  let cannotPlace = false;
  for (pos of piece.pos) {
    for (dot of pos) {
      dot.x += addToX;
      if (gameStarted) {
        cannotPlace = gameState.placedDots.some((d) => {
          return d.x === dot.x && d.y === dot.y;
        });
      }
    }
  }
  cannotPlace ? (gameState.active = false) : null;
  return piece;
}

/* Increases the speed that pieces fall */
function speedUpGame() {
  if (intervalTime > 300) {
    clearInterval(interval);
    if (challengeModeOn) {
      intervalTime < 400 ? (intervalTime *= 0.97) : (intervalTime *= 0.98);
    } else {
      intervalTime < 400 ? (intervalTime *= 0.95) : (intervalTime *= 0.97);
    }
    interval = setInterval(movePieceDown, intervalTime);
  }
}

/* Starts the game over */
function startOver() {
  init();
}

/* Switches which piece that user controls */
function switchPlayer() {
  const player1 = gameState.player1;
  gameState.player1 = gameState.player2;
  gameState.player2 = player1;
}

/* Toggles challenge mode */
function setChallengeMode() {
  if (gameState.active && !tutorialOn) {
    challengeModeOn = !challengeModeOn;
    gameState.player2 = {
      piece: getRandomPiece(12, false),
    };
  }
}

window.onload = () => {
  document.getElementById("startover").addEventListener("click", startOver);
  document
    .getElementById("challengeMode")
    .addEventListener("click", setChallengeMode);
  gameText = document.getElementById("gameText");
  buttonText = document.getElementById("startover");
};

let config = {
  create,
  update,
  onKeyPress,
  frameRate: 24,
  onDotClicked,
};

let game = new Game(config);
game.run();
