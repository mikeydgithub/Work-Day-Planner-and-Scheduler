var currentDay = document.querySelector("#currentDay");


// creating a continous clock for currentDay
setInterval(function(){
    var now = moment();
    var timeReadable = now.format("MMM DD, YYYY - hh:mm:ss a");
    currentDay.textContent = timeReadable;
}, 1000);

// setup rows to have enterable text

function addItem(addTaskBtn){
    //get card button was clicked from
    var card = addTaskBtn.closest(".card");

    //Get task list container
    var ul = card.querySelector("ul");

    //Get user task input
    var taskInput = card.querySelector("input");

    //Create list item with task value and add to card's list
    var li = document.createElement("li");
    var taskId = card.id + "-" + taskInput.value;
    li.setAttribute('id', taskId);
    li.classList.add("center-flex");

    //Add task input to list item
    var taskSpan = document.createElement("span");
    taskSpan.appendChild(document.createTextNode(taskInput.value));
    taskSpan.onclick = function () {
        editTask(taskSpan);
    }
    li.appendChild(taskSpan);

    //Add save button
    var saveBtn = document.createElement("button");
    saveBtn.innerText = "Save Task";
    saveBtn.classList.add("btn");
    saveBtn.classList.add("btn-add");
    saveBtn.onclick = function() {
        //Make editabled by span again
        toggleTask(taskSpan);
        taskSpan.onclick = function() { editTask(taskSpan); }
        //Update storage
        saveTask(card.id, taskSpan.innerText);
    }
    li.appendChild(saveBtn);

    //Add delete button
    var delBtn = document.createElement("button");
    delBtn.innerText = "Remove Task";
    delBtn.classList.add("btn");
    delBtn.classList.add("btn-remove");
    delBtn.onclick = function() { removeItem(delBtn); }
    li.appendChild(delBtn);

    //Add to list container
    ul.appendChild(li);

    saveTask(card.id, taskSpan.innerText);
}

function removeItem(removeTaskBtn){
    var card = removeTaskBtn.closest(".card");
    var taskItem = removeTaskBtn.closest("li");
    var taskSpan = taskItem.querySelector("span");

    var taskItems = localStorage.getItem(card.id);
    var taskArray = taskItems ? JSON.parse(taskItems) : [];
    console.log()
    var taskIndex = taskArray.indexOf(taskSpan.innerText);
    if (taskIndex > -1) {
        taskArray.splice(taskIndex, 1);
    }

    localStorage.setItem(card.id, JSON.stringify(taskArray));
    removeTaskBtn.parentElement.remove();
}

function toggleEditable(element){
    if(element.contentEditable == "true"){
        element.contentEditable = "false";
        return false;
    }
    else {
        element.contentEditable = "true";
        return true;
    }
}

function toggleTask(taskElement){
    //Turn on/off editability for task input 
    var editable = toggleEditable(taskElement);

    //Auto focus user input
    if(editable) { taskElement.focus(); }
}

function editTask(taskElement) {
    //Remove click event until save (Should be editable till saved) 
    taskElement.onclick = "";
    //Toggle and focus user input
    toggleTask(taskElement);
}

function saveTask(taskId, taskValue) {
    var taskItems = localStorage.getItem(taskId);
    var taskArray = taskItems ? JSON.parse(taskItems) : [];
    taskArray.push(taskValue);
    localStorage.setItem(taskId, JSON.stringify(taskArray));
}

function loadTasks(){

}

window.onload = loadTasks();