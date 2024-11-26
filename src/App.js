import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'



const App=(props)=> {

 
   
   const [progress,setProgress]=useState({progress: 10})

   const useProgress=(progress)=>{
    setProgress({progress:progress})
  }



    return (
      <div >
        <BrowserRouter>
         <Navbar></Navbar>
         <LoadingBar
        color='#f11946'
        progress={progress.progress}
        height={3}
        shadow={true}
      />
         <Routes>
             <Route path="/"  element={ <News  setProgress={useProgress}  key="general" category="general"/>} />
             <Route path="/business"  element={ <News  setProgress={useProgress}  key="business" category="business"/>} />
             <Route path="/entertainment" element={ <News  setProgress={useProgress}  key="entertainment" category="entertainment"/>} />
             <Route path="/health" element={ <News  setProgress={useProgress}   key="health" category="health"/>} />
             <Route path="/science"  element={ <News  setProgress={useProgress}  key="science" category="science"/>} />
             <Route path="/sports"  element={ <News  setProgress={useProgress}  key="sports" category="sports"/>} />
             <Route path="/technology"  element={ <News  setProgress={useProgress}  key="technology" category="technology"/>} />
         </Routes>
        
        </BrowserRouter>
      </div>
    )
  
}

export default App
