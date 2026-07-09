
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
const themeIcon = document.getElementById("themeIcon");
const bgVideo = document.getElementById("bgVideo");

let darkMode = false;

themeBtn.addEventListener("click", function (e) {
    e.preventDefault();

    darkMode = !darkMode;

    document.body.classList.toggle("dark", darkMode);

    if (darkMode) {
        bgVideo.src = "./Assets/dark.mp4";

        // Change icon to Sun
        themeIcon.classList.remove("ri-moon-line");
        themeIcon.classList.add("ri-sun-line");

    } else {
        bgVideo.src = "./Assets/morning.mp4";

        // Change icon to Moon
        themeIcon.classList.remove("ri-sun-line");
        themeIcon.classList.add("ri-moon-line");
    }

    bgVideo.load();
    bgVideo.play();
});
// ===============================
// SIDEBAR COLLAPSE
// ===============================

const sidebar = document.getElementById("sidebar");
const collapseBtn = document.getElementById("collapseBtn");

collapseBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
});

document.querySelectorAll(".nav-card").forEach(card => {
    card.addEventListener("click", () => {
        const pageName = card.id.replace("goto", "");

        pages.forEach(page => page.classList.remove("active"));
        buttons.forEach(btn => btn.classList.remove("active"));

        document.getElementById(pageName.toLowerCase() + "Page").classList.add("active");
        document.getElementById(pageName.toLowerCase() + "Btn").classList.add("active");
    });
});

// ===============================
// TODO LIST
// ===============================

const todoInput = document.getElementById("todoInput");
const todoCategory = document.getElementById("todoCategory");
const addTodoBtn = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");

// Load from localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Save to localStorage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Add Todo
addTodoBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTodo();
    }
});

function addTodo() {

    const task = todoInput.value.trim();
    const category = todoCategory.value;

    if (task === "") return;

    todos.push({
        task: task,
        category: category,
        completed: false
    });

    saveTodos();

    todoInput.value = "";
    todoCategory.selectedIndex = 0;

    renderTodos();
}

