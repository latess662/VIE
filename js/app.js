let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
  let input = document.getElementById("taskInput");
  if(input.value === "") return;

  tasks.push({ text: input.value, done: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
  displayTasks();
}

function displayTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `
      <input type="checkbox" onchange="toggleTask(${index})" ${task.done ? "checked" : ""}>
      ${task.text}
      <button onclick="deleteTask(${index})" class="btn btn-danger btn-sm float-end">X</button>
    `;
    list.appendChild(li);
  });
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

// ===== DÉPENSES =====
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {
  let input = document.getElementById("expenseInput");
  if(input.value === "") return;

  expenses.push(Number(input.value));
  localStorage.setItem("expenses", JSON.stringify(expenses));
  input.value = "";
  displayTotal();
}

function displayTotal() {
  let total = expenses.reduce((a, b) => a + b, 0);
  document.getElementById("totalExpense").innerText = total;
}

// ===== OBJECTIFS =====
let progress = localStorage.getItem("progress") || 0;

function increaseProgress() {
  if(progress < 100) progress = Number(progress) + 10;
  localStorage.setItem("progress", progress);
  updateProgress();
}

function updateProgress() {
  let bar = document.getElementById("progressBar");
  bar.style.width = progress + "%";
  bar.innerText = progress + "%";
}
