const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");
const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// set date input min with current date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// populate  countdown
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // populating countdown
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;

    // hide input
    inputContainer.hidden = true;
    // show countdown
    countdownEl.hidden = false;
  }, second);
}

// take the value from form
const updateCountdown = (e) => {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  if (countdownDate === "" || countdownTitle === "") {
    alert("Date or Title is missing!");
  } else {
    //   get date
    countdownValue = new Date(countdownDate).getTime();
    console.log(countdownTitle, countdownDate, countdownValue);
    updateDOM();
  }
};

// reset all values
function reset() {
  // hide countdown panel, show input
  countdownEl.hidden = true;
  inputContainer.hidden = false;
  // stop countdown
  clearInterval(countdownActive);
  countdownTitle = "";
  countdownDate = "";
}

// event listener
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
