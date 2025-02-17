import { useTasks } from "../../../store/hooks/useTasks";
import Card from "../../shared/card/Card";

const Home = () => {
  const { tasks} = useTasks();
  return(
    <div className="text-neutral-700 px-6">
      {tasks && tasks.map((task) =>(
        <div key={task.id}>
          <Card  task={task} />
        </div>
      ))}

  </div>
  );

};

export default Home;
