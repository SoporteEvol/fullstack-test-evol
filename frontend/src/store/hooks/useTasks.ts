import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksThunk, selectTasks } from "../slices/taskSlice";
import { AppDispatch, RootState } from "../store";

export const useTasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector(selectTasks);
  const status = useSelector((state: RootState) => state.tasks.status);
  const error = useSelector((state: RootState) => state.tasks.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasksThunk());
    }
  }, [dispatch, status]);

  return { tasks, status, error };
};
