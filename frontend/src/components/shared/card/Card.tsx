import { useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { updateTaskStatusThunk } from '../../../store/slices/taskSlice';
import { AppDispatch } from '../../../store/store';
import { Task } from '../../../store/types/task';
import { formatDate } from '../../../utils/date';
import CircleButton from '../button/circleButton/CircleButton';

interface CardProps {
  task:Task;
}



const Card = ({ task}: CardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const changeComplete = () => {
    dispatch(updateTaskStatusThunk({ id: task.id, completed: !task.completed }));
    toast.success("Estado modificado con éxito", {
              autoClose: 4000,
              position: "top-center",
            });
  };

  return (
    <div className={`block max-w-sm p-6 mb-5 bg-white border border-gray-200 rounded-lg shadow-sm  ${task.completed ? 'bg-zinc-200 hover:bg-zinc-300' : 'hover:bg-zinc-50'}`}>
<small className='text-blue-600'>{task.completed ? 'Cerrada' : 'Abierta'}</small>
<Link to={`/taskDetail/${task.id}`}>

<h5 className={`mb-2 text-2xl font-medium tracking-tight text-neutral-700 ${task.completed ? 'line-through' : ''}`}>{task.title}</h5>
<p className="font-normal text-sm text-gray-400 ">{task.description}</p>
<hr className={`mt-5 text-neutral-200 ${task.completed ? 'text-neutral-300' : ''}`}></hr>

</Link>
<div className='flex justify-between items-center py-3'>
  <small className="text-neutral-800">Fecha Límite: <span className="text-neutral-500">{formatDate(task.dueDate)}</span></small>
  <CircleButton completed={task.completed} onClick={changeComplete}/>
</div>
    </div>
  )
}

export default Card