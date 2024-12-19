import { useState ,useEffect} from 'react'
import { Outlet ,useLocation,useNavigate} from 'react-router-dom'
import Header from './layouts/Header'
import './App.css'

import Main from './layouts/Main'

function App() {
  const navigate=useNavigate()
  const location=useLocation();
useEffect(()=>{
  if(location.pathname==="/"){
    console.log("location")
    navigate("/todo")
  }
},[])
  

  
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
