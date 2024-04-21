export default function GameBoard({onSelectBoard, board}){ 
    return(
       <ol id="game-board">
           {board.map((row,rowIndex)=>{
               return <li key={rowIndex}>
                   <ol>{row.map((playerSymbol,colIndex)=>{
                       return <li key={colIndex}>
                           <button onClick={()=>onSelectBoard(rowIndex, colIndex)} disabled={playerSymbol !== null}>
                                {playerSymbol} 
                           </button>
                       </li>
                   })}</ol>
               </li>
           })}
       </ol>
    )
}