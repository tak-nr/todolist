const pendingList = document.querySelector(".pending");
const finishedList = document.querySelector(".finished");
let userName = "";
const USERNAME = "userName";
let lsPending = [];
let lsFinished = [];
const taskForm = document.querySelector(".taskForm");
const taskInput = document.querySelector(".taskInput");
const nameForm = document.querySelector(".nameForm");
const nameInput = document.querySelector(".nameInput");
const PENDING = "pending";
const FINISHED = "finished";
const NEXTID = "nextID";
let nextID = 1;

init();

function init() {
  loadFromLocalStorage();
  taskForm.addEventListener("submit", addTask);
  nameForm.addEventListener("submit", addUserName);
}

function addTask(event) {
  event.preventDefault();
  const task = taskInput.value;

  const newLi = createNewLi(nextID, task);
  pendingList.appendChild(newLi);

  const taskObj = {
    text: task,
    id: `${nextID}`,
  };
  lsPending.push(taskObj);

  taskInput.value = "";
  nextID++;
  saveToLocalStorage();
}

function createNewLi(id, task) {
  const newLi = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");
  const finishBtn = document.createElement("button");
  span.innerText = task;
  deleteBtn.innerText = "X";
  finishBtn.innerText = "V";
  deleteBtn.addEventListener("click", deleteTask);
  finishBtn.addEventListener("click", finishTask);
  newLi.appendChild(span);
  newLi.appendChild(finishBtn);
  newLi.appendChild(deleteBtn);
  newLi.id = id;

  return newLi;
}

function deleteTask(event) {
  const li = event.target.parentNode;
  const taskID = li.id;
  const taskClass = li.parentNode.className;
  if (taskClass === PENDING) {
    lsPending = lsPending.filter(function (taskObj) {
      return taskObj.id !== taskID;
    });
    pendingList.removeChild(li);
  } else {
    lsFinished = lsFinished.filter(function (taskObj) {
      return taskObj.id !== taskID;
    });
    finishedList.removeChild(li);
  }

  saveToLocalStorage();
}

function finishTask(event) {
  const li = event.target.parentNode;
  const taskID = li.id;
  const task = li.querySelector("span").innerText;
  const taskClass = li.parentNode.className;

  if (taskClass === PENDING) {
    lsPending = lsPending.filter(function (taskObj) {
      return taskObj.id !== taskID;
    });
    lsFinished.push({ text: task, id: taskID });
    pendingList.removeChild(li);
    finishedList.appendChild(li);
    saveToLocalStorage();
  } else {
    lsFinished = lsFinished.filter(function (taskObj) {
      return taskObj.id !== taskID;
    });
    lsPending.push({ text: task, id: taskID });
    finishedList.removeChild(li);
    pendingList.appendChild(li);
    saveToLocalStorage();
  }
}

function saveToLocalStorage() {
  localStorage.setItem(PENDING, JSON.stringify(lsPending));
  localStorage.setItem(FINISHED, JSON.stringify(lsFinished));
  localStorage.setItem(NEXTID, nextID);
}

function loadFromLocalStorage() {
  const loadedPending = JSON.parse(localStorage.getItem(PENDING));
  const loadedFinished = JSON.parse(localStorage.getItem(FINISHED));
  const loadedNextID = localStorage.getItem(NEXTID);
  const name = localStorage.getItem(USERNAME);

  if (loadedPending) {
    lsPending = loadedPending;
    lsPending.forEach(function (taskObj) {
      const newLi = createNewLi(taskObj.id, taskObj.text);
      pendingList.appendChild(newLi);
    });
  }

  if (loadedFinished) {
    lsFinished = loadedFinished;
    lsFinished.forEach(function (taskObj) {
      const newLi = createNewLi(taskObj.id, taskObj.text);
      finishedList.appendChild(newLi);
    });
  }

  if (loadedNextID) {
    nextID = loadedNextID;
  }

  if (name) {
    userName = name;
    setUserName();
  }
}

function addUserName(event) {
  event.preventDefault();
  const name = nameInput.value;
  userName = name;
  localStorage.setItem(USERNAME, userName);
  setUserName();
}

function setUserName() {
  const nameDiv = document.querySelector(".name");
  nameDiv.removeChild(nameForm);
  nameDiv.innerText = `HELLO ${userName}!`;
}
