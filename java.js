"use strict";
//Variables-------------------------------------------------------
let setValueInput = document.querySelector(".input-value");
let thrHoldValue = document.querySelector(".thresh-score");
let setValueBtn = document.querySelector(".btn-set-value");
let newGameBtn = document.querySelector(".btn-new");
let name1 = document.getElementById("name-0");
let name2 = document.getElementById("name-1");
let rollDiceBtn = document.querySelector(".btn-roll");
let dice1 = document.querySelector(".die1");
let dice2 = document.querySelector(".die2");
let holdBtn = document.querySelector(".btn-hold");
let player1Current = document.getElementById("current-0");
let player2Current = document.getElementById("current-1");
let player1Score = document.getElementById("score-0");
let player2Score = document.getElementById("score-1");
let player1Panel = document.querySelector(".player-0-panel");
let player2Panel = document.querySelector(".player-1-panel");
let number_1;
let number_2;
let player1Totalscore = 0;
let player2Totalscore = 0;
let currentScore = 0;
let thrValue = 100;
let gamePlaying = true;
let activePlayer = 0;

//My App---------------------------------------------------------

setValueBtn.addEventListener("click", () => {
  if (setValueInput.value != 0 && setValueInput.value >= 50){
    thrHoldValue.textContent = setValueInput.value;
    thrValue = setValueInput.value;
  }
  setValueInput.value = "";
  disableChangeThrValu();
});

rollDiceBtn.addEventListener("click", () => {
  if (gamePlaying) {
    disableChangeThrValu();

    rollDice();

    if (number_1 == 1 || number_2 == 1) {
      changeplayer();
      currentScore = 0;
    } else {
      currentScore += number_1 + number_2;
      if (activePlayer == 1) {
        player2Current.textContent = currentScore;
      } else {
        player1Current.textContent = currentScore;
      }
    }
  } else alert("Please Start New Game");
});

holdBtn.addEventListener("click", () => {
  if (gamePlaying) {
    if (activePlayer == 1) {
      player2Totalscore += currentScore;
      player2Score.textContent = player2Totalscore;
      if (player2Totalscore >= thrValue) winner();
    } else {
      player1Totalscore += currentScore;
      player1Score.textContent = player1Totalscore;
      if (player1Totalscore >= thrValue) winner();
    }
    currentScore = 0;
    changeplayer();
  } else alert("Please Start New Game");
});

newGameBtn.addEventListener("click", () => {
  init();
});

//Functions--------------------------------------------------------------

function rollDice() {
  number_1 = Math.floor(Math.random() * 6) + 1;
  number_2 = Math.floor(Math.random() * 6) + 1;

  dice1.src = "./assets/die" + number_1 + ".png";
  dice2.src = "./assets/die" + number_2 + ".png";
}

function changeplayer() {
  if (activePlayer == 1) {
    activePlayer = 0;
    player1Panel.classList.toggle("active");
    player2Panel.classList.toggle("active");
    player2Current.textContent = 0;
  } else {
    activePlayer = 1;
    player1Panel.classList.toggle("active");
    player2Panel.classList.toggle("active");
    player1Current.textContent = 0;
  }
}

function winner() {
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.add("winner");
  document.getElementById("name-" + activePlayer).textContent = "WINNER !";
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.remove("active");
  gamePlaying = false;
}

function disableChangeThrValu() {
  setValueBtn.innerHTML = "Game Started";
  setValueBtn.disabled = true;
  setValueInput.placeholder = ""
  setValueInput.disabled = true;
}

function init() {
  gamePlaying = true;
  thrValue = 100;
  thrHoldValue.textContent = "100";
  player1Score.textContent = "0";
  player2Score.textContent = "0";
  player1Totalscore = 0;
  player2Totalscore = 0;
  player1Current.textContent = "0";
  player2Current.textContent = "0";
  currentScore = 0;
  name1.textContent = "Player 1";
  name2.textContent = "Player 2";
  player2Panel.classList.remove("active");
  player1Panel.classList.add("active");
  player1Panel.classList.remove("winner");
  player2Panel.classList.remove("winner");
  dice1.src = "./assets/die6.png";
  dice2.src = "./assets/die6.png";
  setValueBtn.innerHTML = `<i class="ion-ios-checkmark"></i>Set value`;
  setValueBtn.disabled = false;
  setValueInput.disabled = false;
}
//------------------------------------------------------------------------
