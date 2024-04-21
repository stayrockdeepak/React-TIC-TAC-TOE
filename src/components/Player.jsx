import { useState } from "react";

export default function Player({initialName,symbol, isActive, onChangeName}){
   const [playerName, setPlayerName] = useState(initialName);

   const [isEditing, setIsEditing] = useState(false);

   function handleClickEdit(){
       setIsEditing(editing=>!editing);
       if(isEditing){
        onChangeName(symbol,playerName);
       }
   }

   function handleChange(event){
    setPlayerName(event.target.value)
   }

   let editPlayerName = <span className="player-name">{playerName}</span>
   if(isEditing){
    editPlayerName = <input type="text" value={playerName} onChange={handleChange}  required/>
   }
    return(
        <li className={isActive ? 'active' : undefined}>
            <span className="player-info">
              {editPlayerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClickEdit}>{isEditing?'Save':'Edit'}</button>
        </li>
    );
}