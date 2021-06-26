const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.querySelector('.score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.querySelector('.settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficutlySelect = document.getElementById('difficulty');

// List of words  for game
const words = [
    'pickin',
    'squeal',
    'nonjournalistic',
    'intelligently',
    'reoccupation',
    'footboard',
    'silesia',
    'nonadhesion',
    'huffily',
    'mammee',
    'pluralization',
    'platypodous',
    'magnetochemistry',
    'abjectness',
    'bedehouses',
    'acetabular',
    'dossier',
    'vicky',
    'grayhound',
    'unopulent',
    'outblown',
    'dismantle',
    'tubal',
    'peonage',
    'noncontinental',
    'nystatin',
    'boots',
    'pressboard',
    'beset',
    'langsyne',
    'gorilla',
    'emanational',
    'overpraise',
    'karami',
    'cruciform',
    'intermammary',
    'showdown',
    'aerating',
    'veinulet',
    'bewail',
    'denham',
    'procensorship',
    'untrailing',
    'ozonous',
    'reperception',
    'noncensored',
    'animalcule', 'acetylating',
    'whisk'
];

// initialise a word
let randomWord;

// Initialise a word
let score = 0;

// Initialise time
let time = 10;


// Set difficulty to value in local storage or medium
let difficulty = localStorage.getItem('difficulty') != null ?
    localStorage.getItem('difficulty') : 'medium';


//Set dificulty set value
difficutlySelect.value = difficulty


// focus on text when starting 
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000)


// Generate Random words
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}


// Update Score
function updateScore() {
    score++;
    scoreEl.innerHTML = score
}

// update time
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';
    if (time === 0) {
        clearInterval(timeInterval);
        // end the game
        gameOver();
    }
}

// Game Over, Show Score and End screen
function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `

    endgameEl.style.display = 'flex'
}

addWordToDOM();

// Event Listener - Typing
text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();
        // clear
        e.target.value = '';



        if (difficulty === 'hard') {
            time += 3;
        } else if (difficulty === 'medium') {
            time += 5;
        } else {
            time += 11;
        }

        updateTime();
    }
})

// Settings  btn click 
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'))

// Settiings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});