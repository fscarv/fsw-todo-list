import { ChevronRightIcon, Rocket, Trash } from "lucide-react"
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Tasks({ tasks, onTaskClick, onTaskDelete }) {
    const navigate = useNavigate();

    function onTaskDetails(task) {
        const query = new URLSearchParams();
        query.append("title", task.title);
        query.append("description", task.description);
        navigate(`/task?${query.toString()}`);
    }

    return (
        <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
            {tasks.length === 0 && <p className="text-slate-400 flex gap-2 justify-center">Nenhuma tarefa encontrada <Rocket /></p>}{tasks.map((task) => (
                <li key={task.id} className="flex gap-2" >
                    <button
                        onClick={() => onTaskClick(task.id)}
                        className={`bg-slate-400 text-left w-full text-white p-2 rounded-md ${task.isCompleted && "line-through"}`}
                    >
                        {task.title}
                    </button>
                    <Button
                        onClick={() => onTaskDetails(task)}
                        className="bg-slate-400 p-2 rounded-md text-white"
                    >
                        <ChevronRightIcon />
                    </Button>
                    <Button
                        className="bg-slate-400 p-2 rounded-md text-white"
                        onClick={() => onTaskDelete(task.id)}
                    >
                        <Trash />
                    </Button>
                </li>
            ))}
        </ul>
    )
}

export default Tasks