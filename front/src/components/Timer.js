import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { formatDate } from '../utils/utils';

const Timer = () => {
    const { elapsedTime, setElapsedTime, gameOver } = useContext(AppContext);

    useEffect(() => {
        const startTime = Date.now();

        const timerID = setInterval(() => {
            if(!gameOver.gameOver){
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;
                setElapsedTime(elapsed);
            }
        }, 1000);

        return () => {
            clearInterval(timerID);
        };
    }, [gameOver.gameOver]);

    
    const formatted = formatDate(elapsedTime)

    return (
        ""
    );
};

export default Timer;
