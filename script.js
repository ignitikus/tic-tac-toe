let turn = "player";
let player = "Cross";
let moves = [];
let left = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const currentYear = () => {
  const footerYear = document.getElementById("footer-year");
  footerYear.innerText = new Date().getFullYear();
};

const displayModal = (message) => {
  const modal = document.getElementById("modal-result");
  const modalMessage = document.getElementById("message");
  modalMessage.innerText = message;
  modal.style.visibility = "initial";
};

const checkIfWon = (arr) => {
  // winning positions are 123, 456, 789, 147, 258, 369, 159, 357
  const positions = {
    cell_1: 0,
    cell_2: 0,
    cell_3: 0,
    cell_4: 0,
    cell_5: 0,
    cell_6: 0,
    cell_7: 0,
    cell_8: 0,
    cell_9: 0,
  };

  arr.forEach(({ cell, val }) => (positions[`cell_${cell}`] = val));

  if (Math.abs(positions.cell_1 + positions.cell_2 + positions.cell_3) === 3) {
    displayModal(positions.cell_1 === 1 ? "You won!" : "Computer Won!");
  } else if (
    Math.abs(positions.cell_4 + positions.cell_5 + positions.cell_6) === 3
  ) {
    displayModal(positions.cell_4 === 1 ? "You won!" : "Computer Won!");
  } else if (
    Math.abs(positions.cell_7 + positions.cell_8 + positions.cell_9) === 3
  ) {
    displayModal(positions.cell_7 === 1 ? "You won!" : "Computer Won!");
  } else if (
    Math.abs(positions.cell_1 + positions.cell_4 + positions.cell_7) === 3
  ) {
    displayModal(positions.cell_1 === 1 ? "You won!" : "Computer Won!");
  } else if (
    Math.abs(positions.cell_2 + positions.cell_5 + positions.cell_8) === 3
  ) {
    displayModal(positions.cell_2 === 1 ? "You won!" : "Computer Won!");
  } else if (
    Math.abs(positions.cell_3 + positions.cell_6 + positions.cell_9) === 3
  ) {
    displayModal(positions.cell_3 === 1 ? "You won!" : "Computer Won!");
  } else if (
    Math.abs(positions.cell_1 + positions.cell_5 + positions.cell_9) === 3
  ) {
    displayModal(positions.cell_1 === 1 ? "You won!" : "Computer Won!");
  } else if (
    Math.abs(positions.cell_3 + positions.cell_5 + positions.cell_7) === 3
  ) {
    displayModal(positions.cell_3 === 1 ? "You won!" : "Computer Won!");
  } else {
    displayModal("Draw");
  }
};

const computerMove = () => {
  if (turn === "computer") {
    const randomNum = Math.floor(Math.random() * left.length);
    const randomCell = left.splice(randomNum, 1);
    const foundCell = document.getElementById(`game-box-${randomCell}`);
    if (foundCell) {
      moves.push({ turn: "computer", cell: randomCell[0], val: -1 });
      foundCell.innerText = player === "Cross" ? "O" : "X";
      foundCell.classList.add("computer");
      turn = "player";
      checkIfWon(moves);
    }
  }
};

const userMove = (event) => {
  const gameCell = document.getElementById(event.target.id);
  const cell = Number(gameCell.id.slice(-1));
  if (gameCell.innerText === "" && turn === "player") {
    gameCell.innerText = player === "Cross" ? "X" : "O";
    moves.push({ turn: "player", cell, val: 1 });
    left.splice(left.indexOf(cell), 1);
    gameCell.classList.add("player");
    turn = "computer";
    checkIfWon(moves);
  }
  if (turn === "computer") {
    setTimeout(() => {
      computerMove();
    }, 500);
  }
};

const resetHandler = () => {
  const cells = document.querySelectorAll(".game-cell");
  for (let cell of cells) {
    cell.innerText = "";
    cell.classList.remove("player");
    cell.classList.remove("computer");
  }
  turn = "player";
  player = "Cross";
  moves = [];
  left = [1, 2, 3, 4, 5, 6, 7, 8, 9];
};

const addsEventListener = () => {
  const cells = document.querySelectorAll(".game-cell");

  document
    .getElementById("modal-close-button")
    .addEventListener("click", () => {
      document.getElementById("modal-result").style.visibility = "hidden";
    });

  document.getElementById("again-button").addEventListener("click", () => {
    document.getElementById("modal-result").style.visibility = "hidden";
    resetHandler();
  });

  document
    .getElementById("player-option-start")
    .addEventListener("change", (event) => {
      turn = event.target.value;
    });

  document
    .getElementById("player-option-figure")
    .addEventListener("change", (event) => {
      player = event.target.value;
    });

  document
    .getElementById("reset-button")
    .addEventListener("click", resetHandler);

  for (let cell of cells) {
    cell.addEventListener("click", userMove);
  }
};

addsEventListener();
currentYear();
