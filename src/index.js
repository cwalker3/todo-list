import css from './styles/style.scss';
import { todoList } from './todo-list.js';
import { storage } from './storage';
import { mainController } from './main-controller.js';
import { sidebarController } from './sidebar-controller.js';
import { rightPanelController } from './right-panel-controller.js';
import Close from './sidebar-close.svg';
import Open from './sidebar-open.svg';

let date = new Date();
date.toDateString;

if (
  todoList.getCount('', 'all') == 0 &&
  todoList.getSortedTodoItems('', 'complete') == 0
) {
  todoList.createTodoItem(0, {
    name: 'Create a task',
    description: 'Press the plus button and create your first task.',
  });
}
