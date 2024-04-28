import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPos, attemptVal }) {
    const { board, currAttempt, setCurrAttempt, gameOver, rowState } = useContext(AppContext);
    const letter = board[attemptVal][letterPos]; // La letra de la celda actual

    // Obtenemos el estado de la letra
    const letterState = currAttempt.attempt > attemptVal && rowState.length > 0 ? rowState[attemptVal][letterPos] : null;
    
    // Para seleccionar la letra sobre el tablero
    const isCurrentCell = !gameOver.gameOver && currAttempt.attempt === attemptVal && currAttempt.letterPos === letterPos;
    let cellClassName = "";
    if (isCurrentCell) {
        cellClassName = "current-cell";
    }

    function handleCellClick() {
        if (attemptVal === currAttempt.attempt)
            setCurrAttempt({ attempt: attemptVal, letterPos: letterPos })
    }
    
    return (
        <div
            className={`col border custom-border rounded-circle d-flex justify-content-center align-items-center fw-bold fs-5 ${cellClassName}`}
            id={letterState}
            onClick={handleCellClick}
            style={{
                height: "40px",
                width: "40px",
                margin: "1px",
            }}
        >
            {letter}
        </div>
    )
}

export default Letter;