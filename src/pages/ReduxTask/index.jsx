import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import Button from '../../components/Button'
import { addTaskThnuk, deleteTaskThunk, editTaskThunk, fetchTaskThunk, completeTaskThunk } from "../../services/TasklSlice"

export default function ReduxTaskManager() {
        const [name, setName] = useState('')
        const [editingId, setEditingId] = useState(null)
        const [localTasks, setLocalTasks] = useState([])
        const [filtered, setFiltered] = useState('all')
        const dispatch = useDispatch()
        const { tasks, status, error } = useSelector((state) => state.Task)

        useEffect(() => {
                if (status == "idle") {
                        dispatch(fetchTaskThunk())
                }
        }, [dispatch, status])


        useEffect(() => {
                filterTask(filtered)
        }, [tasks])


        const AddTask = (data) => {
                if (!editingId) {
                        const taskData = {
                                id: Date.now(),
                                name: name,
                                completed: false
                        }
                        console.log("data=", taskData)
                        dispatch(addTaskThnuk(taskData))
                }
                else {
                        const data = {
                                id: editingId,
                                name,
                        }

                        dispatch(editTaskThunk(data))
                }
                setName('')
                setEditingId(null)
        }


        const filterTask = (type) => {

                console.log("type=", type)
                setFiltered(type)
                switch (type) {
                        case 'all': {
                                setLocalTasks(tasks)
                                break;
                        }
                        case 'pending': {
                                const pending = tasks.filter((task) => task.completed == false)
                                setLocalTasks(pending)
                                break;
                        }
                        case 'completed': {
                                const completed = tasks.filter((task) => task.completed === true)
                                console.log("completed=", completed)
                                setLocalTasks(completed);
                                break;
                        }
                        default: {
                                setLocalTasks(tasks)
                        }

                }
        }

        const EditTask = (id, name) => {
                setName(name)
                setEditingId(id)
        }

        if (status === "idle" || status === "loading") return <p>loading..</p>
        if (error) return <p>{error.message}</p>

        return (<>
                <select onChange={(e) => filterTask(e.target.value)}>
                        <option value="all">All</option>
                        <option value="pending">pending</option>
                        <option value="completed">completed</option>
                </select>



                <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-blue-500"
                        placeholder="Enter task"
                />
                <Button onClick={() => AddTask()} >{editingId ? 'Update' : 'Add'}</Button>

                {localTasks.map((task) =>
                        <span key={task.id}>
                                <p >{task.name}</p>

                                <Button onClick={() => dispatch(deleteTaskThunk(task.id))}>Delete</Button>
                                <Button onClick={() => EditTask(task.id, task.name)}>Edit</Button>
                                <Button onClick={() => dispatch(completeTaskThunk(task.id))}>{task.completed ? 'incomplete' : 'complete'}</Button>
                        </span>
                )}
        </>
        )
}