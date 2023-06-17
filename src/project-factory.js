export function projectFactory(name = 'default') {
  const items = [];

  function addTodoItem(item) {
    items.push(item);
  }

  function deleteTodoItem(itemIndex) {
    items.splice(itemIndex, 1);
  }

  return { name, items, addTodoItem, deleteTodoItem };
}
