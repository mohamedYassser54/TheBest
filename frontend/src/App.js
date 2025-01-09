import React, { useState, useRef, useEffect } from 'react';

import { Routes,Route,BrowserRouter} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import Navbars from './component/Navbar.js'
import MovingLinesBackground from './component/MovingLinesBg.js'
import Vote from './component/cards/Vote.js'
import Results from './component/cards/Results.js'

import './App.css'


const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const App = () => {
  const [randomString, setRandomString] = useState(generateRandomString(6));
  const [userInput, setUserInput] = useState('');
  const [isHuman, setIsHuman] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const canvasRef = useRef(null);


  useEffect(() => {
    
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 

    ctx.font = '36px Arial';
    ctx.fillStyle = '#fff'; 
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(randomString, ctx.canvas.width / 2, ctx.canvas.height / 2);
  }, [randomString]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput === randomString) {
      setIsHuman(true);
    } else {
      setErrorMessage('الرمز المدخل غير صحيح. حاول مرة أخرى.');
      setUserInput('');
      setRandomString(generateRandomString(6)); 
    }
  };
 
  return(
  <BrowserRouter>
    <MovingLinesBackground />
    <div className="App">
    {!isHuman ? (
        <div className="randomStringCard">
          <h3>أدخل الأحرف أو الأرقام التالية</h3>
          <canvas ref={canvasRef} width={250} height={100}></canvas>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="أدخل الأحرف هنا"
              className="captchaInput"
            />
            <button type="submit" className="submitButton">
              تحقق
            </button>
          </form>
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        </div>
      ) : (
      <Routes>
       <Route path="/" element={
        <div>
          <Navbars/>

          <Vote/>
        </div>
        }/>
       <Route path="/Results" element={
        <div>
          <Navbars/>

          <Results/>
        </div>
        }/>
      

      </Routes>
      )}
  </div>
  
  </BrowserRouter>
  )
}
export default App;

