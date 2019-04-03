
let hasFlippedCard = false;
let lockBoard = false; //To stop the user from picking more than 2 cards
let firstCard, secondCard;

//This is where the game starts
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;//prevents the user from double clicking on the same card
  this.classList.add('flip');
  console.log(this);

 //Stops the user from flipping the same card twice
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

//Prevent any interaction after the cards match
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

//To return the cards back around after there is no match
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 700);
}

//To make sure that not more than 2 cards are chosen
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//To randomise the positions of the cards on the board  --> Learnt this syntax on ES6(Call right after creating function)
function shuffle(cards) {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}


//_________________________________________This is where Wandile's Edits starts__________________________________________________

function changeDifficulty() {
  const selector = document.getElementById('selector').value;
  loadGame(selector);

}

function loadGame(selection) {
  if (document.getElementById('anything').hasChildNodes()) {
    document.getElementById("anything").removeChild(anything.childNodes[0]);
  }

  const cardPack = ["img\\a.jpg.jpg", "img\\a.jpg.jpg", "img\\body.jpg.jpg",
                  "img\\body.jpg.jpg", "img\\br.jpg.jpg", "img\\br.jpg.jpg",
                  "img\\Class.jpg.jpg", "img\\Class.jpg.jpg", "img\\em.jpg.jpg",
                  "img\\em.jpg.jpg", "img\\html.jpg.jpg", "img\\html.jpg.jpg"];

  const dataSets = ["A", "A", "BODY", "BODY", "BREAK", "BREAK", "CLASS", "CLASS", "EM", "EM", "HTML", "HTML"];
  const coverCard = "img\\ctrlZ.jpg.jpg";

  let section = document.createElement('section');
  section.classList.add('memory-game');
  changeGrid(selection);
  for (var i = 0; i < selection * 2; i++) {
    console.log(i);

    let divs = document.createElement("div");
    divs.classList.add("Card");
    divs.dataset.framework = dataSets[i];

    let imageFront = document.createElement("img");
    imageFront.classList.add("main");
    imageFront.src = cardPack[i];
    divs.appendChild(imageFront);

    let imageBack = document.createElement("img");
    imageBack.classList.add("cover");
    imageBack.src = coverCard;

    divs.appendChild(imageBack);
    section.appendChild(divs);
  }//For loop ends
  document.getElementById('anything').appendChild(section);
  console.log("This works");

  const cards = document.querySelectorAll('.Card');
  shuffle(cards);
  cards.forEach(card => card.addEventListener('click', flipCard));
}

function changeGrid(columns) {
  document.getElementById('anything').style.gridTemplateColumns = "1fr 1fr";
}
