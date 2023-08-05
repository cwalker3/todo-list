import { mainController } from './main-controller.js';
import { domController } from './dom-controller.js';
import { todoList } from './todo-list.js';

export const sidebarController = (function () {
  const sidebar = document.querySelector('.sidebar');
  const openSvg = document.querySelector('.open-svg');
  const closeSvg = document.querySelector('.close-svg');

  document.addEventListener('DOMContentLoaded', () => {
    renderSidebarContent();
    _attachEventListeners();
    _handleViewportSize();
    selectOverdue();
  });

  function renderSidebarContent() {
    _renderProjects();
    renderSelectionCounts();
    _renderNewProjectInput();
  }

  function _renderProjects() {
    const projectsList = document.querySelector('.projects');
    projectsList.textContent = '';
    const projects = todoList.projects;
    projects.forEach((project) => {
      const projectElement = _createProjectElement(project);
      projectsList.appendChild(projectElement);
      projectElement.addEventListener(
        'click',
        mainController.updateContent
      );
    });
  }

  function _createProjectElement(project) {
    const projectElement = domController.createElement(
      'li',
      {
        class: 'selection',
        'data-selection-type': 'project',
        'data-selection': project.id,
      },
      domController.createElement('div', {}, project.name)
    );

    return projectElement;
  }

  function renderSelectionCounts() {
    const selectables = document.querySelectorAll('.selection');
    selectables.forEach((selectable) => {
      const selection = selectable.getAttribute('data-selection');
      const type = selectable.dataset.selectionType;
      const count = todoList.getCount(selection, type);

      const countDiv = domController.createElement('div', {}, count);

      if (selectable.children[1]) {
        selectable.removeChild(selectable.children[1]);
      }
      selectable.appendChild(countDiv);
    });
  }

  function _renderNewProjectInput() {
    const projectsList = document.querySelector('.projects');
    const listItem = document.createElement('li');
    const input = domController.createElement(
      'input',
      { placeholder: 'New Project' },
      ''
    );
    input.addEventListener('keydown', (e) => {
      if (e.key == 'Enter') {
        todoList.createProject(e.target.value);
        renderSidebarContent();
        mainController.addProjectOption(e.target.value);
      }
    });

    listItem.appendChild(input);
    projectsList.appendChild(listItem);
  }

  function _attachEventListeners() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    sidebarToggle.addEventListener('click', _toggleSidebar);

    const selections = document.querySelectorAll('.selection');
    selections.forEach((selection) => {
      selection.addEventListener(
        'click',
        mainController.updateContent
      );
    });
  }

  function _handleViewportSize() {
    if (window.matchMedia('(max-width: 599px)').matches) {
      _closeSidebar();
    } else if (
      window.matchMedia('(min-width: 600px)').matches &&
      window.matchMedia('(max-width: 900px)').matches
    ) {
      _openSidebar();
    } else {
      _openSidebar();
    }
  }

  function _toggleSidebar() {
    if (sidebar.classList.contains('closed')) {
      _openSidebar();
    } else {
      _closeSidebar();
    }
  }

  function _openSidebar() {
    sidebar.classList.remove('closed');
    closeSvg.classList.remove('hidden');
    openSvg.classList.add('hidden');
  }

  function _closeSidebar() {
    sidebar.classList.add('closed');
    openSvg.classList.remove('hidden');
    closeSvg.classList.add('hidden');
  }

  function selectOverdue() {
    const overdueSelection =
      document.querySelectorAll('.selection')[1];
    overdueSelection.click();
  }

  function updateSelectedTo(element) {
    const selected = sidebar.querySelector('.selected');
    if (selected) {
      selected.classList.remove('selected');
    }
    element.classList.add('selected');
  }

  return {
    renderSidebarContent,
    selectOverdue,
    updateSelectedTo,
    renderSelectionCounts,
  };
})();
