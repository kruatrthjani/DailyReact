import { createBrowserRouter,useNavigate } from "react-router-dom"
import App from "../App";
import Todo from "../pages/Todo";
import Counter from "../pages/Counter";



export const routes=createBrowserRouter([
    
    {
        path:"/",
        element:<App/>,
        children:[            
            {
                path:"/todo",
                element:<Todo/>
            },
            {
                path:"/counter",
                element:<Counter/>
            },
        
        ]
    },
    ])

