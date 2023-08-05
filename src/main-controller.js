import Plus from './plus.svg';
import X from './x.svg';
import Trash from './trash.svg';

import { todoList } from './todo-list.js';
import { domController } from './dom-controller.js';
import { sidebarController } from './sidebar-controller.js';
import { rightPanelController } from './right-panel-controller.js';

export const mainController = (function () {
  const main = document.querySelector('.main');

  function addProjectOption(name) {
    const projectSelect = document.querySelector('select');
    const value = todoList.projects.length - 1;

    if (projectSelect) {
      const newOption = domController.createElement(
        'option',
        { value: value },
        name
      );
      projectSelect.appendChild(newOption);
    }
  }

  function updateContent() {
    const selection = this.getAttribute('data-selection');
    const type = this.dataset.selectionType;

    main.innerHTML = '';
    _renderNewTodoButton(selection, type);
    _renderMainHeading(selection, type);
    if (type == 'project') {
      _renderDeleteButton(this);
    }
    _addTodoItems(selection, type);
    sidebarController.updateSelectedTo(this);
    _clickFirstTodoItem();
  }

  function _renderMainHeading(selection, type) {
    const heading = document.createElement('h2');
    if (type == 'project') {
      const projectName = todoList.getProjectById(selection).name;
      heading.textContent = projectName;
    } else {
      heading.textContent = selection;
    }

    const top = document.createElement('div');
    top.classList.add('top');

    top.appendChild(heading);
    main.appendChild(top);
  }

  function _renderDeleteButton(selection) {
    const top = main.querySelector('.top');
    const projectId = selection.getAttribute('data-selection');
    const button = domController.createElement('input', {
      type: 'image',
      src: Trash,
    });
    button.addEventListener('click', () => {
      const userChoice = window.confirm('Delete this project?');
      if (userChoice) {
        todoList.deleteProject(projectId);
        sidebarController.renderSidebarContent();
        sidebarController.selectOverdue();
        sidebarController.renderSidebarContent();
      }
    });
    top.append(button);
  }

  function _renderNewTodoButton(selection, type) {
    const newTodoButton = domController.createElement('input', {
      type: 'image',
      src: Plus,
    });
    newTodoButton.addEventListener('click', (e) => {
      _addNewTodoForm(selection, type, e.target);
    });

    main.appendChild(newTodoButton);
  }

  function _addNewTodoForm(selection, type, button) {
    button.classList.add('hidden');
    const newTodoForm = _createNewTodoForm(selection, type, button);
    main.insertBefore(newTodoForm, button);
  }

  function _createNewTodoForm(selection, type) {
    const formInputs = _createTodoFormInputs(selection, type);
    const button = _createNewTodoButton();
    const newTodoForm = domController.createElement(
      'form',
      {},
      formInputs
    );
    newTodoForm.appendChild(button);

    return newTodoForm;
  }

  function _createTodoFormInputs(selection, type) {
    const projectOptions = _createProjectOptions(selection, type);

    return [
      _createTodoFormInput('input', 'name', 'New Task'),
      _createTodoFormInput('textarea', 'description', 'Description'),
      _createTodoFormInput('input', 'dueDate', 'Due Date', 'date'),
      _createTodoFormInput(
        'select',
        'project',
        'Project',
        '',
        projectOptions
      ),
    ];
  }

  function _createTodoFormInput(
    tagName,
    name,
    labelName,
    type = '',
    options = ''
  ) {
    const label = domController.createElement(
      'label',
      { for: name },
      labelName
    );
    const input = domController.createElement(
      tagName,
      { type: type, id: name },
      options
    );

    input.addEventListener('keydown', (e) => {
      if (e.key == 'Enter') {
        e.preventDefault();
        _submitNewTodoForm();
      }
    });

    const container = domController.createElement('div', {}, [
      label,
      input,
    ]);

    return container;
  }

  function _createProjectOptions(selection, type) {
    const projects = todoList.projects;
    const projectOptions = [];

    projects.forEach((project) => {
      const projectOption = domController.createElement(
        'option',
        { value: project.id },
        project.name
      );
      if (type == 'project' && selection == projects.id) {
        projectOption.selected = true;
      }

      projectOptions.push(projectOption);
    });

    return projectOptions;
  }

  function _createNewTodoButton() {
    const button = domController.createElement(
      'button',
      { type: 'button' },
      'Create Todo'
    );
    button.addEventListener('click', _submitNewTodoForm);

    return button;
  }

  function _submitNewTodoForm() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('dueDate').value;
    let dueDate = date ? date : null;
    const projectId = document.getElementById('project').value;

    if (!name) {
      alert('Task must have a name');
    } else {
      todoList.createTodoItem(projectId, {
        name,
        description,
        dueDate,
      });
      sidebarController.renderSelectionCounts();
      reloadContent();
    }
  }

  function _addTodoItems(selection, type) {
    let todoItems = todoList.getSortedTodoItems(selection, type);
    let todoItemsList = _createTodoItemsList(todoItems);
    main.appendChild(todoItemsList);
  }

  function _createTodoItemsList(todoItems) {
    const list = document.createElement('ul');
    todoItems.forEach((todoItem) => {
      const listItem = _createTodoItemElement(todoItem);
      list.appendChild(listItem);
    });
    return list;
  }

  function _createTodoItemElement(todoItem) {
    const checkbox = domController.createTodoCheckbox(todoItem);
    const name = domController.createElement(
      'div',
      { class: 'name' },
      todoItem.name
    );
    const dueDate = domController.createElement(
      'div',
      { class: 'date' },
      todoItem.dueDateFormatted
    );

    const listItem = domController.createElement(
      'li',
      { class: 'todo-item', 'data-id': todoItem.id },
      [checkbox, name, dueDate]
    );

    listItem.addEventListener('click', () => {
      _updateSelectedTo(listItem);
      rightPanelController.renderTodoItem(todoItem);
    });

    return listItem;
  }

  function reloadContent() {
    let selected = document.querySelector('.selected');
    selected.click();
  }

  function _clickFirstTodoItem() {
    const firstTodoItem = document.querySelector('.todo-item');
    if (firstTodoItem) {
      firstTodoItem.click();
    }
  }

  function _updateSelectedTo(element) {
    const selected = main.querySelector('.selected');
    if (selected) {
      selected.classList.remove('selected');
    }
    element.classList.add('selected');
  }

  function selectedTodoItem() {
    const selected = main.querySelector('.selected');
    return selected;
  }

  return {
    updateContent,
    addProjectOption,
    reloadContent,
    selectedTodoItem,
  };
})();
