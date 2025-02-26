
const gameState = {
    selectedCategory: '',
    difficulty: 'easy',
    score: 0,
    timeLeft: 30,
    timer: null,
    cardsFlipped: 0,
    firstCard: null,
    secondCard: null,
    lockBoard: false,
    matchedPairs: 0,
    totalPairs: 8,
    soundEnabled: true,
    gameInProgress: false
};

const audio = {
    flip: new Audio("data:audio/wav;base64,UklGRpQFAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YXAFAACAgICAgICAgICAgICAgICAgICAgICAgICAf3hxeH+AfXZ1eHx6fX58e3t9f4CEgoGDg4OEgoGDg4OEgoF+gIKDg4OCgYCAgIKDgn96eXl7fHx9fHp5eXl8f4B/gIB/f3+AgICAgH9+f39/gIB/fn5/f4CAgH9+f3+AgICAf35/f4CAgIB/fn+AgICAgH9+f4CAgICAf35/gICAgIB/fn+AgICAgH9+f4CAgIB/f35/gICAgH9/fn+AgICAf39+f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f4CAgICAfn5+f4CAgIB+fn9/gICAgH5+f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/f4CAgIB/f39/gICAgH9/f3+AgICAf39/gICBgn+AfXt5fHp7fX9/fog="),
    match: new Audio("data:audio/wav;base64,UklGRiQDAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQADAACBgIF/gn2Cf4B9gH9/fX9/fn2Af359gH9+fYB/fn2AgH99gIB/fYGAf32BgX99goJ/fYKCf32Cg399goN/fYKDf32ChH99g4R/fYOEf32EhH99hIV/fYWFf32Ghn99hod/fYeHf32IiH99iIl/fYmJf32Kin99iot/fYuLf32MjH99jIx/fY2Nf32Ojn99j49/fZCQf32Rkn99kpJ/fZOTf32Uk399lZZ/fZaWf32Xl399mJl/fZmZf32amn99m5x/fZycf32dnn99np5/fZ+gf32goH99oaJ/faKif32jpH99pKR/faWlf32mp399p6h/faipf32qqn99q6t/faysf32trn99rq5/fa+wf32wsH99sbJ/fbKyf32ztH99tLR/fbW2f322tn99t7h/fbi4f32Af4F/gIF/gIGBf4CCgX+AgoF/gIOCf4CDgn+AhIJ/gISCf4CFg3+AhYN/gIaDf4CGg3+Ah4R/gIeEf4CIhH+AiIR/gImFf4CJhX+AioV/gIqFf4CLhn+Ai4Z/gIyGf4CMhn+AjYd/gI2Hf4COh3+Ajod/gI+If4CPiH+AkIh/gJCIf4CRiX+AkYl/gJKJf4CSiX+Ak4p/gJOKf4CUin+AlIp/gJWLf4CVi3+Alot/gJaLf4CXjH+Al4x/gJiMf4CYjH+AmY1/gJmNf4Cajf+Amo1/gJuOf4Cbjn+AnI5/gJyOf4Cdj3+AnY9/gJ6Pf4Cej3+An5B/gJ+Qf4CgkH+AoJB/gKGRf4ChkX+AopF/gKKRf4Cjkn+Ao5J/gKSSf4Ckkn+ApZN/gKWTf4Cmk3+AppN/gKeTf4Cnk3+AqJR/gKiUf4CplH+AqZR/gKqUf4CqlH+Aq5V/gKuVf4CslX+ArJV/gK2Vf4CtlX+arpZ/gK6Wf4Cvln+Ar5Z/gLCWf4Cwln+AsZd/gLGXf4Cyl3+Aspd/gLOXf4Czl3+AtJh/gLSYf4C1mH+AtZh/gLaYf4C2mH+At5l/gLeZf4C4mX+AuJl/gLmZf4C5mX+Aupp/gLqaf4C7mn+Au5p/gLyaf4C8mn+AvZt/gL2bf4C+m3+Avpt/gA=="),
    win: new Audio("data:audio/wav;base64,UklGRjQFAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YRQFAAB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+f4B/g4ODg4OCg4GFgoGCfYF8fXx6enh6eHp6eH16fH6Dg4OFhoSEhoWFhoWGhYSEgYB/fn59fXx9fXx9fX5/gIGCgoGCgoKDg4KCgYGAgH9/fn59fXx9fX1+fn9/f4CAgICAgIGAgICAgH9/f39/fn5+fn5+fn5+fn5/f39/f39/f39/f39/f39/f35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f4B/gH+Af39/f39/f39/f39/f39/f39/f39/f39/f3Z2c25nYFhRRUA5MScgGBAHAO/h1snCtqynoJybmqCjq7K7xs3Y4+z2BAsTGiAcGA4D9+bVwquUe2BDJg0A9u7m3dbOx8G7tbCsqaampKKhoJ+enZycm5qZmJeWlZSUlJSUlZaXmJqcnZ+hpKerrrK2ur7CxcjLzdDT1dfa3eDj5unr7/L19/n7/f8BBQcLDREVGR0hJSksLjEzNDY3ODk6Ozw9PT4+Pz8/QEBBQUJCQkNDQ0NDQ0NDQ0NDREVFRkdISUpLTU5PUVJUVVdYWVpbXF1dXl5fX19fYGBgYGBgYGBfX19fXl5dXFxbW1pZWVhXV1dWVlZWVlZXV1dYWVlaW1xdXl9gYWJjZGRlZWZmZmZmZmZmZmZmZWVlZGRjYmJhYGBfX15eXV1cXFtbWlpaWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVpbW1xdXl9fYGFiYmNjZGRkZGRkY2NjYmJiYWFgYF9fXl5dXVxcW1taWlpaWlpaWlpaWlpaWlpaWlpaWltbW1tcXFxdXV1eXl5eXl9fX19fX19fX19fX19fXl5eXl5dXV1cXFxbW1tbW1tbW1tbW1tbW1tbW1tbW1xcXFxcXFxdXV1dXV1dXV1"),
}

