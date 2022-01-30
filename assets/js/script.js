var currentDay = document.querySelector("#currentDay");


// creating a continous clock for currentDay
setInterval(function(){
    var now = moment();
    var timeReadable = now.format("MMM DD, YYYY - hh:mm:ss a");
    currentDay.textContent = timeReadable;
}, 1000);

// setup rows to have enterable text

function addItem(){
    var ul = document.getElementById("list-ToDo");
    var candidate = document.getElementById("candidate");
    var li = document.createElement("li");
    li.setAttribute('id', candidate.value);
    li.appendChild (document.createTextNode(candidate.value));
    ul.appendChild(li);
}

<<<<<<< HEAD
function removeItem(){
    var ul = document.getElementById("list-ToDo");
    var candidate = document.getElementById("candidate");
    var item = document.getElementById(candidate.value);
    ul.removeChild(item);
}
=======
function addTask(task_btn){
    //Get task input
    let task_input = task_btn.previousElementSibling;
    let task_value = task_input.value;

    //Get task list
    let task_card = task_btn.closest(".card"); 
    let task_list = task_card.querySelector("ul");

    //Create list item for task
    let task_item = document.createElement("li");
    console.log(task_item);
    task_item.appendChild(document.createTextNode(task_value));
    console.log(task_item);
    task_list.appendChild(task_item);
    console.log(task_list);
    //Read and log task from input box
    console.log(task_value);
}

// setup rows to have enterable text
//listToDo.addEventListener('click', enterText);
>>>>>>> e179c9805d162b72aefdb23ad22c6589f6b797d1
