function checkValidInteger(number){
    const toTest = parseInt(number);
    if (number != Math.floor(number | number > 2 | number < 0)){
        return false;
    }
    return true;
}

const gameBoard = (function(){
    // Constructs the 3x3 grid
    const grid = [];

    for (let i =0; i<3; i++){
        const line = [];
        for (let j = 0; j < 3; j++) 
            line.push("_");
        grid.push(line);
    }

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
            if (grid[i][2-i] == 0){
                counter2++;
            }
        } 
        if (counter1 == 3 | counter2 == 3){
            return true;
        }
        return false;
    }

    function checkColumns(symbol){
        let counters = [0,0,0,];
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3;j++){
                if (grid[i][j] == symbol){
                    counters[j]++;
                }
            }
        }
        return counters.some(counter => (counter == 3))
    }

    // check if a symbol as ended the game 
    const checkSymbolWin = symbol =>{
        if (checkLines(symbol) | checkColumns(symbol) | checkDiagonals(symbol)){
            return true;
        }
        return false;
    }

    function nonEmpty(i,j){
        return (grid[i][j] === "_");
    }

    function validInput(i,j){
        if (!checkValidInteger(i) | checkValidInteger(j)){
            return false;
        }
        i = parseInt(i);
        j = parseInt(j);
        return gameBoard.nonEmpty(i,j);
    }

    function placeInput(lign, column, symbol){
        grid[lign][column] = symbol;
    }
    

    function checkFull(){
        return grid.every(line => line.every(value => (value !== "_")));
    }

    return {nonEmpty, checkSymbolWin, checkNonFull, validInput, placeInput};
})();




function createPlayer(symbol){

    function getInput(){
        let valid = false;
        while (!valid){
            ligne = prompt("entrer la ligne");
            colone = prompt("entrer la colone");
            valid = gameBoard.validInput(ligne, colone);
        }
        return [ligne,colone];
    }
    function getSymbol(){
        return symbol;
    }
    return {getInput, getSymbol}
}



const gameLogic = (function(player1, player2){

    let playerTurn = 1;

    const players = [player1, player2]

    function changePlayer(){
        playerTurn = -playerTurn;
    }


    function letPlayRound(){
        const [lign, column] = players[playerTurn].getInput();
        const symbol = players[playerTurn].getSymbol();
        gameBoard.placeInput(lign, column, symbol)
        if (gameBoard.checkSymbolWin(symbol)){
            return playerTurn;
        }
        else if (gameBoard.checkFull()){
            return 0;
        }
        changePlayer();
    }
    return {letPlayRound};
})();