// Model
const coffeeBar = document.getElementById("coffeeProgress");
const showerBar = document.getElementById("showerProgress");
const foodBar = document.getElementById("foodProgress");
const sleepBar = document.getElementById("sleepProgress");
const bossBar = document.getElementById("bossProgress");

const coffeeIcon = document.getElementById("coffeeIcon");
const showerIcon = document.getElementById("showerIcon");
const foodIcon = document.getElementById("foodIcon");
const sleepIcon = document.getElementById("sleepIcon");
const bossIcon = document.getElementById("bossIcon");

const coffeeButton = document.getElementById("coffeeButton");
const foodButton = document.getElementById("foodButton");
const showerButton = document.getElementById("showerButton");
const sleepButton = document.getElementById("sleepButton");

const doorBangingSound = document.getElementById("door-banging");
const doorBreak = document.getElementById("door-break");
const coffeeSound = document.getElementById("coffee-sound");
const foodSound = document.getElementById("food-sound");
const showerSound = document.getElementById("shower-sound");
const sleepSound = document.getElementById("sleep-sound");

const signatures = document.getElementById("signatures");

/* const audio1 = document.getElementById("cred-1");
const audio2 = document.getElementById("cred-2");
const audio3 = document.getElementById("cred-3");
const audio4 = document.getElementById("cred-4");
const audio5 = document.getElementById("cred-5");
const audio6 = document.getElementById("cred-6"); */

const bossIcons = ["😡", "😠", "😐", "🙂", "🙂"];

/* let creditsShowing = false; */

let coffeeNeed = 1000;
let showerNeed = 1000;
let foodNeed = 1000;
let sleepNeed = 1000;
let bossTimer = 1000;
let survivalTime = 0;

let sleepAmount = -1;

let coffeeInterval;
let showerInterval;
let foodInterval;
let sleepInterval;
let bossInterval;
let statusInterval;

let bossIconIndex = 3;
let soundPlaying = false;

let sleepButtonContent = /*html*/ `
    🇸​​​​​🇱​​​​​🇪​​​​​🇪🇵<br>​​​​💤
`;

// View
function updateView() {
    // Width: 265px
    coffeeBar.style.width = getWidth(coffeeNeed);
    showerBar.style.width = getWidth(showerNeed);
    foodBar.style.width = getWidth(foodNeed);
    sleepBar.style.width = getWidth(sleepNeed);
    bossBar.style.width = getWidth(bossTimer);

    coffeeIcon.classList.toggle("flashing", coffeeNeed < 250);
    showerIcon.classList.toggle("flashing", showerNeed < 250);
    foodIcon.classList.toggle("flashing", foodNeed < 250);
    sleepIcon.classList.toggle("flashing", sleepNeed < 250);

    sleepButton.innerHTML = sleepButtonContent;
}

function gameOver(id) {
    sleepSound.loop = false;
    document.getElementById(id).classList.remove("none");
    document.getElementById("survival-time").textContent = survivalTime;
    document.getElementById("survival-time2").textContent = survivalTime;
    coffeeButton.disabled = true;
    showerButton.disabled = true;
    foodButton.disabled = true;
    sleepButton.disabled = true;
}

function toggleCredits() {
    signatures.classList.toggle("none");
    /* creditsShowing = !creditsShowing;
    if (creditsShowing) {
        audio1.play();
        setTimeout(() => {
            audio2.play();
        }, 2500);
        setTimeout(() => {
            audio3.play();
        }, 5000);
        setTimeout(() => {
            audio4.play();
        }, 7500);
        setTimeout(() => {
            audio5.play();
        }, 10000);
        setTimeout(() => {
            audio6.play();
        }, 12500);
    } */
}

updateView();

// Controller
function getWidth(value) {
    let percentage = value / 1000;
    return `${percentage * 530}px`;
}

// Coffee
function decreaseCoffee() {
    if (coffeeNeed > 0) {
        coffeeNeed--;
    }
    updateView();
}

function increaseCoffee(amount) {
    if (coffeeNeed + amount > 1000) {
        coffeeNeed = 1000;
    } else {
        coffeeNeed += amount;
    }
    coffeeSound.volume = 0.17;
    coffeeSound.play();
    updateView();
}

// Shower
function decreaseShower() {
    if (showerNeed > 0) {
        showerNeed--;
    }
    updateView();
}

