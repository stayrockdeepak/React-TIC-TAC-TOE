import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination.js";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length>0 && gameTurns[0].player ==='X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveGameboard(gameTurns){
  let gameboard = [...initialGameBoard.map(array => [...array])];
  
  for(const turn of gameTurns){
      const {square, player} = turn;
      const {row, col} = square;
      gameboard[row][col] = player;
  }
  return gameboard;
}

function deriveWinner(gameboard,players){
  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameboard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameboard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameboard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([]);

  const gameboard = deriveGameboard(gameTurns);
  const activePlayer = deriveActivePlayer(gameTurns);
  const winner = deriveWinner(gameboard,players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleGameBoard(rowIndex,colIndex){
    setGameTurns((prevTurns)=>{
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns,
      ];
      return updatedTurns; 
    })
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol,newName){
    setPlayers(prevPlayers =>{
      return{
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
        <Player 
          initialName={PLAYERS.X} 
          symbol="X" 
          isActive={activePlayer==='X'}
          onChangeName={handlePlayerNameChange} />
        <Player 
          initialName={PLAYERS.O} 
          symbol="O" 
          isActive={activePlayer==='O'}
          onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectBoard={handleGameBoard} board={gameboard}/>
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
