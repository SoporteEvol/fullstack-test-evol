import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./ui/Modal";

type TaskCardProps = {
    task: {
        id: string;
        title: string;
        description: string;
        completed: boolean;
        dueDate?: Date; // Fecha de vencimiento opcional
    };
    onDeleteTask: (id: string) => void;
    onCompletedTask: (id: string, completed: boolean) => void;
};

function TaskCard({ task, onDeleteTask, onCompletedTask }: TaskCardProps) {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const [isOverdue, setIsOverdue] = useState<boolean>(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!task.completed) {
            console.log("task.dueDate", task.dueDate);
            console.log("new Date()", new Date());
            const isOverdue = new Date(task.dueDate).setHours(0, 0, 0, 0) < new Date().setHours(23, 59, 59, 999);
            setIsOverdue(isOverdue);
        }
    }, [task]);

    const handleDeleteTask = (id: string) => {
        onDeleteTask(id);
        setConfirmDelete(false);
    };

    console.log("isOverdue", isOverdue);
    return (
        <div
            className={`${
                task.completed
                    ? "bg-green-500"
                    : isOverdue
                    ? "bg-red-400"
                    : "bg-yellow-400"
            } shadow-md rounded-lg p-4 relative`}
        >
            {/* Título y descripción */}
            <h2 className="text-lg font-semibold">{task.title}</h2>
            <p className="text-sm text-black-600">{task.description}</p>

            {/* Estado de la tarea */}
            <p
                className={`mt-2 text-sm font-medium ${
                    task.completed
                        ? "text-black"
                        : isOverdue
                        ? "text-black"
                        : "text-black"
                }`}
            >
                {task.completed
                    ? "✔ Completada"
                    : isOverdue
                    ? "❌ Tarea vencida"
                    : "⚠ Pendiente"}
            </p>

            {/* Botón de menú ⋮ */}
            <div className="absolute top-2 right-2" ref={menuRef}>
                <button onClick={() => setMenuOpen(!menuOpen)}>⋮</button>
                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md z-10">
                        <Link
                            to={`/tasks/${task.id}`}
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                            Ver Detalles
                        </Link>
                        <Link
                            to={`/edit-task/${task.id}`}
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                            Editar
                        </Link>
                        <button
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={() => onCompletedTask(task.id, task.completed)}
                        >
                            {task.completed ? "Marcar como incompleta" : "Marcar como completada"}
                        </button>
                        <button
                            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                            onClick={() => setConfirmDelete(true)}
                        >
                            Eliminar
                        </button>
                    </div>
                )}
            </div>

            <Modal isOpen={confirmDelete} onClose={() => setConfirmDelete(false)}>
                <div className="bg-white p-4 rounded-md shadow-md">
                    <h2 className="text-lg font-semibold">¿Estás seguro de eliminar esta tarea?</h2>
                    <div className="flex justify-end mt-4">
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded-md"
                            onClick={() => setConfirmDelete(false)}
                        >
                            Cancelar
                        </button>
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded-md ml-2"
                            onClick={() => handleDeleteTask(task.id)}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default TaskCard;
