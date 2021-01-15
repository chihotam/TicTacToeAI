var board;
const human = "X";
const ai = "O";
const winCondition = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];
const cells = document.querySelectorAll("td");
start();

function start() {
        document.querySelector(".end").style.display = "none";
    board = [0,1,2,3,4,5,6,7,8];
    for(var i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener("click", click, false);
    }
}

function click(event) {
    if(typeof(board[event.target.id]) == "number") {
        turn(event.target.id, human);
        if(!tie()) {
            turn(next(), ai);
        }
    }
}

function turn(eventID, player) {
    board[eventID] = player;
    document.getElementById(eventID).innerText = player;
    var win = check(board,player);
    if(win) {
        finish(win);
    }
}

function check(board, player) {
    var moves = [];
    for(var i = 0; i < cells.length; i++) {
        if(board[i] == player) {
            moves.push(i);
        }
    }
    var winner = null;
    for(var i = 0; i < winCondition.length; i++) {
        var count = 0;
        for(var j = 0; j < winCondition[i].length; j++) {
            if(moves.indexOf(winCondition[i][j]) > -1) {
                count++;
                console.log(count);
            }
        }
        if(count == winCondition[i].length) {
            winner = {index: winCondition[i], player: player};
            return winner;
        }
    }
    return winner;
}

function finish(win) {
    for(var i = 0; i < win.index.length; i++) {
        if(win.player == human) {
            document.getElementById(win.index[i]).style.backgroundColor = "blue";
        }
        else{
            document.getElementById(win.index[i]).style.backgroundColor = "red";
        }
    }
    for(var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener("click", click, false);
    }
    if(win.player == human) {
        winner("You Win!");
    }
    else {
        winner("You Lose!");
    }
}

function tie() {
    if(next() == -1) {
        for(var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener("click", click, false);
        }
        winner("Tie Game!");
        return true;
    }
    return false;
}

function next() {
    for(var i = 0; i < cells.length; i++) {
        if(typeof(board[i]) == "number") {
            return board[i];
        }
    }
    return -1;
}

function winner(player) {
    document.querySelector(".end").style.display = "block";
    document.querySelector(".end .winner").innerText = player;
}