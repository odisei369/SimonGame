var container = document.getElementById("game");
console.log(container);

var buttons = document.querySelectorAll(".colorPick");
var start = document.getElementById("start");
var counterElem = document.getElementById("counter");
var strict = document.getElementById("strict");
console.log(buttons.length);

var properSequence = [0,1,2,3];
var counter = 0;

var audioArray = [];
audioArray.push(new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'));
audioArray.push(new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'));
audioArray.push(new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'));
audioArray.push(new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'));

function randomMum() {
    return Math.floor(Math.random()*4);
}
start.addEventListener("click", function (event) {
    properSequence = [];
    counter = 0;
    properSequence.push(randomMum());
    animateNewSequence();
});

function checkProperClick(id) {
    if(id == properSequence[counter])
    {
        counter++;
        if(counter === properSequence.length){
            if(properSequence.length == 20){
                alert("congratulation! you won");
                properSequence = [];
            }
            counter = 0;
            properSequence.push(randomMum());
            animateNewSequence();
        }
    }else{
        alert("wrong! Try again ");
        if(strict.checked){
            properSequence = [];
            properSequence.push(randomMum());
        }
        counter = 0;
        animateNewSequence();
    }
}
function animateNewSequence() {
    var bool = true;
    var myCount = 0;
    var myVar = setInterval(myTimer, 1000);
    function myTimer(){
        if (bool){
            addColorClass(buttons[properSequence[myCount]]);
            audioArray[properSequence[myCount]].play();
            bool = false;
        }else{
            removeColorClass(buttons[properSequence[myCount]]);
            bool = true;
            myCount++;
            if(myCount == properSequence.length){
                clearInterval(myVar);
                addAct();
            }
        }
    }

    var newText = document.createTextNode(properSequence.length);
    if(counterElem.firstChild){
        counterElem.removeChild(counterElem.firstChild);
    }
    counterElem.appendChild(newText);
}

function clickList(event) {
    audioArray[event.target.id].play();
    checkProperClick(event.target.id);
    console.log(event.target.id);
}

function addAct() {
    buttons.forEach(function (element) {
        element.classList.add("act");
        element.addEventListener("click", clickList)
    });
}
function removeAct() {
    buttons.forEach(function (element) {
        element.classList.remove("act");
        element.removeEventListener("click", clickList)
    });
}
function addColorClass(element)
{
    element.classList.add("color");
}
function removeColorClass(element)
{
    element.classList.remove("color");
}


