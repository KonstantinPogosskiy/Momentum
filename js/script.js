//Show time
const time = document.querySelector('.time');

time.textContent = '';

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000)
}
showTime()

//Show date
const date = document.querySelector ('.date');

date.textContent = '';

function showDate() {
    const localDate = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = localDate.toLocaleDateString('en-US',options);
    date.textContent = currentDate;
}
showDate()