import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Button from "../components/ui/Button";
import { addTask, editTask } from "../redux/slices/tasksSlice";

type Task = {
    // id?: string;
    title: string;
    description: string;
    completed: boolean;
    tags: string[];
    dueDate: Date;
};

function TaskFormPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const { tasks, tags } = useSelector((state: RootState) => state.tasks);
    const { enqueueSnackbar } = useSnackbar();


    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [task, setTask] = useState<Task | null>(null);
    const [tag, setTag] = useState<string>("");

    const validationSchema = Yup.object({
        title: Yup.string().required("El título es obligatorio"),
        description: Yup.string().required("La descripción es obligatoria"),
        completed: Yup.boolean(),
        tags: Yup.array().of(Yup.string().required("El tag es obligatorio")),
        dueDate: Yup.date().required("La fecha de vencimiento es obligatoria").min(new Date(), "La fecha de vencimiento debe ser mayor a la fecha actual"),
    });

    const initialValues: Task = {
        title: "",
        description: "",
        completed: false,
        tags: [],
        dueDate: new Date(),
    };

    useEffect(() => {
        if (id) {
            const task = tasks.find((task) => task.id == id);
            setIsEditing(true);
            if (task) {
                setTask({
                    ...task,
                    dueDate: new Date(task.dueDate).toISOString().split("T")[0], // Formato YYYY-MM-DD
                });
            } else {
                setTask(initialValues);
            }
        } else {
            setTask(initialValues);
        }
    }, [id]);

    const handleAddTags = (tag: string) => {
        if (!tag) {
            enqueueSnackbar("El tag no puede estar vacío", { variant: "error", persist: false });
        } else if (task && Array.isArray(task.tags)) {
            if (task.tags.includes(tag)) {
                enqueueSnackbar("El tag ya existe", { variant: "error", persist: false });
                return;
            }
            setTask({
                ...task,
                tags: [...task.tags, tag]
            });
        }

        setTag("");
    };

    const handleRemoveTag = (tagToRemove: string) => {
        if (task && Array.isArray(task.tags)) {
            setTask({
                ...task,
                tags: task.tags.filter(tag => tag !== tagToRemove)
            });
        }
    };

    const onSubmit = async (values: Task) => {
        try {
            const newTask: Object = {
                title: values.title,
                description: values.description,
                completed: values.completed,
                tags: task.tags,
                dueDate: values.dueDate,
            }

            if (!isEditing) { 
                await dispatch(addTask(newTask));
                enqueueSnackbar("Tarea guardada correctamente", { variant: "success", persist: false });
            } else {
                await dispatch(editTask({ id: task.id, updates: newTask }));
                enqueueSnackbar("Tarea editada correctamente", { variant: "success", persist: false });
            }
        } catch (error) {
            console.error(error);
            enqueueSnackbar("Error al guardar la tarea", { variant: "error", persist: false });
        } finally {
            setTask(initialValues);
            navigate("/");
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {isEditing ? "Editar Tarea" : "Crear Nueva Tarea"}
            </h2>

            {task && (
                <Formik
                    initialValues={task}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-1" htmlFor="title">
                                    Título
                                </label>
                                <Field
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-1" htmlFor="description">
                                    Descripción
                                </label>
                                <Field
                                    as="textarea"
                                    id="description"
                                    name="description"
                                    rows={4}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="mb-4 relative">
                                <div className="flex items-center gap-1">
                                    <label className="text-gray-700 font-medium" htmlFor="tags">
                                        Tags
                                    </label>

                                    <div className="relative group">
                                        <button className="text-gray-500 hover:text-gray-700">
                                            ℹ️
                                        </button>
                                        <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-max bg-gray-800 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                                            <p className="font-bold">Etiquetas utilizadas:</p>
                                            <p className="whitespace-pre-line mt-1">
                                                {tags.length > 0 ? tags.join(", ") : "No hay etiquetas"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Field
                                        type="text"
                                        id="tags"
                                        name="tags"
                                        className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={(e: any) => setTag(e.target.value)}
                                        value={tag}
                                    />
                                    <Button className="h-10 px-4 flex items-center justify-center" onClick={() => handleAddTags(tag)}>
                                        Agregar
                                    </Button>
                                </div>
                                <ErrorMessage name="tags" component="div" className="text-red-500 text-sm mt-1" />

                                {task.tags.length > 0 && (
                                    <div className="flex flex-wrap mt-2">
                                        {task.tags.map((tag, index) => (
                                            <div key={index} className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs mr-2 mb-2 flex items-center">
                                                {tag}
                                                <button
                                                    type="button"
                                                    className="ml-2 text-white"
                                                    onClick={() => handleRemoveTag(tag)}
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-1" htmlFor="dueDate">
                                    Fecha de Vencimiento
                                </label>
                                <Field
                                    type="date"
                                    id="dueDate"
                                    name="dueDate"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="dueDate" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => navigate("/")}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                >
                                    Volver al inicio
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`px-4 py-2 text-white rounded hover:opacity-80 ${isEditing ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"}`}
                                >
                                    {isEditing ? "Editar tarea" : "Crear Tarea"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    );
}

export default TaskFormPage;