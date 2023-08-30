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

const bossIcons = ["😡", "😠", "😐", "🙂", "🙂"];

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
    document.getElementById(id).classList.remove("none");
    document.getElementById("survival-time").textContent = survivalTime;
    document.getElementById("survival-time2").textContent = survivalTime;
}

updateView();

// Controller
function getWidth(value) {
    let percentage = value / 1000;
    return `${percentage * 265}px`;
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
    } else {
        sleepAmount = 2;
        sleepButtonContent = /*html*/ `
            🇼​​​​​🇦​​​​​🇰​​​​​🇪​​​​​ 🇺​​​​​🇵​​​​​<br>​​​​💤
        `;
        coffeeButton.disabled = true;
        showerButton.disabled = true;
        foodButton.disabled = true;
    }
    updateView();
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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

function startIntervals() {
    coffeeNeed = getRandomNum(600, 1000);
    showerNeed = getRandomNum(600, 1000);
    foodNeed = getRandomNum(600, 1000);
    sleepNeed = getRandomNum(600, 1000);
    coffeeInterval = setInterval(decreaseCoffee, 12);
    showerInterval = setInterval(decreaseShower, 25);
    foodInterval = setInterval(decreaseFood, 15);
    sleepInterval = setInterval(changeSleep, 20);
    bossInterval = setInterval(decreaseBoss, 30);
    startInterval = setInterval(checkStatus, 100);
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

function startGame() {
    startIntervals();
    document.getElementById("disableButton").classList.add("none");
    document.getElementById("coffeeButton").classList.remove("none");
    document.getElementById("showerButton").classList.remove("none");
    document.getElementById("foodButton").classList.remove("none");
    document.getElementById("sleepButton").classList.remove("none");
}

function doorBanging() {
    soundPlaying = true;
    const doorBanging = document.getElementById("door-banging");
    const doorBreak = document.getElementById("door-break");
    doorBanging.volume = 0.5;
    doorBreak.volume = 0.3;
    doorBanging.play();
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

/*

TODO

Boss
Figuren
Death/fired (game over)

*/
