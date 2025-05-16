import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import { ToastProvider } from "./components/Toast/ToastProvider";

function App() {
    const [tasks, setTasks] = useState(
        JSON.parse(localStorage.getItem("tasks")) || []
    );

    useEffect(() => {
        localStorage.setItem("tasks", 
            JSON.stringify(tasks)
        );
    }, [tasks]);

    function onTaskClick(taskId) {
        const newTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return { ...task, isCompleted: !task.isCompleted };
            }
            return task;
        });
        setTasks(newTasks);
    }

    function onTaskDelete(taskId) {
        const newTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(newTasks);
    }

    function onTaskAdd(title, description) {
        const newTask = {
            id: v4(),
            title: title,
            description: description,
            isCompleted: false
        };
        setTasks([...tasks, newTask]);
    }

    return (
        <ToastProvider>
            <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
                <div className="w-[500px] space-y-4">
                    <h1 className="text-3xl text-slate-100 font-bold text-center">Gerenciador de Tarefas</h1>
                    <AddTask
                        onTaskAdd={onTaskAdd}
                    />
                    <Tasks
                        tasks={tasks}
                        onTaskClick={onTaskClick}
                        onTaskDelete={onTaskDelete}
                    />
                </div>
            </div>
        </ToastProvider>
    );
}

export default App;