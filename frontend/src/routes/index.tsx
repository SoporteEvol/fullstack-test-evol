import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Closed from '../components/pages/closed/Closed';
import Home from '../components/pages/home/Home';
import NotFound from '../components/pages/notFound/NotFound';
import Open from '../components/pages/open/Open';
import Tags from '../components/pages/tags/Tags';
import Create from '../components/pages/task/Create';
import TaskDetail from '../components/pages/taskDetail/TaskDetail';


const AppRoutes = () => {
  return (
    <Router>
        <Layout> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/open" element={<Open />} />
        <Route path="/closed" element={<Closed />} />
        {/* <Route path="/task" element={<Task />} /> */}
        <Route path="/taskDetail/:id" element={<TaskDetail />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/createTask" element={<Create/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
