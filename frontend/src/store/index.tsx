import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const App: React.FC = () => (
  <Provider store={store}>
    <div>
      <h1>Gestor de Tareas</h1>
      <TaskForm />
      <TaskList />
    </div>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
