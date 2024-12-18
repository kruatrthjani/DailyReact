import { useNavigate } from "react-router-dom"
export default function Counter(){
    const navigate=useNavigate()
    return(
        <>
            <button>-</button>
            <p>Label</p>
            <button>+</button>
            <button onClick={()=>navigate("/todo")}>Go To Todo </button>
        </>
    )
}