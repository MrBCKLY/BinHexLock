//TODO
//--- CHANGE ATTEMPTS TO TIME?
//--- COPY AND EDIT LOGIC FOR HEX LOCK

function createBinary(x) {
    let binary = x.toString(2)
    while(binary.length < 8) {
        binary = "0" + binary;
    }
    return binary;
}

function createBinaryArray(len) {
    let binaryValues = [];
    for(let i = 0; i < len; i++) {
        binaryValues.push(createBinary(i));
    }
    return binaryValues;
}

function createHex(x) {
    let hex = x.toString(16)
    while(hex.length < 2) {
        hex = "0" + hex;
    }
    return hex.toUpperCase();
}

function createHexArray(len) {
    let hexValues = [];
    for(let i = 0; i < len; i++) {
        hexValues.push(createHex(i));
    }
    return hexValues;
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

let binaryValues = createBinaryArray(256);
shuffle(binaryValues);
let hexValues = createHexArray(256);
shuffle(hexValues);

//CREATE ANSWERS
let binaryAnswer = binaryValues[Math.floor(Math.random() * binaryValues.length)];
let hexAnswer = hexValues[Math.floor(Math.random() * hexValues.length)];

var binaryLock = document.getElementById("binaryLock");
var binaryLog = document.getElementById("binaryLog");
var remainingCodes = document.getElementById("remainingCodes");
let binaryAttempts = 0;

var hexLock = document.getElementById("hexLock");
var hexLog = document.getElementById("hexLog");
let hexAttempts = 0;

let currentLock = "binary";

function update() {
    let output = "<b>Codes:</b><br>";
    if(currentLock === "binary") {
        for(let i = 0; i < binaryValues.length; i++) {
            output = output + binaryValues[i] + "<br>";
        }
        remainingCodes.innerHTML = output;
    }
    else {
        hexLock.disabled = false;
        for(let i = 0; i < hexValues.length; i++) {
            output = output + hexValues[i] + "<br>";
        }
        remainingCodes.innerHTML = output;
    }
}

function checkAnswerBinary(x) {
    binaryLock = document.getElementById("binaryLock");
    if(x === binaryAnswer && binaryAttempts > 50) {
        binaryLock.disabled = true;
        binaryLock.value = "Success!";
        currentLock = "hex";
        binaryValues = [];
    }
    else if(x === binaryAnswer) {
        console.log("You haven't worked hard enough yet.")
        if(binaryValues.includes(x)) {
            binaryValues.splice(binaryValues.indexOf(x), 1);
        }
        binaryAnswer = binaryValues[Math.floor(Math.random() * binaryValues.length)];
    }
    else {
        if(binaryValues.includes(x)) {
            binaryValues.splice(binaryValues.indexOf(x), 1);
        }
    }
    binaryLock.value = "";
    binaryAttempts = binaryAttempts + 1;
    binaryLog.innerHTML = "Attempts: " + binaryAttempts;
    update();
}

binaryLock.onkeydown = function(event) {
    if (event.keyCode == 13) {
        checkAnswerBinary(binaryLock.value);
    }
    update();
}

function checkAnswerHex(x) {
    hexLock = document.getElementById("hexLock");
    if(x === hexAnswer && hexAttempts > 50) {
        hexValues = [];
        document.getElementById("unlocking").style.display = "none";
        document.getElementById("unlocked").style.display = "block";
        document.getElementById("totalAttempts").innerHTML = "Total Attempts: " + (binaryAttempts + hexAttempts);
    }
    else if(x === hexAnswer) {
        console.log("You haven't worked hard enough yet.")
        if(hexValues.includes(x)) {
            hexValues.splice(hexValues.indexOf(x), 1);
        }
        hexAnswer = hexValues[Math.floor(Math.random() * hexValues.length)];
    }
    else {
        if(hexValues.includes(x)) {
            hexValues.splice(hexValues.indexOf(x), 1);
        }
    }
    hexLock.value = "";
    hexAttempts = hexAttempts + 1;
    hexLog.innerHTML = "Attempts: " + hexAttempts;
    update();
}

hexLock.onkeydown = function(event) {
    if (event.keyCode == 13) {
        checkAnswerHex(hexLock.value);
    }
    update();
}

update();