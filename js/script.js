const time = document.querySelector('.time');


time.textContent = '';


function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000)
}
showTime()
