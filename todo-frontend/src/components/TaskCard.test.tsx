import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TaskCard from "../components/TaskCard";

const mockTask = {
  id: "1",
  title: "Mi tarea",
  description: "Descripción de la tarea",
  completed: false,
  dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
};

test("Renderiza correctamente el título y la descripción", () => {
  render(<TaskCard task={mockTask} onDeleteTask={() => {}} onCompletedTask={() => {}} />);
  
  expect(screen.getByText("Mi tarea")).toBeInTheDocument();
  expect(screen.getByText("Descripción de la tarea")).toBeInTheDocument();
});

test("Muestra 'Tarea Vencida' si la fecha ya pasó", () => {
  render(<TaskCard task={mockTask} onDeleteTask={() => {}} onCompletedTask={() => {}} />);
  
  expect(screen.getByText("❌ Tarea vencida")).toBeInTheDocument();
});

test("Aplica fondo rojo si la tarea está vencida", () => {
  const { container } = render(<TaskCard task={mockTask} onDeleteTask={() => {}} onCompletedTask={() => {}} />);
  
  expect(container.firstChild).toHaveClass("bg-red-400");
});
