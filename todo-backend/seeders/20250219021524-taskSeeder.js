'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tasks', [
      {
        title: 'Task 1',
        description: 'Description of Task 1',
        completed: false,
        tags: JSON.stringify(['tag1', 'tag2']),
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Task 2',
        description: 'Description of Task 2',
        completed: true,
        tags: JSON.stringify(['tag2', 'tag3']),
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Task 3',
        description: 'Description of Task 3',
        completed: false,
        tags: JSON.stringify(['tag3', 'tag4']),
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, { truncate: true });
  }
};
