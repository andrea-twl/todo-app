/*
var array = []
var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

for (var i = 0; i < checkboxes.length; i++) {
  array.push(checkboxes[i].value)
}*/

// DECLARATION OF COMPONENTS
const inputBox = document.querySelector(".form-control");
const addButton = document.querySelector("#add-button");
const todolist = document.querySelector(".todo-list");
const deleteButton = document.querySelector("#delete-button");
const completeButton = document.querySelector("#complete-button");

// LOAD TASKS UPON STARTING

displayTasks();

// ADDING TASKS
addButton.addEventListener("click", addTask);

function addTask() {
  let newTask = inputBox.value.trim();
  let savedTasks = localStorage.getItem("Tasks");
  if (savedTasks == null) { //if localStorage is null
    loadedTaskList = []; //create blank array
  } else {
    loadedTaskList = JSON.parse(savedTasks); //else transform json string into json object (array in this case)
  }
  // if input field isnt empty, add task to array
  if (newTask != '') {
    loadedTaskList.push(newTask);
  }
  localStorage.setItem("Tasks", JSON.stringify(loadedTaskList)); //transform array to json string and save in localStorage
  displayTasks();
  addDragEventListeners();
}

function displayTasks() {
  let savedTasks = localStorage.getItem("Tasks");
  if (savedTasks == null) { //if localStorage is null
    loadedTaskList = []; //create blank array
  } else {
    loadedTaskList = JSON.parse(savedTasks); //else transform json string into json object (array in this case)
  }
  let listItems = "";
  loadedTaskList.forEach((element) => {
    listItems += '<li><input type="checkbox" class="task-checkbox"> <label class="task">' + element + '</label>';
  });
  todolist.innerHTML = listItems;
  inputBox.value = '';
  loadCompleted();
}
// ADD ENTER FUNCTIONALITY
document.addEventListener('keypress', event => event.keyCode == 13 ? addTask() : null);

function displayTasks() {
  let savedTasks = localStorage.getItem("Tasks");
  if (savedTasks == null) { //if localStorage is null
    loadedTaskList = []; //create blank array
  } else {
    loadedTaskList = JSON.parse(savedTasks); //else transform json string into json object (array in this case)
  }
  let listItems = "";
  loadedTaskList.forEach((element) => {
    listItems += '<li class="draggable" draggable="true"><input type="checkbox" class="task-checkbox"> <label class="task">' + element + '</label>';
  });
  todolist.innerHTML = listItems;
  inputBox.value = '';
  loadCompleted();
}

// COMPLETING TASKS
completeButton.addEventListener("click", completeTasks);

function completeTasks() {
  let checkedTasks = document.querySelectorAll('input[type=checkbox]:checked'); // get all checked boxes
  checkedTasks.forEach((item) => { // toggle completed class to all list items with checked boxes and uncheck boxes
    let taskLabel = item.parentNode.lastChild;
    taskLabel.classList.toggle("completed");
    item.checked = false;
  });
  saveCompleted();
}

function saveCompleted() {
  let allTasks = document.querySelectorAll('li');
  var completedIndices = [];
  allTasks.forEach((item, i) => {
    if (item.lastChild.classList.contains("completed")) {
      completedIndices.push(i);
    }
  });
  localStorage.setItem("Completed Indices", JSON.stringify(completedIndices));
}

function loadCompleted() {
  let allTasks = document.querySelectorAll('li');
  let loadCompletedIndices = localStorage.getItem("Completed Indices");
  let completedIndices = JSON.parse(loadCompletedIndices);
  allTasks.forEach((item, i) => {
    if (completedIndices.includes(i)) {
      item.lastChild.classList.add("completed");
    }
  });
}

// DELETING TASKS
deleteButton.addEventListener("click", deleteTasks);

function deleteTasks() {
  let checkedTasks = document.querySelectorAll('input[type=checkbox]:checked'); // get all checked boxes
  checkedTasks.forEach((item) => { // toggle completed class to all list items with checked boxes and uncheck boxes
    let listItem = item.parentNode;
    listItem.parentNode.removeChild(listItem);
  });
  saveState();
}

function saveState() {
  let allTasks = document.querySelectorAll('.task');

  let allTaskStrings = [];
  allTasks.forEach((item, i) => {
    allTaskStrings.push(item.innerHTML);
  });
  localStorage.setItem("Tasks", JSON.stringify(allTaskStrings));
  saveCompleted();
}

// DRAG AND SORT
//addDragEventListeners();
var dragged;
var draggedIndex = 0;

function addDragEventListeners() {
  const listItems = document.querySelectorAll('li');

  listItems.forEach((item, i) => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

function dragStart() {
  dragged = this;
  let allTasks = document.querySelectorAll("li");
  allTasks.forEach((item, i) => {
    if (this == item) {
      draggedIndex = i;
    }
  });
}

function dragOver(event) {
  event.preventDefault();
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function dragDrop(event) {
  event.preventDefault();
  let droppedIndex = 0;
  let allTasks = document.querySelectorAll("li");
  allTasks.forEach((item, i) => {
    if (this == item) {
      droppedIndex = i;
    }
  });
  if (draggedIndex < droppedIndex) {
    this.parentNode.insertBefore(dragged, this.nextSibling);
  } else {
    this.parentNode.insertBefore(dragged, this);
  }
  this.classList.remove('over');
  saveState();
}
