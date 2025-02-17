import { AiOutlineCheck } from "react-icons/ai";


interface ButtonProps {
  onClick: () => void;
  completed: boolean;
}


const CircleButton = ({onClick, completed}:ButtonProps ) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-8 h-8 rounded-full 
        ${completed ? 'bg-blue-600 hover:bg-blue-800 focus:ring-blue-600' : 'bg-white hover:bg-blue-800 focus:ring-blue-600 border border-neutral-300'}
          text-white  focus:outline-none focus:ring-2  transition-all hover:cursor-pointer`}
    >
      {completed && <AiOutlineCheck  className="w-5 h-5" />}
    </button>
  )
}

export default CircleButton