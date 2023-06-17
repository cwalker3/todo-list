export function todoItem(
  name,
  description,
  dueDate,
  status,
  priority
) {
  function markComplete() {
    this.status = 'complete';
  }

  return {
    name,
    description,
    dueDate,
    status,
    priority,
    markComplete,
  };
}
