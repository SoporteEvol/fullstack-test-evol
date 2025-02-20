import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi } from "vitest";
import HomePage from "../HomePage";
import taskReducer from "../../redux/slices/tasksSlice";
import { SnackbarProvider } from "notistack";

// 🔹 Mock para la navegación
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// 🔹 Crear una store de prueba sin llamar a `dispatch`
const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      tasks: taskReducer,
    },
    preloadedState,
  });
};

describe("HomePage", () => {
  test("Debe renderizar la lista de tareas correctamente", async () => {
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

    render(
      <Provider store={store}>
        <SnackbarProvider>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </SnackbarProvider>
      </Provider>
    );

    expect(await screen.findByText("Lista de Tareas")).toBeInTheDocument();
    expect(screen.getByText("Tarea 1")).toBeInTheDocument();
    expect(screen.getByText("Descripción 1")).toBeInTheDocument();
    expect(screen.getByText("Tarea 2")).toBeInTheDocument();
    expect(screen.getByText("Descripción 2")).toBeInTheDocument();
    expect(screen.getByText("+ Agregar nueva tarea")).toBeInTheDocument();
  });
});
