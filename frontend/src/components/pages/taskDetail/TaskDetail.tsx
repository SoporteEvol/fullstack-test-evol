import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteTaskThunk, selectTaskById, updateTaskStatusThunk } from "../../../store/slices/taskSlice";
import { AppDispatch, RootState } from '../../../store/store';
import { formatDate } from "../../../utils/date";
import CircleButton from "../../shared/button/circleButton/CircleButton";
import DeleteButton from '../../shared/button/deleteButton/DeleteButton';



const TaskDetail = () => {
  const navigate = useNavigate();
  
  const { id } = useParams<{ id: string }>();
  const task = useSelector((state: RootState) => selectTaskById(state, Number(id))); 
  const dispatch = useDispatch<AppDispatch>();

  
  const goBack = () => {
    navigate(-1);
  };

  if (!task) {
    return <h2 className="text-red-600">Tarea no encontrada</h2>;
  }

  const changeComplete = () => {
    dispatch(updateTaskStatusThunk({ id: task.id, completed: !task.completed }));
     toast.success("Estado modificado con éxito", {
          autoClose: 4000,
          position: "top-center",
        });

  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteTaskThunk(task.id)); 
      toast.success("¡Tarea eliminada con éxito!", {
        autoClose: 4000,
        position: "top-center",
      });
      goBack(); 
    } catch (error) {
      toast.error("Error al eliminar la tarea", {
        autoClose: 4000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex justify-center">
      <div className={`block max-w-md p-6 mb-5 bg-white border border-gray-200 rounded-lg shadow-sm  ${task.completed ? 'bg-zinc-200 ' : ''}`}>
      <div className="flex justify-end gap-4">
      <CircleButton completed={task.completed} onClick={changeComplete}/>
      <DeleteButton onClick={handleDelete} />
      </div>
      <h2 className={`mb-2 text-2xl font-medium tracking-tight text-neutral-700 ${task.completed ? 'line-through' : ''}`}>{task.title}</h2>
      <div className="grid grid-cols-2 gap-4">
  <div className="text-xs text-neutral-600 font-bold">
    Fecha Límite:<br></br>
    <span className="text-xs text-neutral-400 font-light">{formatDate(task.dueDate)}</span>
  </div>
  <div className="text-xs text-neutral-600 font-bold">
    Estado:<br></br>
    <span className="text-xs text-neutral-400 font-light">{task.completed ? "Cerrada" : "Abierta"}</span>
  </div>

</div>
{task.tags.length > 0 && task.tags.map((tag, index)=>(

  <span key={index} id="badge-dismiss-default" className="inline-flex items-center px-2 py-1 mb-2 me-2 text-sm font-medium my-5  bg-blue-100 rounded-2xl text-blue-600">
{tag}
</span>
))}
<hr className={`mt-5 text-neutral-200 ${task.completed ? 'text-neutral-300' : ''}`}></hr>
      
      
      <p className="text-sm text-gray-500 mt-5">{task.description}</p>
      
     
    </div>
    </div>
  );
};

export default TaskDetail;
