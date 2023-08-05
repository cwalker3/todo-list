import { todoList } from './todo-list';
import { projectFactory } from './project-factory';
import { todoItemFactory } from './todo-item-factory';

export const storage = (function () {
  function save() {
    const todoListString = JSON.stringify(todoList);
    localStorage.setItem('todoList', todoListString);
  }

  function loadProjects() {
    let projects = [];
    const todoListFromJSON = JSON.parse(
      localStorage.getItem('todoList')
    );
    const projectsFromJSON = todoListFromJSON.projects;
    projectsFromJSON.forEach((projectFromJSON) => {
      const project = projectFactory(projectFromJSON.name);
      const itemsFromJSON = projectFromJSON.items;
      let items = [];
      itemsFromJSON.forEach((itemFromJSON) => {
        let item = todoItemFactory({
          name: itemFromJSON.name,
          description: itemFromJSON.description,
          dueDate: new Date(itemFromJSON.dueDate),
          completed: itemFromJSON.completed,
        });
        items.push(item);
      });
      project.items = items;
      projects.push(project);
    });

    return projects;
  }

  return { save, loadProjects };
})();
