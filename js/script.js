//Show time
const time = document.querySelector('.time');

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
    showDate();
    showGreeting();
}

//Show date
const date = document.querySelector ('.date');

function showDate() {
    const localDate = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = localDate.toLocaleDateString('en-US',options);
    date.textContent = currentDate;
}

//Greeting
const greeting = document.querySelector('.greeting');

function showGreeting() {
    const date = new Date();
    const hours = date.getHours();
    const timeOfDay = getTimeOfDay(hours);
    const greetingText = `Good ${timeOfDay}`;
    greeting.textContent = greetingText;
}

function getTimeOfDay(param) {
    if(param <= 3) {
        return 'night';
    } else if (param > 3 && param < 10) {
        return 'morning';
    } else if (param >= 10 && param < 18) {
        return 'day';
    } else if (param >= 18) {
        return 'evening';
    }
}

//Entered and save message
const name = document.querySelector('.name');

function setLocalStorage() {
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage)


function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()* (max - min)) + min;
}

function setBg() {
    let timeOfDay = getTimeOfDay();
    let bgNum = getRandomNum(1, 20).toString().padStart(2, "0");
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/${bgNum}.jpg')`;
}

const body = document.querySelector('body');

getRandomNum(1, 20)
showTime()
setBg()