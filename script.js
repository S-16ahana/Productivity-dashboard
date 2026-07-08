
const homeBtn = document.getElementById("homeBtn");
const todoBtn = document.getElementById("todoBtn");

const homePage = document.getElementById("homePage");
const todoPage = document.getElementById("todoPage");

// Home
homeBtn.addEventListener("click", function (e) {
  e.preventDefault();

  homePage.classList.add("active");
  todoPage.classList.remove("active");

  homeBtn.classList.add("active");
  todoBtn.classList.remove("active");
});

// Todo
todoBtn.addEventListener("click", function (e) {
  e.preventDefault();

  todoPage.classList.add("active");
  homePage.classList.remove("active");

  todoBtn.classList.add("active");
  homeBtn.classList.remove("active");
});

const buttons = document.querySelectorAll("nav a");
const pages = document.querySelectorAll(".page");

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();

    buttons.forEach((btn) => btn.classList.remove("active"));
    pages.forEach((page) => page.classList.remove("active"));

    button.classList.add("active");

    const pageId = button.id.replace("Btn", "Page");
    document.getElementById(pageId).classList.add("active");
  });
});

// ===============================
// POMODORO TIMER
// ===============================

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startTimer");
const pauseBtn = document.getElementById("pauseTimer");
const resetBtn = document.getElementById("resetTimer");

let timeLeft = 25 * 60; // 25 minutes
let timer;
let isRunning = false;

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerDisplay.textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimer();
    } else {
      clearInterval(timer);
      isRunning = false;

      alert("🎉 Pomodoro Completed! Time for a break.");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 25 * 60;
  updateTimer();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Initial Display
updateTimer();

const time = document.getElementById("time");
const date = document.getElementById("date");

function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  time.innerHTML = `
    ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}
    <span>${ampm}</span>
  `;

  date.textContent = now.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

updateClock();
setInterval(updateClock, 1000);

const greeting = document.getElementById("greeting");

function updateGreeting() {
  const hour = new Date().getHours();

  let text = "";

  if (hour < 12) {
    text = "Good Morning ☀";
  } else if (hour < 17) {
    text = "Good Afternoon 🌤";
  } else {
    text = "Good Evening 🌙";
  }

  greeting.textContent = `${text}, Sahana`;
}

updateGreeting();

//Motivation
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const refreshBtn = document.querySelector(".refresh");

let quotes = [];

// Fetch all quotes
async function loadQuotes() {
  try {
    const res = await fetch("https://dummyjson.com/quotes");
    const data = await res.json();

    quotes = data.quotes;
    showRandomQuote();
  } catch (error) {
    quote.textContent = "Stay positive. Work hard. Make it happen.";
    author.textContent = "— Unknown";
    console.error(error);
  }
}

// Display a random quote
function showRandomQuote() {
  if (quotes.length === 0) return;

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  quote.textContent = `"${randomQuote.quote}"`;
  author.textContent = `— ${randomQuote.author}`;
}

// Load quotes when page opens
loadQuotes();

// New random quote on refresh button click
refreshBtn.addEventListener("click", showRandomQuote);

//theme 
const themeBtn = document.getElementById("themeBtn");
const bgVideo = document.getElementById("bgVideo");

let darkMode = false;

themeBtn.addEventListener("click", function (e) {
    e.preventDefault();

    darkMode = !darkMode;

    document.body.classList.toggle("dark", darkMode);

    if (darkMode) {
        bgVideo.src = "assets/dark.mp4";
    } else {
        bgVideo.src = "assets/morning.mp4";
    }

    bgVideo.load();
    bgVideo.play();
});