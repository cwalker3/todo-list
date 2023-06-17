export function todoItemFactory(params) {
  let name = params.name;
  let description = params.description;
  let dueDate = params.dueDate;
  let priority = params.priority;
  let completed = false;

  function markComplete() {
    this.completed = true;
  }

  return {
    name,
    description,
    dueDate,
    priority,
    completed,
    markComplete,
  };
}
