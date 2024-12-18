import { useNavigate } from "react-router-dom"
import { useState } from "react"
import CounterTimer from "../../components/Countertimer"
export default function Counter(){
    const navigate=useNavigate()
    const [counter,setCounter]=useState(0)
    return(
        <>
            <button onClick={()=>setCounter(counter-1)}>-</button>
            <p>{counter}</p>
            <button onClick={()=>setCounter(counter+1)}>+</button>
            <button onClick={()=>navigate("/todo")}>Go To Todo </button>
            <CounterTimer/>
        </>
    )
}