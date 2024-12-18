import { useState,useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../../main";



export default function TodoItem() {    
    const [name, setName] = useState('');
    //const [tasks, setTasks] = useState([]);
    const {tasks,setTasks}=useContext(TaskContext)
    //const [filter, setFilter] = useState('all');
    const navigate=useNavigate();

    useEffect(() => {
        const timers = tasks
            .filter((task) => task.running)
            .map((task) =>
                setInterval(() => incrementTimer(task.id), 1000)
            );

        return () => timers.forEach((timer) => clearInterval(timer));
    }, [tasks]);



    const addTask = async () => {
        try {
            const taskData={
                id:Date.now(),
                name,
                mark: false,
                timer: 0, // Timer in seconds
                running: false,
            }
            
            setTasks((prevTasks) => [...prevTasks, taskData]);
            setName('');
        } catch (err) {
            console.error(err.message);
        }
    };

    const completeTask = async (id) => {
        const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, mark: !task.mark } : task);
        setTasks(updatedTasks);
    };

    const deleteTask = async (id) => {
        const updatedTasks=tasks.filter((task)=>task.id!==id);
        setTasks(updatedTasks)
    };

    const updateTimer = async (id, type) => {        
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) { // Check if the task matches the given id
                if (type === "start") {
                    return { ...task, running: true };
                } else if (type === "stop") {
                    return { ...task, running: false };
                } else if (type === "reset") {
                    return { ...task, timer: 0, running: false };
                }
            }
            return task;
        });
        setTasks(updatedTasks)
    };

    const incrementTimer = async (id) => {
        const updatedTasks=tasks.map((task)=>{
            if(task.id===id && task.running){                
                    return {...task,timer:task.timer+1}                                
            }
            return task;
        });
        setTasks(updatedTasks)
    };

    return (
        <>
        <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
        <button onClick={()=>addTask()}>Add</button>
        {tasks.map((task) => (
            <div
                key={task.id}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
                <p
                    style={{
                        textDecoration: task.mark ? "line-through" : "none",
                    }}
                >
                    {task.name} (Timer: {task.timer}s)
                </p>
                <button
                    style={{ border: "1px solid black" }}
                    onClick={() => deleteTask(task.id)}
                >
                    Delete
                </button>
                <button
                    style={{ border: "1px solid black" }}
                    onClick={() => completeTask(task.id)}
                >
                    Mark
                </button>
                {task.running ? (
                    <button
                        style={{ border: "1px solid black" }}
                        onClick={() => updateTimer(task.id, "stop")}
                    >
                        Pause
                    </button>
                ) : (
                    <button
                        style={{ border: "1px solid black" }}
                        onClick={() => updateTimer(task.id, "start")}
                    >
                        Start
                    </button>
                )}
                <button
                    style={{ border: "1px solid black" }}
                    onClick={() => updateTimer(task.id, "reset")}
                >
                    Reset
                </button>
            </div>
        ))}
        <button onClick={()=>navigate("/counter")}> Go To Counter</button>
    </>
    );
}
