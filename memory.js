const cards = document.querySelectorAll('.card');
console.log(cards);
let toggledCards = [];
let moves = 0; 
let clockOff = true;
let time = 0;
let clockId; 
let matched = 0;
const TOTAL_PAIRS = 8;

const deck = document.querySelector('.deck');
deck.addEventListener('click', event => {
	const clickTarget = event.target;
	if (clickTarget.classList.contains('card') && toggledCards.length < 2 && !toggledCards.includes(clickTarget)) {
		toggleCard(clickTarget); 
		addToggleCard(clickTarget);
		if (toggledCards.length === 2) {
			checkForMatch(clickTarget);
			addMove();
			checkScore();
		}
	} 
	if(isClickValid(clickTarget)) {
		if(clockOff) {
			startClock();
			clockOff = false;
		}
	}
}); 

if (matched === TOTAL_PAIRS) {
	gameOver();
}

function toggleCard(card) {
	card.classList.toggle('open');
	card.classList.toggle('show');
} 

function addToggleCard(clickTarget) {
	toggledCards.push(clickTarget);
	console.log(toggledCards);
} 

function checkForMatch() {
	if (toggledCards[0].firstElementChild.className ===
		toggledCards[1].firstElementChild.className) {
			toggledCards[0].classList.toggle('match');
			toggledCards[1].classList.toggle('match');
			toggledCards = [];
			matched++;
		}else{
			setTimeout(() => {
				toggleCard(toggledCards[0]);
				toggleCard(toggledCards[1]);
				toggledCards = [];
		}, 1000);
	} 	
}

function isClickValid(clickTarget) {
	return (
		clickTarget.classList.contains('card') &&
		!clickTarget.classList.contains('match') &&
		toggledCards.length < 2 &&
		!toggledCards.includes(clickTarget)
	);
} 

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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


//Shuffle Cards
function shuffleDeck() {
	const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
	const shuffledCards = shuffle(cardsToShuffle);
	for (card of shuffledCards) {
		deck.appendChild(card);
	}
} 
shuffleDeck(); 

// Number of moves
function addMove() {
	moves++;
	const movesText = document.querySelector('.moves');
	movesText.innerHTML = moves;
} 



// Stars
function hideStar() {
	const starList = document.querySelectorAll('.stars li');
	for (star of starList) {
		if (star.style.display !== 'none') {
			star.style.display = 'none';
			break;
		}
	}
} 

hideStar();
hideStar();

function checkScore() {
	if (moves === 16 || moves === 24) {
		hideStar();
	}
} 

// Clock 
function startClock() { 
	    clockId = setInterval(() => {
		time++;
		displayTime();
		console.log(time);
		
	}, 1000);
}
startClock(); 

function displayTime() {
	const clock = document.querySelector('.clock');
	console.log(clock);
	clock.innerHTML = time; 
	
	if(seconds < 10) {
		clock.innerHTML = `${minutes}:0${seconds}`;
	}else{
		clock.innerHTML = `${minutes}:${seconds}`;
	}
}

const minutes = Math.floor(time / 60);
const seconds = Math.floor(time % 60);

function stopClock() {
	clearInterval(clockId);
} 


// Toggle modal on and off
function toggleModal() {
	const modal = document.querySelector('.modal_background');
	modal.classList.toggle('hide');
} 

toggleModal(); // Open modal
toggleModal(); // Close modal 

// Modal Stats

time = 121;
displayTime();
moves = 16;
checkScore();

toggleModal();

writeModalStats();
toggleModal();

function writeModalStats() {
	const timeStat = document.querySelector('.modal_time');
	const clockTime = document.querySelector('.clock').innerHTML;
	const movesStat = document.querySelector('.modal_moves');
	const starsStat = document.querySelector('.modal_stars');
	const stars = getStars();
	
	timeStat.innerHTML = `Time = ${clockTime}`;
	movesStat.innerHTML = `Moves = ${moves}`;
	starsStat.innerHTML = `Stars = ${stars}`;
}

function getStars() {
	stars = document.querySelectorAll('.stars li');
	starCount = 0;
	for (star of stars) {
		if(star.style.display !== 'none') {
			starCount++;
		}
	} 
	console.log(starCount);
	return starCount;
}

document.querySelector('.button_cancel').addEventListener('click', () => {
	toggleModal();
});

document.querySelector('.button_replay').addEventListener('click', replayGame);

function resetGame() {
	resetClock();
	resetMoves();
	resetStars();
	shuffleDeck();
} 

document.querySelector('.restart').addEventListener('click', resetGame);
document.querySelector('.button_replay').addEventListener('click', resetGame);

function resetClock(){
	stopClock();
	clockOff = true;
	time = 0;
	displayTime();
} 

function resetMoves() {
	moves = 0;
	document.querySelector('.moves').innerHTML = moves;
} 

function resetStars() {
	stars = 0;
	const starList = document.querySelectorAll('.stars li');
	for (star of starList) {
		star.style.display = 'inline';
	}
} 

function gameOver() {
	stopClock();
	writeModalStats();
	toggleModal();
} 

function replayGame() {
	resetGame();
	toggleModal();
} 

document.querySelector('.button_replay').addEventListener('click', replayGame);

function resetCards() {
	const cards = document.querySelectorAll('.deck li');
	for(let card of cards) {
		card.className = 'card';
	}
}

