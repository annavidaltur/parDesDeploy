import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import React, { useState, createContext } from "react";
import { boardDefault } from "./Words";
import 'bootstrap/dist/css/bootstrap.min.css';
import GameOverModal from './components/GameOverModal';
import axios from 'axios';

const urlBack = process.env.URL_BACK;
export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault); // Tablero
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 }); // Puntero fila,col
  const [disabledLetters, setDisabledLetters] = useState([]); // Letras deshabilitadas del teclado
  const [gameOver, setGameOver] = useState({ gameOver: false, guessedWord: false })
  const [elapsedTime, setElapsedTime] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [rowState, setRowState] = useState([]); // Indica estado de cada letra de la fila

  const onSelectLetter = (keyVal) => {
    if (!gameOver.gameOver) // Si ha acabado el juego no permitimos escribir
    {
      if (currAttempt.letterPos > 4) // Si ha escrito las 5 letras de la fila no hacemos nada
        return;
      const newBoard = [...board] // Copiamos el tablero (board)

      newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal // Asignamos la letra clickeada a la fila y pos
      setBoard(newBoard) // ACctualizamos el tablero
      setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 }) // Actualizamos el puntero para que la próxima letra se escriba en la posición siguiente. La fila se mantiene
    }
  }

  const onDelete = () => {
    const newBoard = [...board] // Copiamos el tablero (board)

    if (currAttempt.letterPos === 0) // Si estamos en la pos=0 no hacemos nada
    {
      newBoard[currAttempt.attempt][currAttempt.letterPos] = ""
      setBoard(newBoard)
      setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos })
    }
    else if (currAttempt.letterPos < 5) {
      newBoard[currAttempt.attempt][currAttempt.letterPos] = "" // Borramos la letra
      setBoard(newBoard) // Actualizamos el tablero
      setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 }) // Actualizamos el puntero para quitar una posición. La fila se mantiene      
    }
    else // currAttemps.letterPos === 5
    {
      newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "" // Borramos la letra
      setBoard(newBoard) // Actualizamos el tablero
      setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 }) // Actualizamos el puntero para quitar una posición. La fila se mantiene
    }

  }

  const onEnter = async () => {
    // Obtenemos la palabra escrita en la fila actual
    let currWord = "";
    for (let i = 0; i < 5; i++) {
      if (board[currAttempt.attempt][i] === "") // Si no están las 5 letras no hacemos nada
        return;
      currWord += board[currAttempt.attempt][i];
    }


    try {
      // Realizamos una solicitud al backend para verificar si la palabra existe en la batería
      const response = await axios.post(urlBack + '/CheckWord', { word: currWord });
      const data = response.data;

      if (data.exists) {
        setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 }) // Pasamos a la siguiente fila y reseteamos la posición a 0

        // Establecemos el estado de cada letra de la fila enviada
        setRowState((prev) => [...prev, data.rowState]);

        // Comprobamos si la palabra es la correcta
        if (data.isCorrect) {
          setGameOver({ gameOver: true, guessedWord: true })
          openModal();
          return;
        }

        // Deshabilitamos las letras del teclado que no sean correctas ni almost
        setDisabledLetters((prev) => [...prev, ...data.disabledLetters])

        // La palabra no es correcta y ha hecho 6 intentos
        if (currAttempt.attempt === 5) {
          setGameOver({ gameOver: true, guessedWord: false })
          openModal();
        }
      } else {
        alert("No existeix la paraula");
      }


    } catch (error) {
      console.error('Error al verificar la palabra:', error);
    }
  }

  const onMoveLeft = () => {
    if (currAttempt.letterPos <= 5 && currAttempt.letterPos > 0) {
      setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 })
    }
  }

  const onMoveRight = () => {
    if (currAttempt.letterPos < 4) {
      setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 })
    }
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="App">
      <h3 className="text-center mt-3">PARAULA DESCOBERTA</h3>

      <AppContext.Provider
        value={{
          board, setBoard,
          currAttempt, setCurrAttempt,
          onSelectLetter, onEnter, onDelete,
          onMoveRight, onMoveLeft,
          disabledLetters, setDisabledLetters,
          gameOver, setGameOver,
          elapsedTime, setElapsedTime,
          rowState
        }}>
        <div className="container mt-5">
          <div className="row">
            <div className='col-12 text-center'>
              <Board />
              <Keyboard />
            </div>
          </div>
        </div>
        <GameOverModal isOpen={modalOpen} onClose={closeModal} />
        {/* <Timer /> */}
      </AppContext.Provider>
    </div>
  );
}

export default App;
