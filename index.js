let statusDisplay = document.querySelector(".game-status");
let gameActive = true;
let currentPlayer1 = "Player1"
let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
// Todo : why function and not Simple variable(String);
const winningMessage = () => `Congratulations! ${currentPlayer1} wins`;   /* because is dynamic variable present ${currentPlayer}..if no dyanmic them use 
                                                                        simple string string is static*/

const drawMessage = () => `Draw!`;

const currentPlayerTurn = () => `Its ${currentPlayer1}'s turn`;
statusDisplay.innerHTML = currentPlayerTurn();


function handlecellPlayed(clickedCell, clickCellIndex) {
    gameState[clickCellIndex] = currentPlayer;
    // put the value current player in div which index are click
    clickedCell.innerHTML =  currentPlayer;

}


  // this function calling in handleResultValidation()
  function handlePlayerChange(){
        currentPlayer1= currentPlayer1 == "Player1"?"Player2":"Player1"
      currentPlayer =currentPlayer=="X"?"O":"X";
       statusDisplay.innerHTML= currentPlayerTurn();;
  }

  

function handleResultValidation() {
    let roundWon = false;
    //check for winning condition
    for (let i = 0; i < winningConditions.length; i++) {
        const winningCondition = winningConditions[i];

        let a = gameState[winningCondition[0]];
        let b = gameState[winningCondition[1]];
        let c = gameState[winningCondition[2]];

        if (a == "" || b == "" || c == "") {
            continue;
        }
        if (a == b && b == c) {
            roundWon = true;
            break;

        }
    }
   if(roundWon){
       alert(winningMessage());
       statusDisplay.innerHTML=winningMessage();
       gameActive=false;
       return ;
   }
   // handle draw

   let roundDraw=!gameState.includes("") 
       if (roundDraw) {
           alert(drawMessage());
           statusDisplay.innerHTML=drawMessage();
           gameActive=false;
           return;
           
       }
   

   handlePlayerChange();

}


function handleCellClick(clickCellEvent) {
   
    const clickedCell = clickCellEvent.target;
    const clickCellIndex = parseInt(clickedCell.getAttribute("data-cell-index")); //convert string into number
    //console.log("cell Clicked", clickCellIndex);

    if (gameState[clickCellIndex] !== "" || !gameActive) { //check index click or not and  either game over before click
        return;
    }
    // if everything is fine

    // check the state of cell
    //check if somebody won after that click 

    handlecellPlayed(clickedCell, clickCellIndex);
    handleResultValidation();

}



    function handleRestartGame() {
         gameActive = true;
         currentPlayer="X";
           currentPlayer1 = "Player1"
         gameState = ["", "", "", "", "", "", "", "", ""];
         statusDisplay.innerHTML = currentPlayerTurn();
        document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

document.querySelectorAll(".cell").forEach((cell) => cell.addEventListener("click", handleCellClick));

document.querySelector(".game-restart").addEventListener("click", handleRestartGame);