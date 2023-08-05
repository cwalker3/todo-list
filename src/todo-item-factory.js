import { dateWithoutTimezoneOffset } from './date-utils';

let count = 0;

export function todoItemFactory(params) {
  let name = params.name;
  let description = params.description;
  let dueDate = params.dueDate
    ? dateWithoutTimezoneOffset(params.dueDate)
    : null;
  let completed = params.completed ? params.completed : false;
  let id = count;
  count++;

  function calculateDueDateFormatted() {
    if (dueDate) {
      return dueDate.toDateString();
    } else {
      return 'No Due Date';
    }
  }

  function calculateDueDateValue() {
    if (dueDate) {
      return dueDate.toISOString().slice(0, 10);
    }
  }

  return {
    name,
    description,
    dueDate,
    completed,
    id,
    setDueDate: function (newDueDate) {
      dueDate = dateWithoutTimezoneOffset(newDueDate);
    },
    get dueDateFormatted() {
      return calculateDueDateFormatted();
    },

    get dueDateValue() {
      return calculateDueDateValue();
    },
  };
}
