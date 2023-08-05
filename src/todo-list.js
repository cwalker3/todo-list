import { projectFactory } from './project-factory.js';
import { todoItemFactory } from './todo-item-factory.js';
import { getDateRange } from './date-utils.js';
import { storage } from './storage.js';

export const todoList = (function () {
  let projects = [];
  if (localStorage.getItem('todoList')) {
    projects = storage.loadProjects();
  } else {
    projects = [projectFactory()];
  }

  function createProject(projectParams) {
    const projectIndex = projects.length;
    const project = projectFactory(projectParams, projectIndex);
    projects.push(project);
    storage.save();
  }

  function deleteProject(projectId) {
    projects = projects.filter((project) => project.id != projectId);
    storage.save();
  }

  function createTodoItem(projectId, itemParams) {
    const project = getProjectById(projectId);
    const item = todoItemFactory(itemParams);
    project.addTodoItem(item);
    storage.save();
  }

  function deleteTodoItem(todoItem) {
    projects.forEach((project) => {
      project.items = project.items.filter(
        (item) => item != todoItem
      );
    });
    storage.save();
  }

  function getCount(selection, type) {
    let todoItems = _getTodoItems(selection, type);
    return todoItems.length;
  }

  function getSortedTodoItems(selection, type) {
    let todoItems = _getTodoItems(selection, type);
    let sortedTodoItems = todoItems.sort(
      (a, b) => a.dueDate - b.dueDate
    );

    return sortedTodoItems;
  }

  function _getTodoItems(selection, type) {
    let todoItems = [];
    if (type == 'all') {
      return _getAllTodoItems();
    } else if (selection == 'No Due Date') {
      return _getTodoItemsWithoutDate();
    } else if (type == 'date') {
      return _getTodoItemsByDate(selection);
    } else if (type == 'complete') {
      return _getCompletedTodoItems();
    } else {
      return _getTodoItemsByProject(selection);
    }
  }

  function _getAllTodoItems(completed = false) {
    let todoItems = [];
    projects.forEach((project) => {
      project.items.forEach((item) => {
        if (item.completed == completed) {
          todoItems.push(item);
        }
      });
    });

    return todoItems;
  }

  function _getTodoItemsByDate(selection) {
    let dateRange = getDateRange(selection);
    let todoItems = _getAllTodoItems();
    let filteredTodoItems = todoItems.filter((todoItem) => {
      return (
        todoItem.dueDate >= dateRange[0] &&
        todoItem.dueDate < dateRange[1]
      );
    });

    return filteredTodoItems;
  }

  function _getCompletedTodoItems() {
    let completedTodoItems = _getAllTodoItems(true);

    return completedTodoItems;
  }

  function _getTodoItemsWithoutDate() {
    let todoItems = _getAllTodoItems();
    let filteredTodoItems = todoItems.filter((todoItem) => {
      return todoItem.dueDate === null;
    });
    return filteredTodoItems;
  }

  function _getTodoItemsByProject(projectId) {
    const selectedProject = projects.find(
      (project) => project.id == projectId
    );

    const items = selectedProject.items.filter(
      (item) => item.completed == false
    );
    return items;
  }

  function getProjectById(id) {
    let project = projects.find((project) => project.id == id);

    return project;
  }

  return {
    projects,
    createProject,
    deleteProject,
    createTodoItem,
    deleteTodoItem,
    getSortedTodoItems,
    getCount,
    getProjectById,

    get projects() {
      return projects;
    },
  };
})();
