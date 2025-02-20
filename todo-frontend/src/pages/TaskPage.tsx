import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";

function TaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const [task, setTask] = useState<any>(null);

  useEffect(() => {
    const foundTask = tasks.find((t) => t.id == id);
    setTask(foundTask);
  }, [tasks, id]);

  const isOverdue =
    task?.dueDate && !task.completed && new Date(task.dueDate).setHours(0, 0, 0, 0) < new Date().setHours(23, 59, 59, 999);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      {task ? (
        <div className="bg-white shadow-md rounded-lg p-6 w-96">
          <h2 className="text-xl font-semibold">{task.title}</h2>
          <p className="text-gray-600">{task.description}</p>

          {/* Estado de la tarea */}
          <p
            className={`mt-2 text-sm font-medium ${
              task.completed
                ? "text-green-600"
                : isOverdue
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {task.completed
              ? "✔ Completada"
              : isOverdue
              ? "❌ Tarea vencida"
              : "⚠ Pendiente"}
          </p>

          {/* Tags */}
          {task.tags?.length > 0 && (
            <div className="mt-3">
              <h3 className="text-sm font-semibold text-gray-700">Etiquetas:</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {task.tags.map((tag: string, index: number) => (
                  <span key={index} className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Fecha de caducidad */}
          {task.dueDate && (
            <p className="mt-3 text-sm text-gray-700">
              📅 Vence el:{" "}
              <span className="font-medium">
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </p>
          )}

          {/* Botón para volver al home */}
          <button
            onClick={() => navigate("/")}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-all"
          >
            ⬅ Volver al Home
          </button>
        </div>
      ) : (
        <h1 className="text-3xl font-bold text-black">Cargando...</h1>
      )}
    </div>
  );
}

export default TaskPage;
