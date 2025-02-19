const API_URL = 'http://localhost:3000/tasks'; // Se reemplaza por la url que se configura en el backend

// Validar tarea antes de enviarla
function validateTask(title, description, dueDate, tags) {
    if (!title.trim()) {
        alert("El título es obligatorio.");
        return false;
    }
    if (!description.trim()) {
        alert("La descripción es obligatoria.");
        return false;
    }
    if (dueDate && isNaN(Date.parse(dueDate))) {
        alert("La fecha no es válida.");
        return false;
    }
    if (tags.some(tag => tag.length > 20)) {
        alert("Cada etiqueta debe tener un máximo de 20 caracteres.");
        return false;
    }
    return true;
}

// Obtener y mostrar tareas
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener tareas");

        const tasks = await response.json();
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        tasks.forEach(task => {
            const div = document.createElement('div');
            div.className = 'task';
            div.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p><strong>Fecha:</strong> ${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "Sin fecha"}</p>
                <p><strong>Etiquetas:</strong> ${task.tags?.length ? task.tags.join(', ') : 'Ninguna'}</p>
                <button onclick="toggleTask(${task.id}, ${task.completed})">
                    ${task.completed ? 'Marcar como Pendiente' : 'Marcar como Completado'}
                </button>
                <button onclick="deleteTask(${task.id})">Eliminar</button>
            `;
            taskList.appendChild(div);
        });

    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}

// Agregar tarea con validación
const form = document.getElementById('task-form');
if (form) {
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('dueDate').value;
        const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim()).filter(tag => tag !== "");

        if (!validateTask(title, description, dueDate, tags)) return;

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description, dueDate, tags })
            });

            if (!response.ok) throw new Error("Error al agregar tarea");

            form.reset();
            fetchTasks();
        } catch (error) {
            console.error("Error al enviar tarea:", error);
        }
    });
}

// Alternar estado de la tarea
async function toggleTask(id, completed) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH', // Usamos PATCH para cambiar solo 'completed'
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !completed })
        });

        if (!response.ok) throw new Error("Error al actualizar tarea");
        fetchTasks();
    } catch (error) {
        console.error("Error al actualizar tarea:", error);
    }
}

// Eliminar tarea
async function deleteTask(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

        if (!response.ok) throw new Error("Error al eliminar tarea");
        fetchTasks();
    } catch (error) {
        console.error("Error al eliminar tarea:", error);
    }
}

// Cargar tareas al iniciar
document.addEventListener("DOMContentLoaded", fetchTasks);
