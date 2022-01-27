var currentDay = document.querySelector("#currentDay");
var listToDo = document.getElementById("#listToDo");


// creating a continous clock for currentDay
setInterval(function(){
    var now = moment();
    var timeReadable = now.format("MMM DD, YYYY - hh:mm:ss a");
    currentDay.textContent = timeReadable;
}, 1000);

function echoInput(task_btn){
    // get task input
    let task_input = task_btn.previousElementSibling;
    //read and log task from input box
    console.log(task_input.value)
        



// setup rows to have enterable text
//listToDo.addEventListener('click', enterText);