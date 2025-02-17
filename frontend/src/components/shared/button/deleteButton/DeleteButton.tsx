import { AiFillDelete } from "react-icons/ai";

interface ButtonProps {
    onClick: () => void;
  }
  
const DeleteButton = ({onClick}:ButtonProps ) => {
    return (
        <button
          onClick={onClick}
          className={`flex items-center justify-center w-8 h-8 rounded-full 
            ${true ? 'bg-red-600 hover:bg-red-800 focus:ring-red-600' : 'bg-white hover:bg-red-800 focus:ring-red-600 border border-neutral-300'}
              text-white  focus:outline-none focus:ring-2  transition-all hover:cursor-pointer`}
        >
          {true && <AiFillDelete  className="w-5 h-5" />}
        </button>
      )
}

export default DeleteButton;


