"use strict";

const state = {
    tasks: [],
};

const elements = {
    form: document.getElementById("taskForm"),
    taskInput: document.getElementById("taskInput"),
    taskList: document.getElementById("taskList"),
    emptyState: document.getElementById("emptyState"),
};

init();

function init() {
    elements.form.addEventListener("submit", handleTaskSubmit);
    elements.taskList.addEventListener("click", handleTaskListClick);
    renderTasks();
}

function handleTaskSubmit(event) {
    event.preventDefault();

    const taskText = getSanitizedTaskInput();

    if (!taskText) {
        alert("Please enter a task");
        elements.taskInput.focus();
        return;
    }

    addTask(taskText);
}

function handleTaskListClick(event) {
    const deleteButton = event.target.closest("[data-action='delete']");

    if (!deleteButton) {
        return;
    }

    const { index } = deleteButton.dataset;
    deleteTask(Number(index));
}

function getSanitizedTaskInput() {
    return elements.taskInput.value.trim();
}

function addTask(taskText) {
    state.tasks.push(taskText);
    elements.taskInput.value = "";
    renderTasks();
}

function renderTasks() {
    elements.taskList.innerHTML = "";

    const fragment = document.createDocumentFragment();

    state.tasks.forEach((task, index) => {
        fragment.appendChild(createTaskItem(task, index));
    });

    elements.taskList.appendChild(fragment);
    toggleEmptyState();
}

function createTaskItem(task, index) {
    const listItem = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.textContent = task;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.action = "delete";
    deleteButton.dataset.index = String(index);

    listItem.append(taskText, deleteButton);

    return listItem;
}

function deleteTask(index) {
    if (!Number.isInteger(index) || index < 0 || index >= state.tasks.length) {
        return;
    }

    state.tasks.splice(index, 1);
    renderTasks();
}

function toggleEmptyState() {
    const hasTasks = state.tasks.length > 0;
    elements.emptyState.hidden = hasTasks;
}
