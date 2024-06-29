// Select all the cards from the HTML file
const cards = document.querySelectorAll(".memory-card");

const hariPotterBtn = document.querySelector(".hariPotterBtn");
const catsBtn = document.querySelector(".catsBtn");
const dogsBtn = document.querySelector(".dogsBtn");

// Flag for letting us know if a card already been fliped
let hasFlippedCard = false;

// Flag for locking the borad when two cards been fliped
// Prevent us from flipping more cards when our app calculte the results
let lockBoard = false;

// Variables for saving the current card selections after the user choosed to flip them
let firstCard, secondCard;

// function for fliping the card
function flipCard() {
  // We don't allow to flip the card if the lockBoard is true
  if (lockBoard) return;
  // We don't allow to flip the card if we already flipped this card
  if (this === firstCard) return;
  
  // adding the class flip to the selected card
  this.classList.add("flip");
  
  // If we don't already fliped a card (first card been fliped)
  if (!hasFlippedCard) {
    // Flag to true -> flipped a card and save to firstCard the seleceted card
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  
  // If we already fliped a card (second card been fliped)
  // save to secondCard the seleceted card
  secondCard = this;
  // Call checkForMatch() method to see if cards are matched
  checkForMatch();
}

function checkForMatch() {
  // dataset will contain all the HTML properties that has "data-{name}"
  // we can get those properties by calling element.dataset.{name}
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  
  // if the dataset name of the two cards is the same -> we will call disableCards()
  // else -> we will call unflipCards()
  isMatch ? disableCards() : unflipCards();
}

// Function that will make sure that we can't flip the cards again in the game
// the fucntion is removing the eventListener for "click" from both cards
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  
  // we should call reset to make sure that the user can now chose again two cards
  resetBoard();
}

// Function that will unflip the selected cards incase they are not matched
function unflipCards() {
  // during the unflip time we don't want to allow the user to flip other cards
  // so lockBoard should be true
  lockBoard = true;
  
  // the unflip functionality is by removing the "flip" class from both cards and reset the board
  // we want to start this logic only 1.5 seconds after the unflipCards() was triggered
  // because if we won't do it our app will imedietly flip the cards before we will be able to see it
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

// Function that should reset all flags back to false and all card variables back to null
function resetBoard() {
  // [hasFlippedCard, lockBoard] = [false, false];
  hasFlippedCard = false;
  lockBoard = false;
  // [firstCard, secondCard] = [null, null];
  firstCard = null;
  secondCard = null;
}


const HariPotter_URL = "https://hp-api.onrender.com/api/characters";
const Cats_URL = "https://api.thecatapi.com/v1/images/search?limit=10";
const Dogs_URL = "https://dog.ceo/api/breeds/image/random/6";

function doHariPotterAPI(){
  fetch(HariPotter_URL)
  .then(response => response.json())
  .then(data => createHariPotterCardsList(data))
  .catch(err => console.log(err))
}

function doCatsAPI(){
  fetch(Cats_URL)
  .then(response => response.json())
  .then(data => createCatsCardsList(data))
  .catch(err => console.log(err))
}

function doDogsAPI(){
  fetch(Dogs_URL)
  .then(response => response.json())
  .then(data => createDogsCardsList(data))
  .catch(err => console.log(err))
}

function createHariPotterCardsList(data) {
  // take a 6 random cards from the api server
  let cardsList = [];
  for (let i = 0; i < 6; i++){
    let random = Math.floor(Math.random() * 21);
    let card = data[random];
    cardsList.push(card);
  }
  // update the src of the cards on the board with cards src from api
  let images = [];
  cards.forEach((card) => {
    let img = card.querySelector(".front-face")
    images.push(img);
  });
  for (let i = 0; i < 12; i++){
    let img = images[i];
    img.src = cardsList[Math.floor(i / 2)].image;
  }
}

function createCatsCardsList(data){
    // take a 6 random cards from the api server
    let cardsList = [];
    for (let i = 1; i < 7; i++){
      let card = data[i];
      cardsList.push(card);
    }
    // update the src of the cards on the board with cards src from api
    let images = [];
    cards.forEach((card) => {
      let img = card.querySelector(".front-face")
      images.push(img);
    });
    for (let i = 0; i < 12; i++){
      let img = images[i];
      img.src = cardsList[Math.floor(i / 2)].url;
    }
}
  
  function createDogsCardsList(data){
    // update the src of the cards on the board with cards src from api
    let images = [];
    cards.forEach((card) => {
      let img = card.querySelector(".front-face")
      images.push(img);
    });
    for (let i = 0; i < 12; i++){
      let img = images[i];
      img.src = data.message[Math.floor(i / 2)];
    }
} 

  // This function shuffles the cards
  // we are calling this fucntion imidietly when the game start and this is why we have () in the end of the function
  (function() {
    cards.forEach((card) => {
      // create a random number between 0 - 11
      let randomPos = Math.floor(Math.random() * 12);
      // The order property specifies the order of a flexible item relative to the rest of the flexible items inside the same container.
      // If we will get the same number we will position it next to the previus card that got the same number
      card.style.order = randomPos;
    });
  })();
  
  // we will add a "click" event listener that will trigger flipCard on every card element
  cards.forEach((card) => card.addEventListener("click", flipCard));
  hariPotterBtn.addEventListener("click",doHariPotterAPI);
  catsBtn.addEventListener("click",doCatsAPI);
  dogsBtn.addEventListener("click",doDogsAPI);