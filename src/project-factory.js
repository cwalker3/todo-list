let count = 0;

export function projectFactory(name = 'Default') {
  let items = [];
  let id = count;
  count++;

  function addTodoItem(item) {
    items.push(item);
  }

  function deleteTodoItem(itemIndex) {
    items.splice(itemIndex, 1);
  }

  return {
    name,
    items,
    addTodoItem,
    deleteTodoItem,
    id,

    set items(itemsArray) {
      items = itemsArray;
    },

    get items() {
      return items;
    },
  };
}
