import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { createTask, updateTask } from './slices/tasksSlice';

export interface TaskProp {
    id: number;
    title: string;
    description: string;
    dueDate: string;
}

interface TaskFormProps {
  task?: TaskProp | null;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      title: task?.title || '',
      description: task?.description || '',
      dueDate: task?.dueDate || ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      dueDate: Yup.string().required('Due date is required')
    }),
    onSubmit: async (values) => {
      if (task) {
        await dispatch(updateTask({ id: task.id, data: values }));
      } else {
        await dispatch(createTask(values));
      }
      onClose();
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-4 border rounded">
      <div className="mb-4">
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          className="w-full border p-2 rounded"
        />
        {formik.errors.title && <p className="text-red-500 text-sm">{formik.errors.title}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          className="w-full border p-2 rounded"
        />
        {formik.errors.description && <p className="text-red-500 text-sm">{formik.errors.description}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={formik.values.dueDate}
          onChange={formik.handleChange}
          className="w-full border p-2 rounded"
        />
        {formik.errors.dueDate && <p className="text-red-500 text-sm">{formik.errors.dueDate}</p>}
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {task ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default TaskForm;
