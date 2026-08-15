const choices = ["Rock", "Paper", "Scissors"];

const icons = {
  Rock: "🪨",
  Paper: "📄",
  Scissors: "✂️"
};

let playerScore = 0;
let computerScore = 0;
let wins = 0;
let losses = 0;
let ties = 0;
let round = 0;
let busy = false;
let bestOf = 5;

const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");
const winsEl = document.getElementById("wins");
const lossesEl = document.getElementById("losses");
const tiesEl = document.getElementById("ties");
const playerChoiceEl = document.getElementById("playerChoice");
const computerChoiceEl = document.getElementById("computerChoice");
const resultTextEl = document.getElementById("resultText");
const roundTextEl = document.getElementById("roundText");
const thinkingEl = document.getElementById("thinking");
const statusEl = document.getElementById("status");
const gameOverEl = document.getElementById("gameOver");
const gameOverTitleEl = document.getElementById("gameOverTitle");
const gameOverMessageEl = document.getElementById("gameOverMessage");
const playAgainBtn = document.getElementById("playAgain");
const moveButtons = document.querySelectorAll(".move-btn");

moveButtons.forEach(button => {
  button.addEventListener("click", () => playRound(button.dataset.move));
});

document.getElementById("resetGame").addEventListener("click", resetGame);
document.getElementById("resetTop").addEventListener("click", resetGame);
playAgainBtn.addEventListener("click", resetGame);

function getComputerMove() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function getResult(player, computer) {
  if (player === computer) return "tie";

  if (
    (player === "Rock" && computer === "Scissors") ||
    (player === "Paper" && computer === "Rock") ||
    (player === "Scissors" && computer === "Paper")
  ) {
    return "win";
  }

  return "lose";
}

function playRound(playerMove) {
  if (busy) return;

  busy = true;
  moveButtons.forEach(button => button.disabled = true);

  round++;
  const computerMove = getComputerMove();

  playerChoiceEl.textContent = icons[playerMove];
  playerChoiceEl.classList.remove("pop");
  void playerChoiceEl.offsetWidth;
  playerChoiceEl.classList.add("pop");

  computerChoiceEl.textContent = "❔";
  resultTextEl.textContent = "Thinking...";
  roundTextEl.textContent = `Round ${round}`;
  thinkingEl.textContent = "Computer is choosing...";

  setTimeout(() => {
    computerChoiceEl.textContent = icons[computerMove];
    computerChoiceEl.classList.remove("shake", "pop");
    void computerChoiceEl.offsetWidth;
    computerChoiceEl.classList.add("pop");

    const result = getResult(playerMove, computerMove);

    if (result === "win") {
      playerScore++;
      wins++;
      resultTextEl.textContent = "YOU WIN! 🎉";
      statusEl.textContent = `${playerMove} beats ${computerMove}.`;
    } else if (result === "lose") {
      computerScore++;
      losses++;
      resultTextEl.textContent = "YOU LOSE";
      statusEl.textContent = `${computerMove} beats ${playerMove}.`;
    } else {
      ties++;
      resultTextEl.textContent = "IT'S A TIE!";
      statusEl.textContent = `Both chose ${playerMove}.`;
    }

    updateScores();
    thinkingEl.textContent = "";

    if (playerScore >= Math.ceil(bestOf / 2) ||
        computerScore >= Math.ceil(bestOf / 2)) {
      setTimeout(endGame, 450);
    } else {
      busy = false;
      moveButtons.forEach(button => button.disabled = false);
    }
  }, 650);
}

function updateScores() {
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  winsEl.textContent = wins;
  lossesEl.textContent = losses;
  tiesEl.textContent = ties;
}

function endGame() {
  busy = true;

  if (playerScore > computerScore) {
    gameOverTitleEl.textContent = "You Won! 🏆";
    gameOverMessageEl.textContent =
      `Final score: ${playerScore} - ${computerScore}. Great game!`;
  } else {
    gameOverTitleEl.textContent = "Computer Won 🤖";
    gameOverMessageEl.textContent =
      `Final score: ${computerScore} - ${playerScore}. Try again!`;
  }

  gameOverEl.classList.remove("hidden");
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  wins = 0;
  losses = 0;
  ties = 0;
  round = 0;
  busy = false;

  playerChoiceEl.textContent = "?";
  computerChoiceEl.textContent = "?";
  resultTextEl.textContent = "Ready?";
  roundTextEl.textContent = "Choose your move";
  thinkingEl.textContent = "";
  statusEl.textContent = "Pick Rock, Paper or Scissors to start.";

  updateScores();

  gameOverEl.classList.add("hidden");
  moveButtons.forEach(button => button.disabled = false);
}
