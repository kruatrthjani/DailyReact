import { useState, useEffect, useContext, useReducer } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { TaskContext } from "../../main";
import { reducer, intialState } from "../../services/reducers/counter";
import Button from "../../components/Button";


export default function TodoItem() {
    const [name, setName] = useState('');
    //const [tasks, setTasks] = useState([]);
    const { tasks, setTasks } = useContext(TaskContext)
    //const [filter, setFilter] = useState('all');
    const [localTasks, setLocalTasks] = useState([])
    const navigate = useNavigate();
    const location = useLocation();
    const [state, dispatch] = useReducer(reducer, intialState)
    const [select, setSelect] = useState('all')
    const [editIndex, setEditIndex] = useState(false)

    useEffect(() => {
        const timers = tasks
            .filter((task) => task.running)
            .map((task) =>
                setInterval(() => incrementTimer(task.id), 1000)
            );

        return () => timers.forEach((timer) => clearInterval(timer));
    }, [tasks]);



    useEffect(() => {
        taskcontent();
    }, [tasks])


    useEffect(() => {
        setTasks([])
    }, [location.pathname])


    const addTask = async () => {
        console.log("id in add=", editIndex)
        if (editIndex) {
            const alltask = tasks.map((task) => task.id == editIndex ? { ...task, name: name } : task)
            console.log(alltask)
            setTasks(alltask)
            taskcontent()
            setEditIndex(null)
            setName('')
        }
        else {
            try {
                const taskData = {
                    id: Date.now(),
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
        }
    };




    const completeTask = async (id) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, mark: !task.mark } : task);
        setTasks(updatedTasks);
        taskcontent()
    };

    const deleteTask = async (id) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks)
    };

    function EditName(id) {
        console.log("id=", id)
        const data = tasks.find((task) => task.id == id)
        console.log(data)
        setName(data.name)
        setEditIndex(data.id)
    }

    function taskcontent(e) {
        let value = ''
        if (!e) {
            value = select
        }
        else {
            value = e.target.value
        }
        setSelect(value)
        switch (value) {
            case 'all': {
                setLocalTasks(tasks)
                break;
            }
            case 'pending': {
                const temp = tasks.filter((task) => task.mark === false)
                setLocalTasks(temp)
                break;
            }
            case 'completed': {
                const temp = tasks.filter((task) => task.mark === true)
                setLocalTasks(temp)
                break;
            }
            default: {
                setLocalTasks(tasks)
            }

        }
    }


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
        const updatedTasks = tasks.map((task) => {
            if (task.id === id && task.running) {
                return { ...task, timer: task.timer + 1 }
            }
            return task;
        });
        setTasks(updatedTasks)
    };


    return (
        <>
            {/* <div className=" flex justify-center gap-x-3 ">
                <span>
                    <Button onClick={() => dispatch({ type: "decrement" })} disabled={state.counter === 0}>decrement</Button>
                </span>
                <span>
                    <p className="font-bold text-white bg-slate-600 px-3 rounded-md inline-block">counter:{state.counter}</p>
                </span>
                <span>
                    <Button onClick={() => dispatch({ type: "increment" })}>increment</Button>
                </span>
            </div> */}
            <div className="flex gap-x-3  justify-center mt-5">
                <span>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="border border-blue-500 rounded-md pl-2"
                        placeholder="Enter task" />
                </span>
                <span>
                    <Button onClick={() => addTask()}>{editIndex ? 'update' : 'add'}</Button>
                </span>
                <Button > <Link to="/counter">Go To Counter</Link></Button>
                <select onChange={taskcontent} className="bg-slate-300 text-red-600">
                    <option value="all">all</option>
                    <option value="pending">pending</option>
                    <option value="completed">completed</option>
                </select>
            </div>



            {localTasks.map((task) => (
                <div
                    key={task.id}
                    className="gap-x-3 flex bg-slate-300 text-blue-700 my-3 w-6/12 justify-center mx-auto rounded-sm p-2 "
                >
                    <p
                        style={{
                            textDecoration: task.mark ? "line-through" : "none",
                        }}
                    >
                        {task.name} (Timer: {task.timer}s){/*button onClick={EditTask}><i className="fa-regular fa-edit"></i></button>*/}
                    </p>
                    <Button

                        onClick={() => deleteTask(task.id)}
                    >
                        Delete
                    </Button>
                    <Button
                        style={{ border: "1px solid black" }}
                        onClick={() => completeTask(task.id)}
                    >
                        Mark
                    </Button>
                    {task.running ? (
                        <Button
                            style={{ border: "1px solid black" }}
                            onClick={() => updateTimer(task.id, "stop")}
                        >
                            Pause
                        </Button>
                    ) : (
                        <Button
                            style={{ border: "1px solid black" }}
                            onClick={() => updateTimer(task.id, "start")}
                        >
                            Start
                        </Button>
                    )}
                    <Button
                        style={{ border: "1px solid black" }}
                        onClick={() => updateTimer(task.id, "reset")}
                    >
                        Reset
                    </Button>
                    <Button onClick={() => EditName(task.id)}>
                        Edit
                    </Button>
                </div>
            ))}



            {/* <div >
                <p className="font-bold text-center w-full">Filtered</p>                
                {localTasks.map((task) => (
                    <span className="flex justify-center">
                        <p className=" bg-yellow-500 text-white  px-2 rounded-sm inline my-2 ">{task.name}</p>
                    </span>
                ))}
            </div> */}
        </>
    );
}
