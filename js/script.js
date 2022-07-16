//Weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const city = document.querySelector('.city');
city.addEventListener('change', getWeather);

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem('city')}&lang=en&appid=36deaab1513692e46c4dfc97fe0d547f&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind speed: ${data.wind.speed} m/s`
}

getWeather()

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
   if (param > 3 && param < 10) {
        return 'morning';
    } else if (param > 9 && param < 18) {
        return 'afternoon';
    } else if (param > 17 && param < 22) {
        return 'evening';
    } else if(param < 4 || param > 21) {
       return 'night';
   }
}

//Entered and save message
const name = document.querySelector('.name');

function setLocalStorage() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('name' || 'city')) {
        name.value = localStorage.getItem('name');
        city.value = localStorage.getItem('city');
    }
}
window.addEventListener('load', getLocalStorage);

//Slides
const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);
let randomNum = getRandomNum(1,20);

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()* (max - min)) + min;
}

function setBg() {
    const date = new Date();
    const hours = date.getHours();
    const timeOfDay = getTimeOfDay(hours);
    let bgNum = randomNum.toString().padStart(2, "0");
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
        img.onload = () => {
            body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
        };
}

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

//Quotes
const quotes = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
let randomQuote = getRandomNum(1,7);

async function getQuotes() {
    const quote = 'data.json';
    const res = await fetch(quote);
    const data = await res.json();
    quotes.textContent = `"${data[randomQuote].text}"`;
    author.textContent = data[randomQuote].author;
}

changeQuote.addEventListener('click', () => {
    randomQuote = getRandomNum(0,7);
    changeQuote.classList.add('rotate-quote');
    getQuotes()

})

//Audio player
const play = document.querySelector('.play');
const next = document.querySelector('.play-next');
const prev = document.querySelector('.play-prev');
const list = document.querySelector('.play-list');
let isPlay = false;
let playNum = 0;
const audio = new Audio();
let trek = ''

play.addEventListener('click', playAudio);
next.addEventListener('click', nextPlay);
prev.addEventListener('click', prevPlay);



function playAudio() {
    audio.src = playList[playNum].src;
    trek = playList[playNum].title;
    selectionTrack()

    if (!isPlay) {
        audio.currentTime = 0;
        audio.play();
        isPlay = true;
        play.classList.add('pause')
    } else if (isPlay) {
        audio.pause();
        isPlay = false;
        play.classList.remove('pause')
    }
}

function nextPlay() {

    let play = document.querySelectorAll('.play-item')
    play[playNum].style.color = 'white'

    if (playNum < playList.length -1) {
        isPlay = false;
        playNum++
        playAudio()
    } else {
        isPlay = false;
        playNum = 0
        playAudio()
    }
}

function prevPlay() {

    let play = document.querySelectorAll('.play-item')
    play[playNum].style.color = 'white'

    if(playNum === 0) {
        isPlay = false;
        playNum = playList.length -1
        playAudio()
    } else {
        isPlay = false;
        playNum--
        playAudio()
    }
}

playList.forEach(el => {
    const li = document.createElement('li');
    list.append(li);
    li.classList.add('play-item');
    li.textContent = el.title;
})

function selectionTrack() {
    let play = document.querySelectorAll('.play-item')

    if(trek === playList[playNum].title) {
        play[playNum].style.color = 'red'
    }
}


showTime()
setBg()
getQuotes()
