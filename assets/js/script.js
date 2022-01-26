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


// setup rows to have enterable text
//listToDo.addEventListener('click', enterText);