// Render Todos
function renderTodos() {

    todoList.innerHTML = "";

    todos.forEach((todo, index) => {

        const li = document.createElement("li");
        li.className = "todo-card";

        if (todo.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <div class="todo-top">

                <div>
                    <h3>${todo.task}</h3>
                    <small>${todo.category}</small>
                </div>

                <div class="todo-buttons">

                    <button class="complete-btn">
                        ${todo.completed ? "Undo" : "Complete"}
                    </button>

                    <button class="edit-btn">
                        Edit
                    </button>

                    <button class="delete-btn">
                        Delete
                    </button>

                </div>

            </div>

            <span class="status ${todo.completed ? "completed-status" : "pending-status"}">
                ${todo.completed ? "✅ Completed" : "🕒 Pending"}
            </span>
        `;

        // Complete
        li.querySelector(".complete-btn").onclick = () => {

            todos[index].completed = !todos[index].completed;

            saveTodos();
            renderTodos();
        };

        // Delete
        li.querySelector(".delete-btn").onclick = () => {

            todos.splice(index, 1);

            saveTodos();
            renderTodos();
        };

        // Edit
        li.querySelector(".edit-btn").onclick = () => {

            const newTask = prompt("Edit Task", todo.task);

            if (newTask && newTask.trim() !== "") {

                todos[index].task = newTask.trim();

                saveTodos();
                renderTodos();
            }
        };

        todoList.appendChild(li);

    });

}

// Show saved todos when page loads
renderTodos();
// ===============================
// GOALS
// ===============================

const goalInput = document.getElementById("goalInput");
const addGoalBtn = document.getElementById("addGoal");
const goalList = document.getElementById("goalList");

// Load goals from localStorage
let goals = JSON.parse(localStorage.getItem("goals")) || [];

// Save goals to localStorage
function saveGoals() {
    localStorage.setItem("goals", JSON.stringify(goals));
}

// Add Goal
addGoalBtn.addEventListener("click", addGoal);

goalInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addGoal();
    }
});

function addGoal() {

    const goal = goalInput.value.trim();

    if (goal === "") return;

    goals.push({
        text: goal,
        achieved: false
    });

    saveGoals();

    goalInput.value = "";

    renderGoals();
}

// Render Goals
function renderGoals() {

    goalList.innerHTML = "";

    goals.forEach((goal, index) => {

        const card = document.createElement("div");
        card.className = "goal-card";

        if (goal.achieved) {
            card.classList.add("goal-achieved");
        }

        card.innerHTML = `
            <div class="goal-top">

                <h3>${goal.text}</h3>

                <div class="goal-buttons">

                    <button class="goal-complete">
                        ${goal.achieved ? "Undo" : "Achieve"}
                    </button>

                    <button class="goal-edit">
                        Edit
                    </button>

                    <button class="goal-delete">
                        Delete
                    </button>

                </div>

            </div>

            <span class="goal-status ${goal.achieved ? "achieved-status" : "progress-status"}">
                ${goal.achieved ? "🏆 Achieved" : "🎯 In Progress"}
            </span>
        `;

        // Achieve / Undo
        card.querySelector(".goal-complete").onclick = () => {

            goals[index].achieved = !goals[index].achieved;

            saveGoals();
            renderGoals();

        };

        // Edit
        card.querySelector(".goal-edit").onclick = () => {

            const newGoal = prompt("Edit Goal", goal.text);

            if (newGoal && newGoal.trim() !== "") {

                goals[index].text = newGoal.trim();

                saveGoals();
                renderGoals();

            }

        };

        // Delete
        card.querySelector(".goal-delete").onclick = () => {

            goals.splice(index, 1);

            saveGoals();
            renderGoals();

        };

        goalList.appendChild(card);

    });

}

// Load saved goals on page refresh
renderGoals();

//===========================
// PLANNER
//===========================

const plannerTask = document.getElementById("plannerTask");
const plannerDate = document.getElementById("plannerDate");
const plannerTime = document.getElementById("plannerTime");
const addPlanner = document.getElementById("addPlanner");
const plannerList = document.getElementById("plannerList");

// Load planners from localStorage
let planners = JSON.parse(localStorage.getItem("planners")) || [];

// Save planners to localStorage
function savePlanner() {
    localStorage.setItem("planners", JSON.stringify(planners));
}

addPlanner.addEventListener("click", addSchedule);

plannerTask.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addSchedule();
    }
});

function addSchedule() {

    if (
        plannerTask.value.trim() === "" ||
        plannerDate.value === "" ||
        plannerTime.value === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    planners.push({
        task: plannerTask.value.trim(),
        date: plannerDate.value,
        time: plannerTime.value,
        completed: false
    });

    savePlanner();

    plannerTask.value = "";
    plannerDate.value = "";
    plannerTime.value = "";

    renderPlanner();
}

function renderPlanner() {

    plannerList.innerHTML = "";

    planners.sort((a, b) => {
        return new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time);
    });

    planners.forEach((item, index) => {

        const card = document.createElement("div");
        card.className = "planner-card";

        if (item.completed) {
            card.classList.add("planner-completed");
        }

        card.innerHTML = `
            <div class="planner-top">

                <div class="planner-info">

                    <h3>${item.task}</h3>

                    <p>
                        <i class="ri-calendar-line"></i>
                        ${item.date}
                    </p>

                    <p>
                        <i class="ri-time-line"></i>
                        ${item.time}
                    </p>

                </div>

                <div class="planner-actions">

                    <button class="done-btn">
                        ${item.completed ? "Undo" : "Complete"}
                    </button>

                    <button class="edit-btn">
                        Edit
                    </button>

                    <button class="delete-btn">
                        Delete
                    </button>

                </div>

            </div>

            <div class="planner-status">
                ${item.completed ? "✅ Completed" : "⏳ Scheduled"}
            </div>
        `;

        // Complete / Undo
        card.querySelector(".done-btn").onclick = () => {

            planners[index].completed = !planners[index].completed;

            savePlanner();
            renderPlanner();

        };

        // Edit
        card.querySelector(".edit-btn").onclick = () => {

            const updated = prompt("Edit Activity", item.task);

            if (updated && updated.trim() !== "") {

                planners[index].task = updated.trim();

                savePlanner();
                renderPlanner();

            }

        };

        // Delete
        card.querySelector(".delete-btn").onclick = () => {

            planners.splice(index, 1);

            savePlanner();
            renderPlanner();

        };

        plannerList.appendChild(card);

    });

}

// Load saved planner data
renderPlanner();