var currentDay = document.querySelector("#currentDay");
var listToDo = document.getElementById("#listToDo");


// creating a continous clock for currentDay
setInterval(function(){
    var now = moment();
    var timeReadable = now.format("MMM DD, YYYY - hh:mm:ss a");
    currentDay.textContent = timeReadable;
}, 1000);

function enterText(){

}

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