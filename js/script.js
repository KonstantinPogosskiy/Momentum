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

//Slides
const body = document.querySelector('body');
let randomNum = getRandomNum();

function getRandomNum() {
    min = Math.ceil(1);
    max = Math.floor(20);
    return Math.floor(Math.random()* (20 - 1)) + 1;
}

function setBg() {
    const date = new Date();
    const hours = date.getHours();
    const timeOfDay = getTimeOfDay(hours);
    let bgNum = randomNum.toString().padStart(2, "0");
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
}
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

function getSlideNext() {
    if(randomNum < 20) {
        randomNum++
    } else if(randomNum === 20){
        randomNum = 1
    }
    setBg()
}

function getSlidePrev() {
    if(randomNum <= 20) {
        randomNum--
    } else if(randomNum < 1) {
        randomNum = 20
    }
    setBg()
}

showTime()
setBg()

