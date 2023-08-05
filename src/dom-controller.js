import { mainController } from './main-controller';
import { sidebarController } from './sidebar-controller';
import { storage } from './storage';

export const domController = (function () {
  function createElement(tagName, attributes = {}, content = '') {
    const element = document.createElement(tagName);
    for (const [attr, value] of Object.entries(attributes)) {
      element.setAttribute(attr, value);
    }
    if (typeof content === 'string' || typeof content === 'number') {
      element.textContent = content;
    } else if (content instanceof Node) {
      element.appendChild(content);
    } else if (content instanceof Array) {
      content.forEach((childNode) => {
        element.appendChild(childNode);
      });
    }

    return element;
  }

  function createTodoCheckbox(todoItem) {
    const checkbox = domController.createElement(
      'input',
      { type: 'checkbox' },
      ''
    );

    if (todoItem.completed == true) {
      checkbox.checked = true;
    }
    checkbox.addEventListener('click', (e) => {
      e.stopPropagation();
      if (e.target.checked) {
        todoItem.completed = true;
      } else {
        todoItem.completed = false;
      }
      storage.save();
      e.target.parentNode.classList.add('fade-out');
      setTimeout(() => {
        mainController.reloadContent();
        sidebarController.renderSidebarContent();
      }, 500);
    });

    return checkbox;
  }

  return { createElement, createTodoCheckbox };
})();
