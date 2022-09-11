import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

let selectedDate = null;
let timerId = null;
const selectorRef = document.querySelector("#datetime-picker");
const btnStartRef = document.querySelector('button[data-start]');
const timerRef = document.querySelectorAll('.field');

btnStartRef.addEventListener('click', handlerBtnStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) { 
      selectedDate = selectedDates[0];
      checkCorrectDate(selectedDates[0]);
  },
};

init();

function init() {
    flatpickr(selectorRef, options);
    disableBtnStart();    
}
    
function checkCorrectDate(selectedDate) { 
    if (selectedDate < options.defaultDate) {
        Notiflix.Notify.warning("Please choose a date in the future");        
        disableBtnStart();
        return;
    }
    enableBtnStart();
}

function handlerBtnStart() {    
    timerId = setInterval(render, 1000);
}

function render() {
    let remainingTime = selectedDate - Date.now();   
           
    let { days, hours, minutes, seconds } = convertMs(remainingTime);
    timerRef[0].innerText = `${addLeadingZero(days)} Days`;
    timerRef[1].innerText = `${addLeadingZero(hours)} Hours`;
    timerRef[2].innerText = `${addLeadingZero(minutes)} Minutes`;
    timerRef[3].innerText = `${addLeadingZero(seconds)} Seconds`;  
   if (!Math.floor(remainingTime/1000)) {
        clearInterval(timerId);
        return;
    } 
}

function enableBtnStart() {
    btnStartRef.style.opacity = 1;
    btnStartRef.style.cursor = 'pointer'; 
}

function disableBtnStart() {
    btnStartRef.style.opacity = 0.6;
    btnStartRef.style.cursor = 'not-allowed';
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart('2',0)
}

function addLeadingZero(value) {
    return String(value).padStart('2',0)
}