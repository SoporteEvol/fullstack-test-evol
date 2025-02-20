import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { SnackbarProvider } from "notistack";
import taskReducer from "../../redux/slices/tasksSlice";
import TaskFormPage from "../TaskFormPage";
import { vi } from "vitest";

const createTestStore = (preloadedState = {}) => {
    return configureStore({
        reducer: {
            tasks: taskReducer,
        },
        preloadedState,
    });
};

const testTasks = [
    {
        id: "1",
        title: "Tarea 1",
        description: "Descripción 1",
        completed: false,
        dueDate: new Date().toISOString(),
    },
    {
        id: "2",
        title: "Tarea 2",
        description: "Descripción 2",
        completed: true,
        dueDate: new Date().toISOString(),
    },
];

const store = createTestStore({
    tasks: {
        tasks: testTasks,
        tags: [],
        loading: false,
        error: null,
    },
});

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return {
        ...actual,
        useDispatch: () => vi.fn(),
    };
});

describe("TaskFormPage", () => {
    it("debería renderizar el formulario de creación de tareas", () => {
        render(
            <Provider store={store}>
                <SnackbarProvider>
                    <MemoryRouter>
                        <TaskFormPage />
                    </MemoryRouter>
                </SnackbarProvider>
            </Provider>
        );

        expect(screen.getByText("Crear Nueva Tarea")).toBeInTheDocument();
        expect(screen.getByLabelText("Título")).toBeInTheDocument();
        expect(screen.getByLabelText("Descripción")).toBeInTheDocument();
    });

    it("debería mostrar errores de validación si los campos están vacíos", async () => {
        render(
            <Provider store={store}>
                <SnackbarProvider>
                    <MemoryRouter>
                        <TaskFormPage />
                    </MemoryRouter>
                </SnackbarProvider>
            </Provider>
        );

        fireEvent.click(screen.getByText("Crear Tarea"));

        expect(await screen.findByText("El título es obligatorio")).toBeInTheDocument();
        expect(await screen.findByText("La descripción es obligatoria")).toBeInTheDocument();
    });

    it("debería permitir ingresar valores en los campos", () => {
        render(
            <Provider store={store}>
                <SnackbarProvider>
                    <MemoryRouter>
                        <TaskFormPage />
                    </MemoryRouter>
                </SnackbarProvider>
            </Provider>
        );

        const titleInput = screen.getByLabelText("Título");
        fireEvent.change(titleInput, { target: { value: "Nueva tarea" } });
        expect(titleInput).toHaveValue("Nueva tarea");
    });
});
