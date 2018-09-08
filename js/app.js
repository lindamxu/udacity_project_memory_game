//VARIABLES
/*
 * Create a list that holds all of your cards
 */
const cards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
//Define all other relevant variables
const deck = document.querySelector('.deck');
const repeat = document.querySelector('.restart');
const stars = document.querySelector('.stars');
let hour_clock = document.querySelector('#hour');
let minute_clock = document.querySelector('#minute');
let seconds_clock = document.querySelector('#second');
let movesCounter = document.querySelector('.moves');
let openCards = [];
let moves = 0;
let matchedCards = 0;
let previousEvent = "";
let currentEvent = "";


//TIMER
//begin timer
var seconds = 0;
var timerStart = setInterval(clockTimer, 1000);

//FUNCTIONS
/**
*@description Resets the timer
*/
function resetInterval() {
  seconds = 0;
  clearInterval(timerStart);

  timerStart = setInterval(clockTimer, 1000);
}
/**
*@description Creates the timer function
*/
function clockTimer() {
  ++seconds;
  let hour = Math.floor(seconds/3600);
  let minute = Math.floor((seconds - hour * 3600)/60);
  let final_seconds = seconds - (hour * 3600 + minute * 60);

  hour_clock.innerHTML = hour;
  minute_clock.innerHTML = minute;
  seconds_clock.innerHTML = final_seconds;
}
/**
*@description Initialize the game
*/
function init() {
  movesCounter.innerHTML = 0;
  stars.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;

  const shuffledCards = shuffle(cards);
  for (let i = 0; i < cards.length; i++) {
    const card = document.createElement('li');
    card.classList.add('card');
    card.innerHTML="<i class= '" + shuffledCards[i] + "'</li>";
    deck.appendChild(card);
  }

}
/**
*@description Checks if two cards match
*/
function checksForMatch() {
  console.log(previousEvent.classList);
  console.log(currentEvent.classList);
  console.log(previousEvent.children[0].className);
  console.log(currentEvent.children[0].className);
  //it is a match
  if (previousEvent.children[0].className === currentEvent.children[0].className) {
    previousEvent.classList.add('match');
    currentEvent.classList.add('match');
    matchedCards = matchedCards + 2;
  }
  //it is not a match
  else {
    setTimeout(function() {
      previousEvent.classList.remove('open');
      previousEvent.classList.remove('show');
      currentEvent.classList.remove('open');
      currentEvent.classList.remove('show');
    }, 200);

  }
  //resets opened cards
  openCards = [];

}
/**
*@description Opens/closes cards upon clicks or unclicks
*@param{event} evt
*/
function openCard(evt) {
  //CLICKS A CARD
  if (evt.target.nodeName === 'LI' && evt.target.classList.length === 1) {
    evt.target.classList.add('open');
    evt.target.classList.add('show');
    openCards.push(evt.target.children[0].className);
    //saves the first opened card
    if (openCards.length === 1) {
      previousEvent = evt.target;
    }
    //saves the second opened card
    if (openCards.length === 2) {
      currentEvent = evt.target;
      moves++;
      movesCounter.innerHTML = moves;
      if ( moves < 10 ) {
        stars.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`
      }
      else if (moves > 10 && moves < 15) {
        stars.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`
      }
      else if (moves > 15) {
        stars.innerHTML = `<li><i class="fa fa-star"></i>`;
      }
      //if there are two opened cards, check if there are a match
      checksForMatch();

      //check if the game is over
      setTimeout( function () {
        if (matchedCards == cards.length) {
          alert("CONGRATULATIONS! YOU'VE WON! Do you want to play again? You have " + stars.classList.length + " stars, and you took ");
          clearInterval(timerStart);
        }
      }, 500);
    }
    //there is never more than two opened cards that is checked for a match
    if (openCards.length > 2) {
      openCards = [];
    }
  }
  //UNCLICKS A CARD
  else if (evt.target.nodeName === 'LI' && evt.target.classList.length > 1) {
    evt.target.classList.remove('open');
    evt.target.classList.remove('show');
    let deleteIndex = openCards.indexOf(evt.target.children[0].className);
    openCards.splice(deleteIndex, 1);
  }
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


/**
*@description Shuffle function from http://stackoverflow.com/a/2450976
*@param{array} array
*/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/**
*@description starts the game over
*/
function startOver() {
  deck.innerHTML= " ";
  init();
  resetInterval();
}

//EVENT LISTENERS
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
/**
*@description listens for a card to be clicked
*/
deck.addEventListener('click', function (evt) {
  openCard(evt);
});

/**
*@description listens for the "replay" button to be clicked
*/
repeat.addEventListener('click', startOver);


//MAIN
/**
*@description calls the init() function to begin the game
*/
init();
