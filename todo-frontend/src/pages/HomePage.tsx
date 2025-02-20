import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeStatusTask, fetchTags, fetchTasks, removeTask } from "../redux/slices/tasksSlice";
import { AppDispatch, RootState } from "../redux/store";
import Button from "../components/ui/Button";
import TaskCard from "../components/TaskCard";

function HomePage() {
  const dispatch =  useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { tasks } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchTags());
  }, [dispatch]);

  const handleDeleteTask = async (id: string) => {
    try {
      await dispatch(removeTask(id));
      enqueueSnackbar("Tarea eliminada correctamente", { variant: "success", persist: false });
      dispatch(fetchTasks());
    } catch (error) {
      enqueueSnackbar("Error al eliminar la tarea", { variant: "error", persist: false });
    }
  };
  
  const handleCompleteTask = async (id: string, completed: boolean) => {
    await dispatch(changeStatusTask({ id, completed: !completed }));

    enqueueSnackbar("Tarea completada correctamente", { variant: "success", persist: false });
    await dispatch(fetchTasks());
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Tareas</h1>
        <Button
          onClick={() => navigate("/new-task")}
        >
          + Agregar nueva tarea
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Aquí irán las TaskCards mapeadas desde Redux */}
        { tasks.map((task) => (
          <TaskCard 
            task={{
              id: task.id,
              title: task.title,
              description: task.description,
              completed: task.completed,
              dueDate: task.dueDate,
            }} 
            onDeleteTask={(id) => handleDeleteTask(id)}
            onCompletedTask={(id, completed) => handleCompleteTask(id, completed)}
          />
        )) }
      </div>
    </div>
  );
}

export default HomePage;
