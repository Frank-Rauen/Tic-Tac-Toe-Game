// 1) Define required constants
// 2) Define required variables used to track the state of the game
// 3) Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant.
// 4) Upon loading the app should:
//     4.1) Initialize the state variables
//     4.2) Render those values to the page
//     4.3) Wait for the user to click a square
// 5) Handle a player clicking a square
// 6) Handle a player clicking the replay button

//IPO - Input Process Output

// 1) Define inputs-Constants and state variables
const COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const KEY = {
'1' :'X',
'-1' :'O',
'null': '',
}

//Things that change - turn, winner, gameboard

let turn 
let winner
let gameboard



//Need to cache element references
const message = document.getElementById('message');
const squares = document.querySelectorAll('.square');

//Define our process
document.querySelector('#gameboard').addEventListener('click', handleClick);
document.querySelector('#reset').addEventListener('click', init)

//start or restart game
init();
function init(){
    winner = false;
    turn = 1;
    gameboard = [null, null, null, null, null, null, null, null, null];
    render();
}

function handleClick(evt){
        const selectedIndex = parseInt(evt.target.dataset.index);
        if(winner || gameboard[selectedIndex]) return
        gameboard[selectedIndex] = turn;
        turn *= -1
        winner = checkWinner();
        render();
        

}

function checkWinner() {
    for(let i = 0; i < COMBOS.length; i++) {
        if(Math.abs(gameboard[COMBOS[i][0]] + 
                    gameboard[COMBOS[i][1]] + 
                    gameboard[COMBOS[i][2]]) === 3) return gameboard[COMBOS[i][0]];
    }
    if(gameboard.includes(null)) return false;
    return 'T';
}

function render(){
    gameboard.forEach(function(elem,index){
        squares[index].textContent = KEY[elem]; 
    })
    if(!winner) {
     message.textContent = `${KEY[turn]}s turn`;       
    } else if (winner === 'T'){
        message.textContent = 'Tie Game';
    } else {
        message.textContent = `${KEY[winner]} Wins!`;
    }
};