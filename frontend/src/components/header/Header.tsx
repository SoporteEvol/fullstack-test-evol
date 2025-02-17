import { AiOutlinePlus } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import Button from "../shared/button/Button";
import BackButton from "../shared/button/backButton/BackButton";



const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const shouldShowBackButton = location.pathname !== '/' && location.pathname !== '/home';
  const shouldShowHeader = location.pathname !== '/createTask';


  const handleClick = () => {
    navigate("/createTask");
  };
  return (
    <div className="flex flex-col justify ">
      <div className=" px-6 pt-5 pb-2 h-[60px]">
        {shouldShowBackButton && <BackButton />}
      </div>
      <div className="flex justify-between flex-row w-full pb-5 px-6">
        <h2 className="text-2xl font-bold text-neutral-700 ">{shouldShowHeader ? 'Gestor de tareas' : 'Creando Tarea'}</h2>
        {shouldShowHeader && <Button
          onClick={handleClick}
          backgroundColor="bg-blue-100"
          textColor="text-blue-600"
          text="Nueva tarea"
          shadow={true}
          icon={<AiOutlinePlus className="text-lg" />}
        />}
      </div>
      {shouldShowHeader && <Navigation />}
    </div>
  )
}

export default Header