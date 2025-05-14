// Dynamically add audio elements for flip and match sounds
function addAudioElements() {
  const flipSound = document.createElement('audio');
  flipSound.id = 'flip-sound';
  flipSound.src = 'audio/flip.mp3';

  const matchSound = document.createElement('audio');
  matchSound.id = 'match-sound';
  matchSound.src = 'audio/match.mp3';

  document.body.appendChild(flipSound);
  document.body.appendChild(matchSound);
}

// Call this function to ensure audio is available
addAudioElements();

// Select audio elements
const flipSound = document.getElementById('flip-sound');
const matchSound = document.getElementById('match-sound');

// Memory game logic
const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;
const totalPairs = cards.length / 2;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  flipSound.play(); // Play flip sound

  if (!hasFlippedCard) {
    // First click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // Second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if (isMatch) {
    disableCards();
    matchSound.play(); // Play match sound when a pair is matched
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  matchedPairs++;

  // Check if all pairs are matched
  if (matchedPairs === totalPairs) {
    navigateToCongratsPage();
  }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Shuffle cards
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

// Navigate to Congrats Page
function navigateToCongratsPage() {
  window.location.href = 'congrats.html'; // Replace with your desired page URL
}
