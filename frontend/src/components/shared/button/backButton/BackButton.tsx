import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router";


const BackButton = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
      };

  return (
    <button onClick={goBack} className="hover:cursor-pointer">
        <AiOutlineArrowLeft className="text-2xl text-neutral-800 hover:text-neutral-400 transition-all" />
        </button>
  )
}

export default BackButton