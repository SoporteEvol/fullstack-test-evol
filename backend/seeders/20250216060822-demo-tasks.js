module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Tags', [
      { name: 'Supermercado', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Gimnasio', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Trabajo', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Hogar', createdAt: new Date(), updatedAt: new Date() },
      {
        name: 'Cuidado personal',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { name: 'Salud', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Finanzas', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Estudios', createdAt: new Date(), updatedAt: new Date() },
    ]);

    const tags = await queryInterface.sequelize.query(
      `SELECT id, name FROM "Tags";`,
    );
    const tagMap = tags[0].reduce((acc, tag) => {
      acc[tag.name] = tag.id;
      return acc;
    }, {});

    const tasksData = [
      {
        title: 'Comprar verduras y frutas',
        description:
          'Ir al supermercado a comprar lo necesario para la semana.',
        dueDate: '2025-02-18',
      },
      {
        title: 'Ir al gimnasio',
        description: 'Hacer rutina de pesas y cardio.',
        dueDate: '2025-02-18',
      },
      {
        title: 'Llamar a clientes',
        description: 'Realizar seguimiento a clientes interesados.',
        dueDate: '2025-02-19',
      },
      {
        title: 'Limpiar la casa',
        description: 'Ordenar habitaciones y limpiar el baño.',
        dueDate: '2025-02-19',
      },
      {
        title: 'Pagar facturas',
        description: 'Liquidar luz, agua e internet.',
        dueDate: '2025-02-20',
      },
      {
        title: 'Revisar correos',
        description: 'Responder emails pendientes del trabajo.',
        dueDate: '2025-02-20',
      },
      {
        title: 'Hacer compras online',
        description: 'Pedir algunos productos para el hogar.',
        dueDate: '2025-02-21',
      },
      {
        title: 'Renovar seguro médico',
        description: 'Verificar plan de salud y renovarlo.',
        dueDate: '2025-02-21',
      },
      {
        title: 'Estudiar para examen',
        description: 'Repasar material de matemáticas.',
        dueDate: '2025-02-22',
      },
      {
        title: 'Preparar presentación',
        description: 'Hacer diapositivas para reunión de trabajo.',
        dueDate: '2025-02-22',
      },
      {
        title: 'Hacer mantenimiento al auto',
        description: 'Cambio de aceite y revisión general.',
        dueDate: '2025-02-23',
      },
      {
        title: 'Comprar regalo',
        description: 'Buscar un regalo de cumpleaños.',
        dueDate: '2025-02-23',
      },
      {
        title: 'Salir a correr',
        description: 'Entrenar para mejorar resistencia.',
        dueDate: '2025-02-24',
      },
      {
        title: 'Revisar presupuesto',
        description: 'Actualizar gastos y plan de ahorro.',
        dueDate: '2025-02-24',
      },
      {
        title: 'Hacer meditación',
        description: 'Tomar 15 minutos para relajar la mente.',
        dueDate: '2025-02-25',
      },
      {
        title: 'Aprender algo nuevo',
        description: 'Ver un tutorial de programación.',
        dueDate: '2025-02-25',
      },
      {
        title: 'Llamar a la familia',
        description: 'Conversar con familiares que están lejos.',
        dueDate: '2025-02-26',
      },
      {
        title: 'Organizar escritorio',
        description: 'Ordenar papeles y limpiar espacio de trabajo.',
        dueDate: '2025-02-26',
      },
      {
        title: 'Planificar la semana',
        description: 'Hacer lista de objetivos y tareas importantes.',
        dueDate: '2025-02-27',
      },
      {
        title: 'Ver una película',
        description: 'Tomar un descanso viendo algo entretenido.',
        dueDate: '2025-02-27',
      },
    ];

    await queryInterface.bulkInsert(
      'Tasks',
      tasksData.map((task) => ({
        ...task,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    );

    const tasks = await queryInterface.sequelize.query(
      `SELECT id, title FROM "Tasks";`,
    );
    const taskMap = tasks[0].reduce((acc, task) => {
      acc[task.title] = task.id;
      return acc;
    }, {});

    const taskTags = [
      {
        task: 'Comprar verduras y frutas',
        tags: ['Supermercado', 'Hogar', 'Salud'],
      },
      {
        task: 'Ir al gimnasio',
        tags: ['Gimnasio', 'Salud', 'Cuidado personal'],
      },
      { task: 'Llamar a clientes', tags: ['Trabajo', 'Finanzas', 'Estudios'] },
      {
        task: 'Limpiar la casa',
        tags: ['Hogar', 'Cuidado personal', 'Supermercado'],
      },
      { task: 'Pagar facturas', tags: ['Finanzas', 'Trabajo', 'Hogar'] },
      { task: 'Revisar correos', tags: ['Trabajo', 'Estudios', 'Finanzas'] },
      {
        task: 'Hacer compras online',
        tags: ['Supermercado', 'Hogar', 'Finanzas'],
      },
      {
        task: 'Renovar seguro médico',
        tags: ['Salud', 'Finanzas', 'Cuidado personal'],
      },
      {
        task: 'Estudiar para examen',
        tags: ['Estudios', 'Trabajo', 'Cuidado personal'],
      },
      {
        task: 'Preparar presentación',
        tags: ['Trabajo', 'Estudios', 'Finanzas'],
      },
      {
        task: 'Hacer mantenimiento al auto',
        tags: ['Hogar', 'Supermercado', 'Cuidado personal'],
      },
      { task: 'Comprar regalo', tags: ['Supermercado', 'Finanzas', 'Trabajo'] },
      {
        task: 'Salir a correr',
        tags: ['Gimnasio', 'Salud', 'Cuidado personal'],
      },
      {
        task: 'Revisar presupuesto',
        tags: ['Finanzas', 'Trabajo', 'Estudios'],
      },
      {
        task: 'Hacer meditación',
        tags: ['Cuidado personal', 'Salud', 'Estudios'],
      },
      {
        task: 'Aprender algo nuevo',
        tags: ['Estudios', 'Trabajo', 'Finanzas'],
      },
      {
        task: 'Llamar a la familia',
        tags: ['Hogar', 'Cuidado personal', 'Salud'],
      },
      {
        task: 'Organizar escritorio',
        tags: ['Trabajo', 'Hogar', 'Cuidado personal'],
      },
      {
        task: 'Planificar la semana',
        tags: ['Trabajo', 'Estudios', 'Finanzas'],
      },
      {
        task: 'Ver una película',
        tags: ['Hogar', 'Cuidado personal', 'Salud'],
      },
    ];

    const taskTagInserts = taskTags.flatMap(({ task, tags }) =>
      tags.map((tag) => ({
        taskId: taskMap[task],
        tagId: tagMap[tag],
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    );

    await queryInterface.bulkInsert('TaskTags', taskTagInserts);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('TaskTags', null, {});
    await queryInterface.bulkDelete('Tasks', null, {});
    await queryInterface.bulkDelete('Tags', null, {});
  },
};
