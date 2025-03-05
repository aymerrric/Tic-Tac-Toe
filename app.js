// function checkValidInteger(number){
//     const toTest = parseInt(number);
//     if (toTest != Math.floor(number) || toTest > 2 || toTest < 0){
//         return false;
//     }
//     return true;
// }

// const gameBoard = (function(){
//     // Constructs the 3x3 grid
//     const grid = [];

//     for (let i =0; i<3; i++){
//         const line = [];
//         for (let j = 0; j < 3; j++) 
//             line.push("_");
//         grid.push(line);
//     }
    const crossSymbol = document.createElement('img');
    crossSymbol.setAttribute("href", "./images/cross.svg");
    crossSymbol.setAttribute("alt", "cross");
    const circleSymbol = document.createElement("img");
    circleSymbol.setAttribute("href", "./images/circle.svg");
    circleSymbol.setAttribute("alt", "circle");
    const blocs = Array.from(document.querySelectorAll(".case"));

//     function checkLines(symbol){
//         return grid.some(line => line.every(bloc => (bloc == symbol)));
//     }

//     function checkDiagonals(symbol){
//         let counter1 = 0;
//         let counter2 = 0;
//         for (let i = 0; i < 3; i++){
//             if (grid[i][i] == symbol){
//                 counter1++;
//             }
//             if (grid[i][2-i] == symbol){
//                 counter2++;
//             }
//         } 
//         if (counter1 == 3 || counter2 == 3){
//             return true;
//         }
//         return false;
//     }

//     function checkColumns(symbol){
//         let counters = [0,0,0,];
//         for (let i = 0; i < 3; i++){
//             for (let j = 0; j < 3;j++){
//                 if (grid[i][j] == symbol){
//                     counters[j]++;
//                 }
//             }
//         }
//         return counters.some(counter => (counter == 3))
//     }

//     // check if a symbol as ended the game 
//     const checkSymbolWin = symbol =>{
//         if (checkLines(symbol) || checkColumns(symbol) || checkDiagonals(symbol)){
//             return true;
//         }
//         return false;
//     }

//     function nonEmpty(i,j){
//         return (grid[i][j] === "_");
//     }

//     function validInput(i,j){
//         if (!checkValidInteger(i) || !checkValidInteger(j)){
//             return false;
//         }
//         i = parseInt(i);
//         j = parseInt(j);
//         return !gameBoard.nonEmpty(i,j);
//     }

//     function placeInput(lign, column, symbol){
//         grid[lign][column] = symbol;
//     }
    

//     function checkFull(){
//         return grid.every(line => line.every(value => (value !== "_")));
//     }
     function displayGrid(){
        for (let i = 0; i < 9; i++){
            let line = Math.floor(i/3);
            let column = i -line;
            if (grid[line][column] == "x"){
                const newCross = crossSymbol.cloneNode()
                blocs[i].replaceChildren(newCross)
            }
            else if (grid[line][column] == "o"){
                const newCircle = crossSymbol.cloneNode()
                blocs[i].replaceChildren(newCircle)
            }
        }
     }

//     return {nonEmpty, checkSymbolWin, checkFull, validInput, placeInput, displayGrid};
// })();




// function createPlayer(name, symbol){

//     function getInput(){
//         let valid = false;
//         while (!valid){
//             ligne = prompt("entrer la ligne");
//             colone = prompt("entrer la colone");
//             valid = gameBoard.validInput(ligne, colone);
//         }
//         return [ligne,colone];
//     }
//     function getSymbol(){
//         return symbol;
//     }
//      const name=name         
//     return {getInput, getSymbol, name}
// }







const playButton = document.querySelector("#play");
const diaolog = document.querySelector("dialog");

playButton.addEventListener("click", (e)=>{
    e.preventDefault();
    diaolog.close();
    const name2 = document.querySelector("#player2-name").value;
    const name1 = document.querySelector("#player1-name").value;
    // const player1 = createPlayer(name1, 'x');
    // const player2 = createPlayer(name2, 'o');

    // const gameLogic = (function(player1, player2){
        const containerPlayerTurn = document.querySelector("#turn")
//     let playerTurn = 1;

//     const players = [player1, player2]

//     function changePlayer(){
//         if (playerTurn === 1){
//             playerTurn++;
//         }
//         else{
//             playerTurn--;
//         }
        containerPlayerTurn.textContent = `It is the turn of ${players[playerTurn -1].name}`
//     }

    //     function letPlayRound(){
            changePlayer()
//         const [lign, column] = players[playerTurn - 1].getInput();
//         const symbol = players[playerTurn -1].getSymbol();
//         gameBoard.placeInput(lign, column, symbol)
//         console.log(gameBoard.displayGrid())
//         if (gameBoard.checkSymbolWin(symbol)){
//             return playerTurn;
//         }
//         else if (gameBoard.checkFull()){
//             return 0;
//         }
//         else{
//             return -1;
//         }
//     }
//     function letPlayGame(){
//         let end = -1;
//         while(end == -1){
//             end = letPlayRound();
//         }
//         if (end !== 0){
//             alert(`Player ${playerTurn} wins`)
//         }
//         else{
//             alert("Tie")
//         }
//     }



//     return {letPlayGame};

// })(player1, player2);

// gameLogic.letPlayGame();
})