var currentDay = document.querySelector("#currentDay");

const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;

// creating a continous clock for currentDay
setInterval(tickClock, second);

function tickClock(){
    var now = moment();
    var timeReadable = now.format("MMM DD, YYYY - hh:mm:ss a");
    currentDay.textContent = timeReadable;

    colorTasks(now);
}

// setup rows to have enterable text

function addTask(addTaskBtn){
    //Get card button was clicked from
    var card = addTaskBtn.closest(".card");

    //Get task list container
    var ul = card.querySelector("ul");
 
    var taskInput = card.querySelector("input");
    if(!taskInput.value) { alert("Please enter a value for your task!"); return; }

    //Build task
    var taskId = card.id + "-" + ul.querySelectorAll("li").length;
    var task = { "taskId" : taskId, "value" : taskInput.value }

    //Build element from task
    buildTask(card, task, ul);

    //Save to local storage
    saveTask(card.id, task);
}

function removeTask(removeTaskBtn){
    var card = removeTaskBtn.closest(".card");
    var taskItem = removeTaskBtn.closest("li");
    var taskSpan = taskItem.querySelector("span");

    var taskItems = localStorage.getItem(card.id);
    var taskArray = taskItems ? JSON.parse(taskItems) : [];
    var taskIndex = taskArray.findIndex(
                    task => task.taskId == taskItem.id
                    );
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

function saveTask(cardId, task) {
    var taskItems = localStorage.getItem(cardId);
    var taskArray = taskItems ? JSON.parse(taskItems) : [];

    var taskIndex = taskArray.findIndex(
        storedTask => storedTask.taskId == task.taskId
    );
    if(taskIndex != -1) {
        taskArray[taskIndex] = task;
    }
    else {
        taskArray.push(task);
    }
 
    localStorage.setItem(cardId, JSON.stringify(taskArray));
}

function loadTasks(cardId){
    var taskItems = localStorage.getItem(cardId);
    var taskArray = taskItems ? JSON.parse(taskItems) : [];

    console.log(taskArray);

    //Build a list of task objects from data
    //get card
    var card = document.querySelector("#"+cardId);

    //Get task list container
    var ul = card.querySelector("ul");

    //Build dom task(s)
    taskArray.forEach(task => {
        buildTask(card, task, ul); 
    });
}

function buildTask(card, task, ul){
    //Create list item with task value and add to card's list
    var li = document.createElement("li");

    li.setAttribute('id', task.taskId);
    li.classList.add("center-flex");

    //Add task input to list item
    var taskSpan = document.createElement("span");
    taskSpan.appendChild(document.createTextNode(task.value));
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
        task.value = taskSpan.innerText;
        saveTask(card.id, task);
    }
    li.appendChild(saveBtn);

    //Add delete button
    var delBtn = document.createElement("button");
    delBtn.innerText = "Remove Task";
    delBtn.classList.add("btn");
    delBtn.classList.add("btn-remove");
    delBtn.onclick = function() { removeTask(delBtn); }
    li.appendChild(delBtn);

    //Add to list container
    ul.appendChild(li);
}

function buildCard(time){
    var timesplit = time.split(/(\d+)/).filter(Boolean);
    var html = `<div id="task-${time}" data-hour="${timesplit[0]}" data-postfix="${timesplit[1]}" class="card">  
                    <h3 class = "bg-primary text-uppercase fs-6"> ${timesplit[0]} <i>${timesplit[1]}</i>
                        <div class="center-flex">
                            <input type = "text" placeholder = "Enter Task Here" id="txt">
                            <button onclick="addTask(this)" class="btn btn-add" type="button">ADD TASK</button>
                        </div>
                        <ul id="list-ToDo">
                        </ul>
                    </h3>
                </div>`;
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    
    var body = document.querySelector("body");
    body.appendChild(template.content.firstChild);
}

function buildCards(startHour, duration){
    for(var cardHour = startHour; cardHour < (startHour + duration); cardHour++){
        var time = (cardHour > 12 ? cardHour - 12 : cardHour) + (cardHour >= 12 ? "pm" : "am");
        var cardId = "task-" + time;  
        buildCard(time);
        loadTasks(cardId);
    }
    tickClock();
}

function colorTasks(time){
    var cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        var cardHour = card.getAttribute("data-hour");
        cardHour = parseInt(cardHour)
        cardHour = card.getAttribute("data-postfix") == "pm" && cardHour != 12 ? 12 + cardHour : cardHour;
        
        var cardDate = new Date();
        cardDate.setHours(cardHour);
        cardDate.setMinutes(0);

        var hourDiff = (time - cardDate) / hour;

        if(hourDiff >= 1 && hourDiff < 2) {
            card.style.backgroundColor = "red";
        }
        else if (hourDiff >= 2) {
            card.style.backgroundColor = "gray";
        }
        else {
            card.style.backgroundColor = "green";
        }
    });
}

window.onload = buildCards(9, 9);