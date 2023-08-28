// Model
const coffeeBar = document.getElementById("coffeeProgress");
const showerBar = document.getElementById("showerProgress");
const foodBar = document.getElementById("foodProgress");
const sleepBar = document.getElementById("sleepProgress");

const coffeeIcon = document.getElementById("coffeeIcon");
const showerIcon = document.getElementById("showerIcon");
const foodIcon = document.getElementById("foodIcon");
const sleepIcon = document.getElementById("sleepIcon");

let coffeeNeed = 1000;
let showerNeed = 1000;
let foodNeed = 1000;
let sleepNeed = 1000;

let coffeeAtZero = 0;
let showerAtZero = 0;
let foodAtZero = 0;
let sleepAtZero = 0;

let coffeeInterval;
let showerInterval;
let foodInterval;
let sleepInterval;

// View
function updateView() {
    // Width: 265px
    coffeeBar.style.width = getWidth(coffeeNeed);
    showerBar.style.width = getWidth(showerNeed);
    foodBar.style.width = getWidth(foodNeed);
    sleepBar.style.width = getWidth(sleepNeed);

    coffeeIcon.classList.toggle("flashing", coffeeNeed < 250);
    showerIcon.classList.toggle("flashing", showerNeed < 250);
    foodIcon.classList.toggle("flashing", foodNeed < 250);
    sleepIcon.classList.toggle("flashing", sleepNeed < 250);
}

updateView();

// Controller
function getWidth(value) {
    let percentage = value / 1000;
    return `${percentage * 265}px`;
}

function tempControllerName() {
    updateView();
}

// Coffee
function decreaseCoffee() {
    if (coffeeNeed > 0) {
        coffeeNeed--;
    } else {
        coffeeAtZero++;
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
    } else {
        showerAtZero++;
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
    } else {
        foodAtZero++;
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
function decreaseSleep() {
    if (sleepNeed > 0) {
        sleepNeed--;
    } else {
        sleepAtZero++;
    }
    updateView();
}

function increaseSleep(amount) {
    if (sleepNeed + amount > 1000) {
        sleepNeed = 1000;
    } else {
        sleepNeed += amount;
    }
    updateView();
}

function startIntervals() {
    coffeeInterval = setInterval(decreaseCoffee, 10);
    showerInterval = setInterval(decreaseShower, 25);
    foodInterval = setInterval(decreaseFood, 10);
    sleepInterval = setInterval(decreaseSleep, 25);
}

//disableButton
function startGame() {
    startIntervals();
    document.getElementById("disableButton").classList.add("none");
    document.getElementById("coffeeButton").classList.remove("none");
    document.getElementById("showerButton").classList.remove("none");
    document.getElementById("foodButton").classList.remove("none");
    document.getElementById("sleepButton").classList.remove("none");
}
