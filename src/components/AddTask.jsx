import { useState } from "react";
import { useToast } from "./Toast/ToastProvider";
import Input from "./Input";

function AddTask({ onTaskAdd }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const Toast = useToast();

    function clearInputs() {
        setTitle("");
        setDescription("");
    }

    function handleAddTask() {
        if (title.trim() === "") {
            Toast.warn("Preencha o título da tarefa!");
            return;
        }
        
        if (description.trim() === "") {
            Toast.warn("Preencha a descrição da tarefa!");
            return;
        }

        onTaskAdd(title, description);
        Toast.success("Tarefa adicionada com sucesso!");
        clearInputs();
    }

    return (
        <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
            <Input
                value={title}
                type="text"
                placeholder="Digite o título da tarefa"
                onChange={(e) => setTitle(e.target.value)}
            />
            <Input
                value={description}
                type="text"
                placeholder="Digite a descrição da tarefa"
                onChange={(e) => setDescription(e.target.value)}
            />
            <button
                className="bg-slate-400 text-white px-4 py-2 rounded-md font-medium"
                onClick={() => {handleAddTask()}}
            >
                Adicionar tarefa
            </button>
        </div>
    )
}

export default AddTask