import { projectFactory } from './project-factory.js';
import { todoItemFactory } from './todo-item-factory.js';

export const todoListController = (function () {
  const projects = [projectFactory()];

  function createProject(projectParams) {
    const project = projectFactory(projectParams);

    projects.push(project);
  }

  function deleteProject(projectIndex) {
    projects.splice(projectIndex, 1);
  }

  function createTodoItem(projectIndex, itemParams) {
    const item = todoItemFactory(itemParams);
    const project = projects[projectIndex];

    project.addTodoItem(item);
  }

  function deleteTodoItem(projectIndex, itemIndex) {
    const project = projects[projectIndex];

    project.deleteTodoItem(itemIndex);
  }

  return {
    projects,
    createProject,
    deleteProject,
    createTodoItem,
    deleteTodoItem,
  };
})();
