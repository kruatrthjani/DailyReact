import { useState } from 'react'
import { Outlet ,useLocation,useNavigate} from 'react-router-dom'
import Header from './layouts/Header'
import './App.css'

import Main from './layouts/Main'

function App() {
  const location=useLocation();
  const navigate=useNavigate();

  if(location.pathname==="/"){
    navigate("/todo")
  }

  
  return (
    <div className="screen">
      <div style={{textAlign:"center"}}>
        <Header/>
      </div>
      <div >
        <Outlet/>
      </div>
    </div>
  )
}

export default App
