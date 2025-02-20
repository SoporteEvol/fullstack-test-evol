import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import TaskPage from "../pages/TaskPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import TaskFormPage from "../pages/TaskFormPage";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks/:id" element={<TaskPage />} />
        <Route path="/new-task" element={<TaskFormPage />} />
        <Route path="/edit-task/:id" element={<TaskFormPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
