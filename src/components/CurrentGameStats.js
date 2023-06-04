import { useState, useEffect } from "react";

const CurrentGameStats = ({newGameMessage}) => {

    const [stateNewGameMessage, setStateNewGameMessage] = useState();
    const message = newGameMessage.message;
    const currentScore = newGameMessage.currentScore;
    const maxScore = newGameMessage.maxScore;
    const penalty = newGameMessage.penalty;
    

    useEffect(()=>{
        setStateNewGameMessage(newGameMessage)
    },[newGameMessage])

    return ( 
        <>
            <br/><br/>
            {message}
            <br/><br/>
            {currentScore == null ? null : <>Score: {currentScore} / {maxScore} &emsp;&emsp; Penalty: {penalty}</>}
            
            
        </>
     );
}
 
export default CurrentGameStats;





















