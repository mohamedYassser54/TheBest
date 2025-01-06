import React from 'react';

import { Routes,Route,BrowserRouter} from "react-router-dom";

import Navbars from './component/Navbar.js'
import MovingLinesBackground from './component/MovingLinesBg.js'
import Vote from './component/cards/Vote.js'
import Results from './component/cards/Results.js'
const App = () => {
  return(
  <BrowserRouter>
    <MovingLinesBackground />
  <div className="App">
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
      
  </div>
  
  </BrowserRouter>
  )
}
export default App;

