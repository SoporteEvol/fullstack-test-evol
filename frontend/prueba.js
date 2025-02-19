// Seleccionar el formulario y el contenedor de tareas
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

// Función para manejar la creación de tareas
taskForm.addEventListener('submit', function (event) {
    event.preventDefault(); 

    // Obtener los valores del formulario
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim()); // Separar etiquetas por comas

    // Crear un nuevo contenedor para la tarea
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    // Agregar el contenido de la tarea al contenedor
    taskItem.innerHTML = `
        <h3>${title}</h3>
        <p><strong>Descripción:</strong> ${description}</p>
        <p><strong>Fecha de Vencimiento:</strong> ${dueDate}</p>
        <p><strong>Etiquetas:</strong> ${tags.join(', ')}</p>
    `;

    // Agregar la nueva tarea a la lista de tareas
    taskList.appendChild(taskItem);

    // Limpiar el formulario
    taskForm.reset();
});
