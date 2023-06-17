import { todoItemFactory } from './todo-item-factory';

export function projectFactory(name = 'default') {
  let items = [];

  function addItem(item) {
    items.push(item);
  }

  return { name, items, addItem };
}
