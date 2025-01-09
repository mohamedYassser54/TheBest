import React, { useState } from "react";

import { Routes,Route,BrowserRouter} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import Navbars from './component/Navbar.js'
import MovingLinesBackground from './component/MovingLinesBg.js'
import Vote from './component/cards/Vote.js'
import Results from './component/cards/Results.js'
const App = () => {
  const [isHuman, setIsHuman] = useState(false);

  const handleCaptcha = (value) => {
    if (value) {
      setIsHuman(true);
    } else {
      setIsHuman(false);
    }
  };
  return(
  <BrowserRouter>
    <MovingLinesBackground />
    <div className="App">
    {!isHuman ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <ReCAPTCHA
              sitekey="6LdmNbIqAAAAANKD1PABM1aPw7La1puyiVZy3A6C" 
              onChange={handleCaptcha}
            />
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

