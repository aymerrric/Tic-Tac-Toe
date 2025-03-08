function checkValidInteger(number){
    const toTest = parseInt(number);
    if (toTest != Math.floor(number) || toTest > 2 || toTest < 0){
        return false;
    }
    return true;
}

const gameBoard = (function(){
    // Constructs the 3x3 grid
    const grid = [];

    for (let i = 0; i < 3; i++){
        const line = [];
        for (let j = 0; j < 3; j++) 
            line.push("_");
        grid.push(line);
    }
    const crossSymbol = document.createElement('img');
    crossSymbol.setAttribute("src", "./images/cross.svg");
    crossSymbol.setAttribute("alt", "cross");
    crossSymbol.style.width = '40px'
    crossSymbol.style.height = "auto"
    const circleSymbol = document.createElement("img");
    circleSymbol.setAttribute("src", "./images/circle.svg");
    circleSymbol.setAttribute("alt", "circle");
    circleSymbol.style.width = '40px'
    circleSymbol.style.height = "auto"



    const blocs = Array.from(document.querySelectorAll(".case"));

    function checkLines(symbol){
        return grid.some(line => line.every(bloc => (bloc == symbol)));
    }

    function checkDiagonals(symbol){
        let counter1 = 0;
        let counter2 = 0;
        for (let i = 0; i < 3; i++){
            if (grid[i][i] == symbol){
                counter1++;
            }
            if (grid[i][2-i] == symbol){
                counter2++;
            }
        } 
        return (counter1 === 3 || counter2 === 3);
    }

    function checkColumns(symbol){
        let counters = [0, 0, 0];
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (grid[i][j] == symbol){
                    counters[j]++;
                }
            }
        }
        return counters.some(counter => counter === 3);
    }

    // check if a symbol has ended the game 
    const checkSymbolWin = symbol => {
        return checkLines(symbol) || checkColumns(symbol) || checkDiagonals(symbol);
    };

    // Simple check to see if a cell is empty
    function nonEmpty(i, j){
        return (grid[i][j] === "_");
    }

    // FIX: Instead of calling gameBoard.nonEmpty, call nonEmpty directly
    function validInput(i, j){
        if (!checkValidInteger(i) || !checkValidInteger(j)){
            return false;
        }
        i = parseInt(i);
        j = parseInt(j);
        return nonEmpty(i, j);
    }

    function placeInput(lign, column, symbol){
        grid[lign][column] = symbol;
    }
    
    function checkFull(){
        return grid.every(line => line.every(value => (value !== "_")));
    }

    function displayGrid(){
        for (let i = 0; i < 9; i++){
            let line = Math.floor(i / 3);
            let column = i - line * 3;
            if (grid[line][column] == "x"){
                const newCross = crossSymbol.cloneNode();
                blocs[i].replaceChildren(newCross);
            }
            else if (grid[line][column] == "o"){
                const newCircle = circleSymbol.cloneNode();
                blocs[i].replaceChildren(newCircle);
            }
        }
    }

    return { nonEmpty, checkSymbolWin, checkFull, validInput, placeInput, displayGrid, blocs, grid };
})();

function createPlayer(name, symbol){
    // Using a Promise so we can await valid input asynchronously
    function getInput(){
        return new Promise(resolve => {
            const check = function(){
                if(gameBoard.validInput(currentInputLine, currentInputColumn)){
                    resolve([currentInputLine, currentInputColumn]);
                }
                else{
                    setTimeout(check, 200);
                }
            };
            check();
        });
    }
    
    function getSymbol(){
        return symbol;
    }
    const nameVar = name;
    return { getInput, getSymbol, name: nameVar };
}

const playButton = document.querySelector("#play");
const diaolog = document.querySelector("dialog");

let currentInputLine, currentInputColumn;

// FIX: Use a traditional for loop or forEach instead of for...in to iterate over an array
for (let i = 0; i < gameBoard.blocs.length; i++){
    gameBoard.blocs[i].addEventListener("click", () => {
        currentInputLine = Math.floor(i / 3);
        currentInputColumn = i - 3*Math.floor(i / 3);
    });
}

playButton.addEventListener("click", (e) => {
    e.preventDefault();
    diaolog.close();
    const name2 = document.querySelector("#player2-name").value;
    const name1 = document.querySelector("#player1-name").value;
    const player1 = createPlayer(name1, 'x');
    const player2 = createPlayer(name2, 'o');
    
    const gameLogic = (function(player1, player2){
        const containerPlayerTurn = document.querySelector("#turn");
        // FIX: Correct the style value from "bloc" to "block"
        containerPlayerTurn.style.display = "block";
        let playerTurn = 1;
        const players = [player1, player2];

        function changePlayer(){
            if (playerTurn === 1){
                playerTurn++;
            }
            else{
                playerTurn--;
            }
            containerPlayerTurn.textContent = `It is the turn of ${players[playerTurn - 1].name}`;
        }

        // FIX: Await the getInput() promise so the round waits for valid input
        async function letPlayRound(){
            changePlayer();
            const [lign, column] = await players[playerTurn - 1].getInput();
            const symbol = players[playerTurn - 1].getSymbol();
            gameBoard.placeInput(lign, column, symbol);
            gameBoard.displayGrid();
            if (gameBoard.checkSymbolWin(symbol)){
                return playerTurn;
            }
            else if (gameBoard.checkFull()){
                return 0;
            }
            else{
                return -1;
            }
        }
        
        // FIX: Await each round so the game doesn't progress until the round is complete
        async function letPlayGame(){
            let end = -1;
            while(end == -1){
                end = await letPlayRound();
            }
            if (end !== 0){
                containerPlayerTurn.textContent = `${players[playerTurn-1].name} wins`            
            }
            else{
                containerPlayerTurn.textContent = "Tie"
            }
        }

        return { letPlayGame };

    })(player1, player2);

    gameLogic.letPlayGame();
});
