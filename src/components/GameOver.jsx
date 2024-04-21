export default function GameOver({winner, onRestart}){
    return(
        <div id="game-over">
            <h1>Game Over!</h1>
            {winner && <p>{winner} won!</p>}
            {!winner && <p>It's a Draw!</p>}
            <p>
                <button onClick={onRestart}>Rematch!</button>
            </p>
        </div>
    )
}