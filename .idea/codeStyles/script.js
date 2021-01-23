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
    console.log(eventID);
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
    if(spaces().length == 0) {
        for(var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener("click", click, false);
        }
        winner("Tie Game!");
        return true;
    }
    return false;
}

function spaces() {
    var open = [];
    for(var i = 0; i < cells.length; i++) {
        if(typeof(board[i]) == "number") {
            open.push(i)
        }
    }
    return open
}

function next() {
    return minimax(board, ai).index;
}

function winner(player) {
    document.querySelector(".end").style.display = "block";
    document.querySelector(".end .winner").innerText = player;
}

function minimax(board, player) {
    var open = spaces();
    if(check(board, human)) {
        return {score: -10};
    }
    else if(check(board, ai)) {
        return {score: 10};
    }
    else if(open.length == 0) {
        return {score: 0};
    }
    var moves = [];
    for(var i = 0; i < open.length; i++) {
        var move = {};
        move.index = board[open[i]];
        board[open[i]] = player;
        if(player == ai) {
            var result = minimax(board, human);
            move.score = result.score;
        }
        else {
            var result = minimax(board, ai);
            move.score = result.score;
        }
        board[open[i]] = move.index;
        moves.push(move);
    }
    var bestmove = 0;
    if(player == ai){
        var bestscore = -10000;
        for(var i = 0; i < moves.length; i++) {
            if(moves[i].score > bestscore) {
                bestscore = moves[i].score;
                bestmove = i;
            }
        }
    }
    else {
        var bestscore = 10000;
        for(var i = 0; i < moves.length; i++) {
            if(moves[i].score < bestscore) {
                bestscore = moves[i].score;
                bestmove = i;
            }
        }
    }
    return moves[bestmove];
}