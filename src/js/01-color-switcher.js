const btnStartRef = document.querySelector('button[data-start]');
const btnStopRef = document.querySelector('button[data-stop]');

btnStartRef.addEventListener('click', handleBtnStartClick);
btnStopRef.addEventListener('click', handleBtnStopClick);
let timerId = null;

function handleBtnStartClick() {    
    timerId = setInterval(setBgColor, 1000);
    
    btnStartRef.style.opacity = 0.6;
    btnStartRef.style.cursor = 'not-allowed';
}


function handleBtnStopClick() {
    setBgColor('#fff');
    clearInterval(timerId);
    btnStartRef.style.opacity = 1;
    btnStartRef.style.cursor = 'pointer';    
}

function setBgColor(color = getRandomHexColor()) {    
    document.body.style.backgroundColor = color;    
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}