function increaseShower(amount) {
    showerAtZero = 0;
    if (showerNeed + amount > 1000) {
        showerNeed = 1000;
    } else {
        showerNeed += amount;
    }
    showerSound.volume = 0.08;
    showerSound.play();
    updateView();
}

// Food
function decreaseFood() {
    if (foodNeed > 0) {
        foodNeed--;
    }
    updateView();
}

function increaseFood(amount) {
    if (foodNeed + amount > 1000) {
        foodNeed = 1000;
    } else {
        foodNeed += amount;
    }
    foodSound.volume = 0.05;
    foodSound.play();
    updateView();
}

// Sleep
function changeSleep() {
    if (sleepNeed > 0 && sleepAmount < 0) {
        sleepNeed += sleepAmount;
    } else if (sleepNeed === 0) {
        toggleSleep();
        sleepNeed += sleepAmount;
    } else if (sleepNeed <= 1000) {
        sleepAmount = 2;
        sleepNeed += sleepAmount;
    }
    updateView();
}

function toggleSleep() {
    if (sleepAmount > 0) {
        sleepAmount = -1;
        sleepButtonContent = /*html*/ `
            🇸​​​​​🇱​​​​​🇪​​​​​🇪​​​​​🇵<br>​​​​💤
        `;
        coffeeButton.disabled = false;
        showerButton.disabled = false;
        foodButton.disabled = false;
        sleepSound.loop = false;
    } else {
        sleepAmount = 2;
        sleepButtonContent = /*html*/ `
            🇼​​​​​🇦​​​​​🇰​​​​​🇪​​​​​ 🇺​​​​​🇵​​​​​<br>​​​​💤
        `;
        coffeeButton.disabled = true;
        showerButton.disabled = true;
        foodButton.disabled = true;
        sleepSound.loop = true;
        sleepSound.volume = 0.1;
        sleepSound.play();
    }
    updateView();
}

function decreaseBoss() {
    if (bossTimer > 0) {
        bossTimer--;
    } else if (soundPlaying === false) {
        doorBanging();
    }
    bossIconIndex = Math.floor(bossTimer / 250);
    bossIcon.textContent = bossIcons[bossIconIndex];
}

function checkStatus() {
    if (coffeeNeed === 0 || foodNeed === 0) {
        gameOver("player-dead");
        stopIntervals();
    }
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function startIntervals(speed) {
    coffeeNeed = getRandomNum(600, 1000);
    showerNeed = getRandomNum(600, 1000);
    foodNeed = getRandomNum(600, 1000);
    sleepNeed = getRandomNum(600, 1000);
    coffeeInterval = setInterval(decreaseCoffee, 12 / speed);
    showerInterval = setInterval(decreaseShower, 25 / speed);
    foodInterval = setInterval(decreaseFood, 15 / speed);
    sleepInterval = setInterval(changeSleep, 20 / speed);
    bossInterval = setInterval(decreaseBoss, 30 / speed);
    startInterval = setInterval(checkStatus, 100 / speed);
    survivalInterval = setInterval(() => {
        survivalTime++;
    }, 1000);
}

function stopIntervals() {
    clearInterval(coffeeInterval);
    clearInterval(showerInterval);
    clearInterval(foodInterval);
    clearInterval(sleepInterval);
    clearInterval(bossInterval);
    clearInterval(startInterval);
    clearInterval(survivalInterval);
}

function startGame(speed) {
    startIntervals(speed);
    document.getElementById("startButton-1").classList.add("none");
    document.getElementById("startButton-2").classList.add("none");
    document.getElementById("startButton-3").classList.add("none");
    document.getElementById("coffeeButton").classList.remove("none");
    document.getElementById("showerButton").classList.remove("none");
    document.getElementById("foodButton").classList.remove("none");
    document.getElementById("sleepButton").classList.remove("none");
}

function doorBanging() {
    soundPlaying = true;
    doorBangingSound.volume = 0.5;
    doorBreak.volume = 0.3;
    doorBangingSound.play();
    setTimeout(() => {
        doorBreak.play();
    }, 1500);
    setTimeout(bossEnter, 2400);
}

function bossEnter() {
    if (sleepAmount > 0 || showerNeed === 0) {
        gameOver("player-fired");
        stopIntervals();
    }
    bossTimer = 1000;
    soundPlaying = false;
}
