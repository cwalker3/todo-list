import Trash from './trash.svg';
import X from './x.svg';

import { domController } from './dom-controller';
import { todoList } from './todo-list';
import { mainController } from './main-controller';
import { sidebarController } from './sidebar-controller';

export const rightPanelController = (function () {
  const rightPanel = document.querySelector('.right-panel');

  document.addEventListener('DOMContentLoaded', _handleViewportSize);

  window.addEventListener('resize', _handleViewportSize);

  function _handleViewportSize() {
    if (window.matchMedia('(max-width: 899px)').matches) {
      _close();
    } else if (window.matchMedia('(min-width: 1024px)').matches) {
      _open();
    }
  }

  function _close() {
    rightPanel.classList.add('closed');
  }

  function _open() {
    rightPanel.classList.remove('closed');
  }

  function renderTodoItem(todoItem) {
    _open();
    _clear();
    _renderContent(todoItem);
  }

  function _clear() {
    rightPanel.textContent = '';
  }

  function _renderContent(todoItem) {
    if (window.matchMedia('(max-width: 1024px)').matches) {
      _renderCloseButton();
    }
    _renderMiddleDiv(todoItem);
    _renderBottomDiv(todoItem);
  }

  function _renderCloseButton() {
    const img = document.createElement('img');
    img.src = X;
    img.addEventListener('click', _close);
    const top = document.createElement('div');
    top.classList.add('top');
    top.appendChild(img);

    rightPanel.appendChild(top);
  }

  function _renderMiddleDiv(todoItem) {
    const checkbox = domController.createTodoCheckbox(todoItem);
    const date = _createDate(todoItem);
    const deleteButton = _createDeleteButton(todoItem);

    const middleDiv = document.createElement('div');
    middleDiv.classList.add('middle');

    middleDiv.appendChild(checkbox);
    middleDiv.appendChild(date);
    middleDiv.appendChild(deleteButton);

    rightPanel.appendChild(middleDiv);
  }

  function _createDate(todoItem) {
    const date = document.createElement('input');
    date.type = 'date';
    date.value = todoItem.dueDateValue;
    date.addEventListener('change', () => {
      todoItem.setDueDate(date.value);
      const selected = mainController.selectedTodoItem();
      const dateDiv = selected.childNodes[2];
      dateDiv.textContent = todoItem.dueDateFormatted;
    });

    return date;
  }

  function _createDeleteButton(todoItem) {
    const deleteButton = domController.createElement(
      'img',
      { src: Trash },
      'Delete Task'
    );

    deleteButton.addEventListener('click', () => {
      const userConfirm = confirm('Delete this task?');
      if (userConfirm) {
        todoList.deleteTodoItem(todoItem);
        sidebarController.renderSelectionCounts();
        mainController.reloadContent();
      }
    });

    return deleteButton;
  }

  function _renderBottomDiv(todoItem) {
    const name = _createName(todoItem);
    const description = _createDescription(todoItem);

    const bottom = document.createElement('div');
    bottom.classList.add('bottom');

    bottom.appendChild(name);
    bottom.appendChild(description);

    rightPanel.appendChild(bottom);
  }

  function _createName(todoItem) {
    const name = document.createElement('input');
    name.value = todoItem.name;

    name.addEventListener('change', () => {
      todoItem.name = name.value;
      _reload();
    });

    return name;
  }

  function _createDescription(todoItem) {
    const description = document.createElement('textarea');
    description.textContent = todoItem.description;
    description.placeholder = 'Description';

    description.addEventListener('change', () => {
      todoItem.description = description.value;
      _reload();
    });

    return description;
  }

  function _reload() {
    const selected = mainController.selectedTodoItem();
    const id = selected.getAttribute('data-id');
    mainController.reloadContent();
    const main = document.querySelector('.main');
    const newSelected = main.querySelector(`[data-id='${id}']`);
    newSelected.click();
  }

  return { renderTodoItem };
})();
