import { es } from 'date-fns/locale/es';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineCalendar, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { createTaskThunk, fetchTasksThunk } from '../../../store/slices/taskSlice';
import { AppDispatch } from '../../../store/store';
import Chip from '../../shared/chip/Chip';



registerLocale("es", es);
setDefaultLocale("es");

const Create = () => {
  const navigate = useNavigate();

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const dispatch = useDispatch<AppDispatch>();


  const initialValues = {
    titulo: "",
    descripcion: "",
    fecha: "",
    tags: [],
  };


  const currentDate = new Date();


  const validationSchema = Yup.object({
    titulo: Yup.string().required("El título es obligatorio"),
    descripcion: Yup.string().required("La descripción es obligatoria"),
    fecha: Yup.date()
      .min(currentDate, "La fecha no puede ser menor que la fecha actual")
      .required("La fecha límite es obligatoria"),
    tags: Yup.array().min(1, "Debes agregar al menos un tag").required("Los tags son obligatorios"),
  });

  const goBack = () => {
    navigate(-1);
  };

  const onSubmit = (values: any) => {
    dispatch(
      createTaskThunk({
        title: values.titulo,
        description: values.descripcion,
        completed: false,
        tags: values.tags,
        dueDate: values.fecha,
      })
    ).then(() => {

      dispatch(fetchTasksThunk()); 
      toast.success("¡Tarea creada exitosamente!", {
        autoClose: 4000,
        position: "top-center",
      });
      goBack();
    });
  };
  


  const deleteTag = (tagToDelete: string) => {
    setTags(tags.filter(tag => tag !== tagToDelete)); 
  };


  const normalizeTag = (tag: string) => {
    return tag
      .toLowerCase()
      .normalize("NFD") 
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_");
  };


  const handleAddTag = (setFieldValue: any) => {
    if (tagInput.trim()) {
      const normalizedTag = normalizeTag(tagInput);
      if (!tags.includes(normalizedTag)) {

        setTags((prevTags) => {
          const updatedTags = [...prevTags, normalizedTag];
          setFieldValue("tags", updatedTags); 
          return updatedTags;
        });
      }
      setTagInput('');
    }
  };

  return (
    <div className="flex justify-center items-center py-6">
      <div className="block max-w-sm p-6 mb-5 bg-white rounded-lg shadow-sm w-[100vw]">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnChange={false}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-6">
     
              <div className="flex flex-col">
                <label htmlFor="titulo" className="text-sm font-semibold text-neutral-700 mb-2">
                  Título tarea
                </label>
                <Field
                  type="text"
                  id="titulo"
                  name="titulo"
                  className="px-4 py-2 border border-neutral-300 text-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingrese el título de la tarea"
                />
                <ErrorMessage
                  name="titulo"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

    
              <div className="flex flex-col">
                <label htmlFor="descripcion" className="text-sm font-semibold text-neutral-700 mb-2">
                  Descripción tarea
                </label>
                <Field
                  as="textarea"
                  id="descripcion"
                  name="descripcion"
                  className="px-4 py-2 border border-neutral-300 text-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Ingrese la descripción de la tarea"
                />
                <ErrorMessage
                  name="descripcion"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

    
              <div className="flex flex-col relative">
                <label htmlFor="fecha" className="text-sm font-semibold text-neutral-700 mb-2">
                  Fecha límite
                </label>
                <Field name="fecha">
                  {({ field, form }: any) => (
                    <div className="relative">
                      <DatePicker
                        {...field}
                        id="fecha"
                        name="fecha"
                        selected={field.value ? new Date(field.value) : null}
                        onChange={(date: Date) => form.setFieldValue("fecha", date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        dateFormat="Pp"
                        locale="es"
                        className="px-4 py-2 border border-neutral-300 text-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        placeholderText="Seleccione fecha y hora"
                      />
                      <AiOutlineCalendar className="absolute text-xl top-[20px] right-3 transform -translate-y-1/2 text-gray-500" />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="fecha"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>


              <div className="flex flex-col relative">
                <label htmlFor="tags" className="text-sm font-semibold text-neutral-700 mb-2">
                  Agregar tag
                </label>
                <div className="flex items-center">
                  <Field
                    type="text"
                    id="tags"
                    name="tags"
                    value={tagInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTagInput(e.target.value)}
                    className="px-4 py-2 border border-neutral-300 text-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    placeholder="Ingrese un tag"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddTag(setFieldValue)}
                    className="absolute top-[47px] right-3 transform -translate-y-1/2 bg-green-500 text-white p-1 rounded-full hover:bg-blue-700 focus:outline-none"
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
                <ErrorMessage
                  name="tags"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

 
              {tags.length > 0 && (
                <div className="flex flex-wrap mt-2">
                  {tags.map((tag, index) => (
                    <div key={index}>
                      <Chip title={tag} onDelete={() => deleteTag(tag)} />
                    </div>
                  ))}
                </div>
              )}

    
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-6 py-2 text-neutral-700 rounded-lg hover:bg-gray-400 focus:outline-none"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                >
                  Crear
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Create;
