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

function removeItem(){
    var ul = document.getElementById("list-ToDo");
    var candidate = document.getElementById("candidate");
    var item = document.getElementById(candidate.value);
    ul.removeChild(item);
}