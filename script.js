const cards = document.querySelectorAll(".memory-card");
const final = document.querySelector(".final");
const congrats = document.querySelector("#congratsSection");
const minute = document.querySelector(".minute");
const second = document.querySelector(".second");
const again = document.querySelector(".again");
const totalTime = document.querySelector("#totalTime");
 const flipsTag = document.querySelector(".flips b"); //+

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false; 
let totalSeconds = 0;
let interval;
let finalTime;
let click = -1;
 let flips = 0; //+



function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    startTime()
    startFlips()//+
    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
  
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
  gameWon();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 100);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function refresh(){
    confirm("Are you sure that?")
    location.reload();
}

function startTime() {
  if (click === -1) {
    interval = setInterval(function () {
      final.innerHTML = "You won in " + finalTime + " time!";
      finalTime = minute.innerHTML + ":" + second.innerHTML;
      totalSeconds++;
      second.innerHTML = pad(totalSeconds % 60);
      minute.innerHTML = pad(parseInt(totalSeconds / 60));
    }, 1000);
  }
  click = 1;
}

function pad(val) {
  const valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

//Winner
function gameWon() {
  if (click < 1) {
    firstCard = e.target;
  }

  if (document.getElementsByClassName("flip").length === 16) {
    congratsSection.classList.replace("hidden", "show");
    clearInterval(interval);
    finalTime = minute.innerHTML + ":" + second.innerHTML;
    final.innerHTML = "You won in " + finalTime + " time!";
    totalTime.innerHTML = finalTime;
  }
  click = 0;
}

//congratulation
again.addEventListener("click", function () {
  congratsSection.classList.replace("show", "hidden");
  location.reload();
});

//Flips
function startFlips(){
  if (document.getElementsByClassName("flip").length < 16) {
    flips++;
    flipsTag.innerText = flips;
  }
  else flips = 0;
}
//flips ++

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