const categories = {
fruits: ['🍎', '🍌', '🍇', '🍊', '🍓', '🍑', '🍍', '🥭', '🥝', '🍒'],
emojis: ['😀', '😎', '🥳', '😍', '🤔', '😴', '🥶', '😱', '🤣', '😇'],
animals: ['🐶', '🐱', '🐼', '🦊', '🦁', '🐯', '🐮', '🐷', '🦄', '🐢'],
planets: ['🌎', '🪐', '☀️', '🌙', '⭐', '🌟', '☄️', '🌠', '🌌', '🚀'],
flags: ['🇺🇸', '🇯🇵', '🇬🇧', '🇨🇦', '🇧🇷', '🇫🇷', '🇮🇳', '🇪🇸', '🇮🇹', '🇦🇺'],
Food: ['🥪', '🌯', '🍕', '🍔', '🥮', '🌮', '🌭', '🍘', '🍟', '🍝']
};

const landingPage = document.getElementById('landing-page');
const gameContainer = document.getElementById('game-container');
const cardsGrid = document.getElementById('cards-grid');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const messageContainer = document.getElementById('message-container');
const messageTitle = document.getElementById('message-title');
const messageContent = document.getElementById('message-content');
const playAgainBtn = document.getElementById('play-again-btn');
const homeBtn = document.getElementById('home-btn');
const backBtn = document.getElementById('back-btn');
const soundToggle = document.getElementById('sound-toggle');
const categoryButtons = document.querySelectorAll('.category-btn');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');
const STORAGE_KEY = 'memoryMatchGameState';

function init() {

    loadGameState();
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            gameState.selectedCategory = button.dataset.category;
            startGame();
    });
});

difficultyButtons.forEach(button => {
    button.addEventListener('click', () => {
        difficultyButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
            gameState.difficulty = button.dataset.difficulty;
});
});

backBtn.addEventListener('click', goToHome);
playAgainBtn.addEventListener('click', () => {
    messageContainer.classList.remove('show');
    startGame();
});

homeBtn.addEventListener('click', () => {
    messageContainer.classList.remove('show');
    goToHome();
});

soundToggle.addEventListener('click', toggleSound);


if (gameState.gameInProgress) {
resumeGame();
}
}

function startGame() {
    gameState.score = 0;
    gameState.cardsFlipped = 0;
    gameState.firstCard = null;
    gameState.secondCard = null;
    gameState.lockBoard = false;
    gameState.matchedPairs = 0;
    gameState.gameInProgress = true;
    switch(gameState.difficulty) {
    case 'easy':
        gameState.timeLeft = 60;
        gameState.totalPairs = 8;
        break;
    case 'medium':
        gameState.timeLeft = 45;
        gameState.totalPairs = 8;
        break;
    case 'hard':
        gameState.timeLeft = 30;
        gameState.totalPairs = 8;
        break;
    }
    scoreElement.textContent = gameState.score;
    timerElement.textContent = gameState.timeLeft;

    landingPage.style.display = 'none';
    gameContainer.style.display = 'block';
    createCards();
        if (gameState.timer) clearInterval(gameState.timer);
            gameState.timer = setInterval(updateTimer, 1000);
    saveGameState();
}
function createCards() {
    cardsGrid.innerHTML = '';

    const categoryItems = categories[gameState.selectedCategory];
    const selectedItems = [...categoryItems].sort(() => 0.5 - Math.random()).slice(0, gameState.totalPairs);
    const cardPairs = [...selectedItems, ...selectedItems];

    const shuffledCards = cardPairs.sort(() => 0.5 - Math.random());

shuffledCards.forEach((item, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.item = item;
    card.dataset.index = index;

    card.innerHTML = `
        <div class="card-front">
            ${item}
        </div>
        <div class="card-back">
            ?
        </div>
    `;

    card.addEventListener('click', flipCard);
    cardsGrid.appendChild(card);
});
}

function flipCard() {
    if (gameState.lockBoard) return;
    if (this === gameState.firstCard) return;
    if (gameState.soundEnabled) {
    audio.flip.currentTime = 0;
    audio.flip.play();
    }

    this.classList.add('flipped');

    if (!gameState.firstCard) {
        gameState.firstCard = this;
        return;
    }

    gameState.secondCard = this;
    checkForMatch();
}


