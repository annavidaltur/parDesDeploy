import { wordSet } from './paraules.js';

export const boardDefault = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ];

// Lee la batería de palabras y las carga en wordSet
export const generateWordSet = async () => {    
  let todaysWordArr;
  
  // Selecciona una palabra al azar del wordSet
  const randomIndex = Math.floor(Math.random() * wordSet.length);
  todaysWordArr = wordSet[randomIndex];

  return { 
      wordSet: wordSet, 
      todaysWord: todaysWordArr.correct.toUpperCase(), 
      todaysWordClean: todaysWordArr.withoutAccent.toUpperCase()
  };
};