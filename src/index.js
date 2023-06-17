import { todoListController } from './todo-list-controller.js';

todoListController.createTodoItem(0, { name: '1' });
todoListController.createTodoItem(0, { name: '2' });

todoListController.deleteTodoItem(0, 0);

console.log(todoListController.projects[0].items);
