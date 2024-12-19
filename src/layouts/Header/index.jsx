import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="bg-blue-500 text-white mb-3">
            <h1 className="font-bold">Header</h1>
            <span className="flex justify-center gap-x-5">
                <Link to="/todo" className="hover:bg-black px-2 rounded-xl">Todo</Link>
                <Link to="/counter" className="hover:bg-black px-2 rounded-xl">counter</Link>
                <Link to="/reduxcounter" className="hover:bg-black px-2 rounded-xl">Redux Counter</Link>
                <Link to="/reduxtask" className="hover:bg-black px-2 rounded-xl">Redux Task</Link>
            </span>
        </div>
    )
}