function checkForMatch() {
    const isMatch = gameState.firstCard.dataset.item === gameState.secondCard.dataset.item;

    if (isMatch) {
        disableCards();
        updateScore(10);
    } else {
    unflipCards();
        updateScore(-2);
    }


    saveGameState();
}

function disableCards() {
    gameState.firstCard.classList.add('matched');
    gameState.secondCard.classList.add('matched');

    gameState.firstCard.removeEventListener('click', flipCard);
    gameState.secondCard.removeEventListener('click', flipCard);

    if (gameState.soundEnabled) {
        audio.match.currentTime = 0;
        audio.match.play();
    }

    gameState.matchedPairs++;
    if (gameState.matchedPairs === gameState.totalPairs) {
        clearInterval(gameState.timer);
        if (gameState.soundEnabled) {
            audio.win.currentTime = 0;
            audio.win.play();
    }

    const timeBonus = gameState.timeLeft * 2;
    updateScore(timeBonus);

    setTimeout(() => {
        showMessage('You Win!', `Your score: ${gameState.score}<br>Time bonus: +${timeBonus}<br>Total score: ${gameState.score}`, 'success');
        
        
        gameState.gameInProgress = false;
        saveGameState();
    }, 1000);
    }

    resetBoard();
}
function unflipCards() {
gameState.lockBoard = true;

setTimeout(() => {
gameState.firstCard.classList.remove('flipped');
gameState.secondCard.classList.remove('flipped');

gameState.firstCard.classList.add('shake');
gameState.secondCard.classList.add('shake');


setTimeout(() => {
    gameState.firstCard.classList.remove('shake');
    gameState.secondCard.classList.remove('shake');
    resetBoard();
}, 600);
}, 1000);
}


function resetBoard() {
[gameState.firstCard, gameState.secondCard] = [null, null];
gameState.lockBoard = false;
}


function updateScore(points) {
    gameState.score += points;
    if (gameState.score < 0) gameState.score = 0;
    scoreElement.textContent = gameState.score;
    scoreElement.classList.add('pulse');
    setTimeout(() => {
        scoreElement.classList.remove('pulse');
    }, 600);
}


function updateTimer() {
gameState.timeLeft--;
timerElement.textContent = gameState.timeLeft;


saveGameState();

if (gameState.timeLeft <= 5) {
timerElement.style.color = 'red';
} else {
timerElement.style.color = '';
}

if (gameState.timeLeft <= 0) {
    clearInterval(gameState.timer);
    showMessage('Time\'s Up!', `Your score: ${gameState.score}`, 'error');
    gameState.gameInProgress = false;
    saveGameState();
}
}
function showMessage(title, content, type = '') {
messageTitle.textContent = title;
messageContent.innerHTML = content;

const messageBox = document.querySelector('.message-box');
messageBox.className = 'message-box';
if (type) messageBox.classList.add(type);

messageContainer.classList.add('show');
}


function goToHome() {
    if (gameState.timer) clearInterval(gameState.timer);
    gameContainer.style.display = 'none';
    landingPage.style.display = 'block';
    gameState.gameInProgress = false;
saveGameState();
}
function toggleSound() {
gameState.soundEnabled = !gameState.soundEnabled;
soundToggle.textContent = gameState.soundEnabled ? '🔊' : '🔇';
saveGameState();
}
function saveGameState() {
const state = {
selectedCategory: gameState.selectedCategory,
difficulty: gameState.difficulty,
score: gameState.score,
timeLeft: gameState.timeLeft,
matchedPairs: gameState.matchedPairs,
totalPairs: gameState.totalPairs,
gameInProgress: gameState.gameInProgress,
soundEnabled: gameState.soundEnabled
};

localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
function loadGameState() {
const savedState = localStorage.getItem(STORAGE_KEY);

if (savedState) {
    const state = JSON.parse(savedState);

    gameState.selectedCategory = state.selectedCategory || gameState.selectedCategory;
    gameState.difficulty = state.difficulty || gameState.difficulty;
    gameState.score = state.score || 0;
    gameState.timeLeft = state.timeLeft || 30;
    gameState.matchedPairs = state.matchedPairs || 0;
    gameState.totalPairs = state.totalPairs || 8;
    gameState.gameInProgress = state.gameInProgress || false;
    gameState.soundEnabled = state.soundEnabled !== undefined ? state.soundEnabled : true;

    soundToggle.textContent = gameState.soundEnabled ? '🔊' : '🔇';
    difficultyButtons.forEach(btn => {
        if (btn.dataset.difficulty === gameState.difficulty) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    }
}

function resumeGame() {
    landingPage.style.display = 'none';
    gameContainer.style.display = 'block';
    scoreElement.textContent = gameState.score;
    timerElement.textContent = gameState.timeLeft;
createCards();
    if (gameState.timer) clearInterval(gameState.timer);
        gameState.timer = setInterval(updateTimer, 1000);
}
window.addEventListener('load', init);