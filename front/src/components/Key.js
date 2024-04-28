import { useContext } from "react";
import React from "react";
import { AppContext } from "../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faBackspace } from '@fortawesome/free-solid-svg-icons';

function Key({ keyVal, disabled }) {
    const { onSelectLetter, onEnter, onDelete } = useContext(AppContext);

    const selectLetter = () => {
        if (keyVal === "ENTER") {
            onEnter();
        } else if (keyVal === "DELETE") {
            onDelete();
        } else {
            onSelectLetter(keyVal)
        }
    }

    return (
        <div 
            className="col p-1 key border rounded-pill cursor-pointer" 
            style={{margin: "1px"}}
            id={disabled ? "disabled" : ""}             
            onClick={selectLetter}            
            >                
                {keyVal === "ENTER" ? <FontAwesomeIcon icon={faArrowRightToBracket} /> 
                    : keyVal === "DELETE" ? <FontAwesomeIcon icon={faBackspace} /> 
                        : keyVal}
        </div>
    )
}

export default Key;