let turn = "player";

const currentYear = () => {
  const footerYear = document.getElementById("footer-year");
  footerYear.innerText = new Date().getFullYear();
};

const eventHandler = (event) => {
  const player = document.getElementById("player-option-figure").value;
  const gameCell = document.getElementById(event.target.id);
  if (gameCell.innerText === "" && turn === "player") {
    gameCell.innerText = player === "Cross" ? "X" : "O";
  }
};

const resetHandler = () => {
  const cells = document.querySelectorAll(".game-cell");
  for (let cell of cells) {
    cell.innerText = "";
  }
};

const addsEventListener = () => {
  const cells = document.querySelectorAll(".game-cell");
  document
    .getElementById("player-option-start")
    .addEventListener("change", (event) => {
      turn = event.target.value;
    });
  document
    .getElementById("reset-button")
    .addEventListener("click", resetHandler);
  for (let cell of cells) {
    cell.addEventListener("click", eventHandler);
  }
};

addsEventListener();
currentYear();
