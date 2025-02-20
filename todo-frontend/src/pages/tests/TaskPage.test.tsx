import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, test, expect } from "vitest";
import TaskPage from "../TaskPage";
import taskReducer from "../../redux/slices/tasksSlice";

// Función para crear un store de prueba con estado inicial
const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      tasks: taskReducer,
    },
    preloadedState,
  });
};

describe("TaskPage", () => {
  test("Debe mostrar la tarea correctamente si existe", async () => {
    const testTask = {
      id: "1",
      title: "Tarea de prueba",
      description: "Descripción de la tarea",
      completed: false,
      dueDate: new Date(),
      tags: ["Importante", "Trabajo"],
    };

    const preloadedState = {
      tasks: {
        tasks: [testTask],
        tags: [],
        loading: false,
        error: null,
      },
    };

    const store = createTestStore(preloadedState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/task/1"]}>
          <Routes>
            <Route path="/task/:id" element={<TaskPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText (testTask.title)).toBeInTheDocument();
    expect(await screen.findByText (testTask.description)).toBeInTheDocument();
    expect(await screen.findByText ("❌ Tarea vencida")).toBeInTheDocument();
    expect(await screen.findByText ("📅 Vence el:")).toBeInTheDocument();
    expect(await screen.findByText ("⬅ Volver al Home")).toBeInTheDocument();
  });

  test("Debe mostrar 'Cargando...' si la tarea no se encuentra", () => {
    const store = createTestStore({
      tasks: {
        tasks: [],
        tags: [],
        loading: false,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/task/999"]}>
          <Routes>
            <Route path="/task/:id" element={<TaskPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });
});
